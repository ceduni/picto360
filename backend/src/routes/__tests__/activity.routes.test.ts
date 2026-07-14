import { describe, it, expect, beforeEach, afterEach, jest } from "@jest/globals";
import { FastifyRequest, FastifyReply } from "fastify";

// ── Mocks (factory functions prevent schema cross-import errors) ───────────
jest.mock("@/middlewares/firebaseAuth", () => ({
  authenticate: jest.fn(),
}));

jest.mock("@/models/user.model", () => ({
  User: { findOne: jest.fn() },
}));

jest.mock("@/models/activity.model", () => ({
  __esModule: true,
  default: {
    Activity: {
      create:    jest.fn(),
      findById:  jest.fn(),
      find:      jest.fn(),
    },
    ActivityParticipantProgressModel: {},
  },
  constraintSchema: {},
}));

jest.mock("@/models/team.model", () => ({
  __esModule: true,
  default: {
    find:              jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create:            jest.fn(),
    deleteMany:        jest.fn(),
  },
}));

import {
  createDraft,
  updateDraft,
  publishActivity,
  getActivities,
  getActivityById,
} from "@/services/activity.service";

import { authenticate } from "@/middlewares/firebaseAuth";
import { User }         from "@/models/user.model";
import ActivityModels   from "@/models/activity.model";
import Team             from "@/models/team.model";

const mockAuthenticate = authenticate        as jest.MockedFunction<typeof authenticate>;
const mockUserFindOne  = User.findOne        as jest.MockedFunction<typeof User.findOne>;
const Activity         = ActivityModels.Activity;

// ── Shared fixtures ────────────────────────────────────────────────────────
const FIREBASE_UID  = "firebase-uid-abc";
const MONGO_USER_ID = "64a1b2c3d4e5f6a7b8c9d000";
const ACTIVITY_ID   = "64a1b2c3d4e5f6a7b8c9d001";
const TEAM_ID       = "64a1b2c3d4e5f6a7b8c9d002";

const mockUser = { _id: MONGO_USER_ID, uid: FIREBASE_UID, email: "user@test.com" };

const baseDraftActivity = {
  _id:          ACTIVITY_ID,
  title:        "Mon activité",
  status:       "DRAFT" as const,
  createdBy:    MONGO_USER_ID,
  teams:        [] as any[],
  tags:         [] as string[],
  tasks:        [] as any[],
  authoriseEdit: false,
};

// ── Helpers ────────────────────────────────────────────────────────────────
function makeActivity(overrides: Partial<typeof baseDraftActivity & { save: any }> = {}) {
  const act = { ...baseDraftActivity, ...overrides };
  return { ...act, save: jest.fn<() => Promise<typeof act>>().mockResolvedValue(act) };
}

function makeRequest(overrides: object = {}): jest.Mocked<FastifyRequest> {
  return { body: {}, params: {}, query: {}, ...overrides } as unknown as jest.Mocked<FastifyRequest>;
}

function makeReply(): jest.Mocked<FastifyReply> {
  const r = {
    status: jest.fn<() => any>(),
    send:   jest.fn<() => any>(),
    code:   jest.fn<() => any>(),
  } as unknown as jest.Mocked<FastifyReply>;
  (r.status as jest.Mock).mockReturnValue(r);
  (r.send   as jest.Mock).mockReturnValue(r);
  (r.code   as jest.Mock).mockReturnValue(r);
  return r;
}

function setupAuth(request: jest.Mocked<FastifyRequest>) {
  mockAuthenticate.mockImplementation(async (req: any) => { req.user = { uid: FIREBASE_UID }; });
  mockUserFindOne.mockResolvedValue(mockUser as any);
}

// ── Tests ──────────────────────────────────────────────────────────────────
describe("Activity Service", () => {
  beforeEach(async () => jest.clearAllMocks());
  afterEach(async () => jest.clearAllMocks());

  // ─────────────────────────────────────────────────────────────────────────
  describe("createDraft — POST /activities", () => {
    it("creates a DRAFT activity and returns 201", async () => {
      const request = makeRequest({ body: { title: "Nouvelle activité" } });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.create as jest.Mock).mockResolvedValue(baseDraftActivity as any);

      await createDraft(request as any, reply);

      expect(Activity.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Nouvelle activité", status: "DRAFT" })
      );
      expect(reply.code).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith(baseDraftActivity);
    });

    it("returns 400 when title is missing", async () => {
      const request = makeRequest({ body: {} });
      const reply   = makeReply();
      setupAuth(request);

      await createDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(400);
      expect(reply.send).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.stringContaining("Title") })
      );
      expect(Activity.create).not.toHaveBeenCalled();
    });

    it("returns 400 when title is blank whitespace", async () => {
      const request = makeRequest({ body: { title: "   " } });
      const reply   = makeReply();
      setupAuth(request);

      await createDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(400);
    });

    it("returns 401 when authentication sets no user", async () => {
      const request = makeRequest({ body: { title: "Test" } });
      const reply   = makeReply();
      mockAuthenticate.mockImplementation(async () => {}); // does not set request.user

      await createDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(401);
      expect(Activity.create).not.toHaveBeenCalled();
    });

    it("returns 404 when authenticated user has no DB account", async () => {
      const request = makeRequest({ body: { title: "Test" } });
      const reply   = makeReply();
      mockAuthenticate.mockImplementation(async (req: any) => { req.user = { uid: FIREBASE_UID }; });
      mockUserFindOne.mockResolvedValue(null as any);

      await createDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
    });

    it("returns 500 on unexpected DB error", async () => {
      const request = makeRequest({ body: { title: "Test" } });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.create as jest.Mock).mockRejectedValue(new Error("DB error") as never);

      await createDraft(request as any, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  describe("updateDraft — PATCH /activities/:id", () => {
    it("updates allowed fields and returns the updated activity", async () => {
      const activity = makeActivity();
      const request  = makeRequest({ params: { id: ACTIVITY_ID }, body: { title: "Nouveau titre", tags: ["sport"] } });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await updateDraft(request as any, reply);

      expect(activity.title).toBe("Nouveau titre");
      expect(activity.tags).toEqual(["sport"]);
      expect(activity.save).toHaveBeenCalled();
      expect(reply.send).toHaveBeenCalled();
    });

    it("returns 404 when activity does not exist", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID }, body: {} });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(null as any);

      await updateDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
    });

    it("returns 400 when activity is already PUBLISHED", async () => {
      const activity = makeActivity({ status: "PUBLISHED" as any });
      const request  = makeRequest({ params: { id: ACTIVITY_ID }, body: { title: "X" } });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await updateDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(400);
      expect(activity.save).not.toHaveBeenCalled();
    });

    it("returns 403 when a different user tries to update", async () => {
      const activity = makeActivity({ createdBy: "other-user-id" });
      const request  = makeRequest({ params: { id: ACTIVITY_ID }, body: {} });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await updateDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(403);
    });

    it("returns 400 when teamsList is not an array", async () => {
      const activity = makeActivity();
      const request  = makeRequest({ params: { id: ACTIVITY_ID }, body: { teamsList: "not-array" } });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await updateDraft(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(400);
    });

    it("creates a new team when _id is absent in teamsList entry", async () => {
      const newTeam  = { _id: TEAM_ID };
      const activity = makeActivity();
      const request  = makeRequest({
        params: { id: ACTIVITY_ID },
        body:   { teamsList: [{ name: "Équipe A", participants: [], supervised: false }] },
      });
      const reply = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);
      (Team.create as jest.Mock).mockResolvedValue(newTeam as any);

      await updateDraft(request as any, reply);

      expect(Team.create).toHaveBeenCalledWith(expect.objectContaining({ teamName: "Équipe A" }));
      expect(activity.save).toHaveBeenCalled();
    });

    it("updates an existing team when _id is present", async () => {
      const updatedTeam = { _id: TEAM_ID };
      const activity    = makeActivity({ teams: [TEAM_ID] as any });
      const request     = makeRequest({
        params: { id: ACTIVITY_ID },
        body:   { teamsList: [{ _id: TEAM_ID, name: "Équipe B", participants: [], supervised: false }] },
      });
      const reply = makeReply();
      setupAuth(request);
      (Activity.findById     as jest.Mock).mockResolvedValue(activity as any);
      (Team.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedTeam as any);
      (Team.deleteMany       as jest.Mock).mockResolvedValue({} as any);

      await updateDraft(request as any, reply);

      expect(Team.findByIdAndUpdate).toHaveBeenCalledWith(
        TEAM_ID,
        expect.objectContaining({ teamName: "Équipe B" }),
        { new: true }
      );
    });

    it("deletes teams that are removed from the list", async () => {
      const removedId = "64a1b2c3d4e5f6a7b8c9d099";
      const activity  = makeActivity({ teams: [removedId] as any });
      const request   = makeRequest({ params: { id: ACTIVITY_ID }, body: { teamsList: [] } });
      const reply     = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);
      (Team.deleteMany   as jest.Mock).mockResolvedValue({} as any);

      await updateDraft(request as any, reply);

      expect(Team.deleteMany).toHaveBeenCalledWith(
        expect.objectContaining({ _id: { $in: expect.any(Array) } })
      );
    });

    it("returns 500 on unexpected DB error", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID }, body: {} });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockRejectedValue(new Error("DB error") as never);

      await updateDraft(request as any, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  describe("publishActivity — POST /activities/:id/publish", () => {
    it("sets status to PUBLISHED and returns the activity", async () => {
      const activity = makeActivity();
      const request  = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await publishActivity(request as any, reply);

      expect(activity.status).toBe("PUBLISHED");
      expect(activity.save).toHaveBeenCalled();
      expect(reply.send).toHaveBeenCalled();
    });

    it("returns 404 when activity does not exist", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(null as any);

      await publishActivity(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
    });

    it("returns 400 when activity is already PUBLISHED", async () => {
      const activity = makeActivity({ status: "PUBLISHED" as any });
      const request  = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await publishActivity(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(400);
      expect(activity.save).not.toHaveBeenCalled();
    });

    it("returns 403 when a different user tries to publish", async () => {
      const activity = makeActivity({ createdBy: "other-user-id" });
      const request  = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply    = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockResolvedValue(activity as any);

      await publishActivity(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(403);
    });

    it("returns 500 on unexpected DB error", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockRejectedValue(new Error("DB error") as never);

      await publishActivity(request as any, reply);

      expect(reply.code).toHaveBeenCalledWith(500);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  describe("getActivities — GET /activities", () => {
    function setupFindChain(activities: any[]) {
      const chain = {
        populate: jest.fn<() => typeof chain>().mockReturnThis(),
        lean:     jest.fn<() => Promise<any[]>>().mockResolvedValue(activities),
      };
      (Activity.find as jest.Mock).mockReturnValue(chain as any);
    }

    function setupTeamDistinct(teamIds: string[] = []) {
      const chain = { distinct: jest.fn<() => Promise<string[]>>().mockResolvedValue(teamIds) };
      (Team.find as jest.Mock).mockReturnValue(chain as any);
    }

    it("returns activities created by the user with ownership 'creator'", async () => {
      const request = makeRequest();
      const reply   = makeReply();
      setupAuth(request);
      setupTeamDistinct([]);
      setupFindChain([{ ...baseDraftActivity, createdBy: { _id: MONGO_USER_ID }, teams: [] }]);

      await getActivities(request as any, reply);

      expect(reply.send).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ ownership: "creator" })])
      );
    });

    it("returns activities where user supervises a team with ownership 'supervisor'", async () => {
      const request = makeRequest();
      const reply   = makeReply();
      setupAuth(request);
      setupTeamDistinct([TEAM_ID]);
      setupFindChain([{
        ...baseDraftActivity,
        createdBy: { _id: "other-creator-id" },
        teams: [{ _id: TEAM_ID, supervisorId: FIREBASE_UID, participantsList: [] }],
      }]);

      await getActivities(request as any, reply);

      expect(reply.send).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({ ownership: "supervisor" })])
      );
    });

    it("sums totalParticipants across all teams", async () => {
      const request = makeRequest();
      const reply   = makeReply();
      setupAuth(request);
      setupTeamDistinct([]);
      setupFindChain([{
        ...baseDraftActivity,
        createdBy: { _id: MONGO_USER_ID },
        teams: [
          { participantsList: [{}, {}] },
          { participantsList: [{}, {}, {}] },
        ],
      }]);

      await getActivities(request as any, reply);

      const result = (reply.send as jest.Mock).mock.calls[0][0] as any[];
      expect(result[0].totalParticipants).toBe(5);
    });

    it("returns an empty array when user has no activities", async () => {
      const request = makeRequest();
      const reply   = makeReply();
      setupAuth(request);
      setupTeamDistinct([]);
      setupFindChain([]);

      await getActivities(request as any, reply);

      expect(reply.send).toHaveBeenCalledWith([]);
    });

    it("returns 500 on unexpected DB error", async () => {
      const request = makeRequest();
      const reply   = makeReply();
      setupAuth(request);
      const chain = { distinct: jest.fn<() => Promise<never>>().mockRejectedValue(new Error("DB error")) };
      (Team.find as jest.Mock).mockReturnValue(chain as any);

      await getActivities(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(500);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  describe("getActivityById — GET /activities/:id", () => {
    function setupFindByIdChain(activity: any) {
      const chain = {
        populate: jest.fn<() => typeof chain>().mockReturnThis(),
        lean:     jest.fn<() => Promise<any>>().mockResolvedValue(activity),
      };
      (Activity.findById as jest.Mock).mockReturnValue(chain as any);
    }

    it("returns activity with ownership 'creator' when user created it", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      setupFindByIdChain({ ...baseDraftActivity, createdBy: { _id: MONGO_USER_ID }, teams: [] });

      await getActivityById(request as any, reply);

      expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({ ownership: "creator" }));
    });

    it("returns activity with ownership 'supervisor' when user supervises a team", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      setupFindByIdChain({
        ...baseDraftActivity,
        createdBy: { _id: "other-creator-id" },
        teams: [{ supervisorId: FIREBASE_UID, participantsList: [] }],
      });

      await getActivityById(request as any, reply);

      expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({ ownership: "supervisor" }));
    });

    it("returns 403 when user is neither creator nor supervisor", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      setupFindByIdChain({
        ...baseDraftActivity,
        createdBy: { _id: "other-creator-id" },
        teams: [{ supervisorId: "different-uid", participantsList: [] }],
      });

      await getActivityById(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(403);
    });

    it("returns 404 when the activity does not exist", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      setupFindByIdChain(null);

      await getActivityById(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
    });

    it("computes totalParticipants from all teams", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      setupFindByIdChain({
        ...baseDraftActivity,
        createdBy: { _id: MONGO_USER_ID },
        teams: [
          { supervisorId: FIREBASE_UID, participantsList: [{}] },
          { supervisorId: FIREBASE_UID, participantsList: [{}, {}] },
        ],
      });

      await getActivityById(request as any, reply);

      const result = (reply.send as jest.Mock).mock.calls[0][0] as any;
      expect(result.totalParticipants).toBe(3);
    });

    it("returns 500 on unexpected DB error", async () => {
      const request = makeRequest({ params: { id: ACTIVITY_ID } });
      const reply   = makeReply();
      setupAuth(request);
      (Activity.findById as jest.Mock).mockImplementation(() => { throw new Error("DB error"); });

      await getActivityById(request as any, reply);

      expect(reply.status).toHaveBeenCalledWith(500);
    });
  });
});
