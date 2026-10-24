import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { FastifyRequest, FastifyReply } from "fastify";

// ── Mocks (factory functions prevent schema cross-import errors) ───────────
jest.mock("@/models/user.model", () => ({
  User: { findOne: jest.fn() },
}));

jest.mock("@/models/activity.model", () => ({
  __esModule: true,
  default: {
    Activity: { findById: jest.fn() },
    ActivityParticipantProgressModel: {},
  },
  constraintSchema: {},
}));

jest.mock("@/models/team.model", () => ({ __esModule: true, default: {} }));

jest.mock("@/models/pictoPlayground.model", () => ({
  __esModule: true,
  default: { findById: jest.fn(), create: jest.fn(), updateOne: jest.fn() },
}));

jest.mock("@/models/pictoMedia.model", () => ({
  PictoMedia: { findById: jest.fn() },
}));

jest.mock("@/models/user_perm.model", () => ({
  __esModule: true,
  default: { create: jest.fn() },
}));

// media.service pulls in the Cloudflare middleware, which needs Cloudflare env
// vars at module load.
jest.mock("@/services/media.service", () => {
  class MediaServiceError extends Error {
    constructor(message: string, public statusCode: number) { super(message); }
  }
  return { __esModule: true, default: { deleteMedia: jest.fn() }, MediaServiceError };
});

import { createActivityPlayground, attachPlaygroundMedia } from "@/services/activity.service";
import { User } from "@/models/user.model";
import ActivityModels from "@/models/activity.model";
import PictoPlayground from "@/models/pictoPlayground.model";
import { PictoMedia } from "@/models/pictoMedia.model";
import Permission from "@/models/user_perm.model";
import MediaService from "@/services/media.service";

const m = <T>(fn: T) => fn as unknown as jest.Mock<(...args: any[]) => any>;
const Activity = ActivityModels.Activity;

// ── Fixtures ───────────────────────────────────────────────────────────────
const FIREBASE_UID   = "firebase-uid-abc";
const MONGO_USER_ID  = "64a1b2c3d4e5f6a7b8c9d000";
const ACTIVITY_ID    = "64a1b2c3d4e5f6a7b8c9d001";
const PLAYGROUND_ID  = "64a1b2c3d4e5f6a7b8c9d010";
const MEDIA_ID       = "64a1b2c3d4e5f6a7b8c9d020";
const OLD_MEDIA_ID   = "64a1b2c3d4e5f6a7b8c9d021";

const mockUser = { _id: MONGO_USER_ID, uid: FIREBASE_UID };

function makeActivity(overrides: Record<string, unknown> = {}) {
  const activity: Record<string, any> = {
    _id: ACTIVITY_ID,
    title: "Mon activité",
    createdBy: MONGO_USER_ID,
    playground: undefined,
    ...overrides,
  };
  activity.save = jest.fn(async () => activity);
  return activity;
}

function makePlayground(main_medias: string[] = []) {
  const playground: Record<string, any> = { _id: PLAYGROUND_ID, name: "Mon activité - Playground", main_medias };
  playground.populate = jest.fn(async () => playground);
  return playground;
}

function makeRequest(overrides: object = {}) {
  const request = { body: {}, params: { id: ACTIVITY_ID }, query: {}, ...overrides } as any;
  request.user = { uid: FIREBASE_UID };
  return request as FastifyRequest<any>;
}

function makeReply() {
  const r: Record<string, jest.Mock> = { status: jest.fn(), send: jest.fn(), code: jest.fn() };
  Object.values(r).forEach((fn) => fn.mockReturnValue(r));
  return r as unknown as jest.Mocked<FastifyReply>;
}

// First findById returns the document, the second (after attaching) the
// populated, lean activity.
function mockActivityLookups(activity: Record<string, unknown>, populated: unknown = { _id: ACTIVITY_ID }) {
  m(Activity.findById)
    .mockImplementationOnce(async () => activity)
    .mockImplementationOnce(() => ({ populate: () => ({ lean: async () => populated }) }));
}

beforeEach(() => {
  // reset (not clear): unused mockImplementationOnce values must not leak between tests
  jest.resetAllMocks();
  m(User.findOne).mockResolvedValue(mockUser);
});

// ─────────────────────────────────────────────────────────────────────────
describe("createActivityPlayground — POST /activities/:id/playground", () => {
  it("creates the playground, grants the creator full rights and returns 201", async () => {
    const activity = makeActivity();
    const playground = makePlayground();
    m(Activity.findById).mockResolvedValue(activity);
    m(PictoPlayground.create).mockResolvedValue(playground);
    const reply = makeReply();

    await createActivityPlayground(makeRequest(), reply);

    expect(Permission.create).toHaveBeenCalledWith(expect.objectContaining({
      subjectId: MONGO_USER_ID,
      objectType: "PictoPlayground",
      objectId: PLAYGROUND_ID,
      actions: ["VIEW", "EDIT", "UPLOAD", "DELETE"],
    }));
    expect(activity.playground).toBe(PLAYGROUND_ID);
    expect(activity.save).toHaveBeenCalled();
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(reply.send).toHaveBeenCalledWith(playground);
  });

  it("returns the existing playground with 200 without creating another", async () => {
    const playground = makePlayground([MEDIA_ID]);
    m(Activity.findById).mockResolvedValue(makeActivity({ playground: PLAYGROUND_ID }));
    m(PictoPlayground.findById).mockResolvedValue(playground);
    const reply = makeReply();

    await createActivityPlayground(makeRequest(), reply);

    expect(PictoPlayground.create).not.toHaveBeenCalled();
    expect(Permission.create).not.toHaveBeenCalled();
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(reply.send).toHaveBeenCalledWith(playground);
  });

  it("returns 403 when the user did not create the activity", async () => {
    m(Activity.findById).mockResolvedValue(makeActivity({ createdBy: "someone-else" }));
    const reply = makeReply();

    await createActivityPlayground(makeRequest(), reply);

    expect(reply.status).toHaveBeenCalledWith(403);
    expect(PictoPlayground.create).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────
describe("attachPlaygroundMedia — POST /activities/:id/playground/media", () => {
  const readyMedia = { _id: MEDIA_ID, playground: PLAYGROUND_ID, status: "READY" };

  it("adds the media to the playground's main medias and returns the populated activity", async () => {
    const populated = { _id: ACTIVITY_ID, playground: { _id: PLAYGROUND_ID } };
    mockActivityLookups(makeActivity({ playground: PLAYGROUND_ID }), populated);
    m(PictoPlayground.findById).mockResolvedValue(makePlayground([OLD_MEDIA_ID]));
    m(PictoMedia.findById).mockResolvedValue(readyMedia);
    const reply = makeReply();

    await attachPlaygroundMedia(makeRequest({ body: { mediaId: MEDIA_ID } }), reply);

    expect(PictoPlayground.updateOne).toHaveBeenCalledWith(
      { _id: PLAYGROUND_ID },
      { $addToSet: { main_medias: MEDIA_ID } }
    );
    expect(MediaService.deleteMedia).not.toHaveBeenCalled();
    expect(reply.send).toHaveBeenCalledWith(populated);
  });

  it("with replace, deletes the previous main media but not the new one", async () => {
    mockActivityLookups(makeActivity({ playground: PLAYGROUND_ID }));
    m(PictoPlayground.findById).mockResolvedValue(makePlayground([OLD_MEDIA_ID, MEDIA_ID]));
    m(PictoMedia.findById).mockResolvedValue(readyMedia);
    const reply = makeReply();

    await attachPlaygroundMedia(makeRequest({ body: { mediaId: MEDIA_ID, replace: true } }), reply);

    expect(MediaService.deleteMedia).toHaveBeenCalledTimes(1);
    expect(MediaService.deleteMedia).toHaveBeenCalledWith(mockUser, OLD_MEDIA_ID);
    expect(PictoPlayground.updateOne).toHaveBeenCalled();
  });

  it("returns 400 for media uploaded to another playground", async () => {
    mockActivityLookups(makeActivity({ playground: PLAYGROUND_ID }));
    m(PictoPlayground.findById).mockResolvedValue(makePlayground());
    m(PictoMedia.findById).mockResolvedValue({ ...readyMedia, playground: "64a1b2c3d4e5f6a7b8c9d099" });
    const reply = makeReply();

    await attachPlaygroundMedia(makeRequest({ body: { mediaId: MEDIA_ID } }), reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(PictoPlayground.updateOne).not.toHaveBeenCalled();
  });

  it("returns 409 while the upload isn't complete", async () => {
    mockActivityLookups(makeActivity({ playground: PLAYGROUND_ID }));
    m(PictoPlayground.findById).mockResolvedValue(makePlayground());
    m(PictoMedia.findById).mockResolvedValue({ ...readyMedia, status: "PENDING" });
    const reply = makeReply();

    await attachPlaygroundMedia(makeRequest({ body: { mediaId: MEDIA_ID } }), reply);

    expect(reply.status).toHaveBeenCalledWith(409);
    expect(PictoPlayground.updateOne).not.toHaveBeenCalled();
  });

  it("returns 404 when the activity has no playground yet", async () => {
    mockActivityLookups(makeActivity());
    const reply = makeReply();

    await attachPlaygroundMedia(makeRequest({ body: { mediaId: MEDIA_ID } }), reply);

    expect(reply.status).toHaveBeenCalledWith(404);
  });

  it("returns 400 for an invalid media id", async () => {
    const reply = makeReply();

    await attachPlaygroundMedia(makeRequest({ body: { mediaId: "not-an-id" } }), reply);

    expect(reply.status).toHaveBeenCalledWith(400);
    expect(Activity.findById).not.toHaveBeenCalled();
  });
});
