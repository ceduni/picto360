import { FastifyReply, FastifyRequest } from "fastify";
import ActivityModels, { IConstraint } from "../models/activity.model";
import { User } from "@/models/user.model";
import Team, { ITeam } from "@/models/team.model";
import mongoose from "mongoose";
import PictoProject, { ProjectDocument } from "@/models/project.model";
import PictoImage from "@/models/image.model";
import Permission from "@/models/user_perm.model";
// ImageService is imported lazily inside attachPlaygroundImage below: it
// transitively pulls in the Cloudflare middleware, which eagerly reads
// Cloudflare env vars at module load. A static top-level import here would
// make every consumer of activity.service.ts (including tests that don't
// touch images) require a full Cloudflare config just to load this module.

const { Activity } = ActivityModels;

export interface ActivityTask {
  title: string;
  level: "EASY" | "MEDIUM" | "HARD";
  points?: number;
}

export interface IncomingTeam {
  _id?: string;          // MongoDB ObjectId — present for existing teams, absent for new ones
  name: string;
  participants: { id: string; name: string }[];
  supervised: boolean;
  supervisor_id?: string;
}

export interface CreateDraftBody {
  title: string;
}

export interface UpdateDraftBody {
  title?: string;
  description?: string;
  mode?: "SOLO" | "COLLABORATIVE" | "COMPETITIVE";
  tags?: string[];
  tasks?: ActivityTask[];
  authoriseEdit?: boolean;
  constraints?: IConstraint[];
  deadline?: string;
  teamsList?: IncomingTeam[];
}

async function resolveUser(request: FastifyRequest, reply: FastifyReply) {
  const firebaseUser = request.user;
  if (!firebaseUser) {
    reply.status(401).send({ message: "Unauthorized" });
    return null;
  }
  const uid: string = firebaseUser.uid;
  const user = await User.findOne({ uid });
  if (!user) {
    reply.status(404).send({ message: "User account not found" });
    return null;
  }
  return { user, uid };
}

async function upsertTeams(
  teamsList: IncomingTeam[],
  currentTeamIds: mongoose.Types.ObjectId[],
  supervisorUid: string,
  reply: FastifyReply
): Promise<mongoose.Types.ObjectId[] | null> {
  const updatedIds = new Set<string>();
  const resultIds: mongoose.Types.ObjectId[] = [];

  for (const team of teamsList) {
    if (!team.name || typeof team.name !== "string") {
      reply.status(400).send({ message: "Each team must have a valid 'name' (string)." });
      return null;
    }
    if (!Array.isArray(team.participants)) {
      reply.status(400).send({ message: "Each team must have a valid 'participants' array." });
      return null;
    }
    if (typeof team.supervised !== "boolean") {
      reply.status(400).send({ message: "Each team must have a 'supervised' boolean field." });
      return null;
    }

    const participantsList = team.participants.map((p) => ({
      participantId: p.id,
      name: p.name,
      joinLink: "",
    }));

    const fields = {
      teamName: team.name,
      supervisorId: team.supervisor_id || supervisorUid,
      participantsList,
    };

    if (team._id) {
      const updated = await Team.findByIdAndUpdate(team._id, fields, { new: true });
      if (!updated) {
        reply.status(404).send({ message: `Team ${team._id} not found` });
        return null;
      }
      updatedIds.add(String(team._id));
      resultIds.push(updated._id as mongoose.Types.ObjectId);
    } else {
      const created: ITeam = await Team.create(fields);
      resultIds.push(created._id as mongoose.Types.ObjectId);
    }
  }

  const removedIds = currentTeamIds.filter((id) => !updatedIds.has(String(id)));
  if (removedIds.length > 0) {
    await Team.deleteMany({ _id: { $in: removedIds } });
  }

  return resultIds;
}

export const createDraft = async (
  request: FastifyRequest<{ Body: CreateDraftBody }>,
  reply: FastifyReply
) => {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;
  const { user } = resolved;

  const { title } = request.body;
  if (!title?.trim()) {
    return reply.status(400).send({ message: "Title is required" });
  }

  try {
    const draft = await Activity.create({
      title: title.trim(),
      createdBy: user._id,
      status: "DRAFT",
    });
    return reply.code(201).send(draft);
  } catch (err) {
    console.error("Error creating draft activity:", err);
    return reply.code(500).send({ error: "Server error", message: err });
  }
};

export const updateDraft = async (
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateDraftBody }>,
  reply: FastifyReply
) => {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;
  const { user, uid } = resolved;

  const { id } = request.params;

  try {
    const activity = await Activity.findById(id);
    if (!activity) return reply.status(404).send({ message: "Activity not found" });
    if (activity.status !== "DRAFT")
      return reply.status(400).send({ message: "Only DRAFT activities can be updated" });
    if (String(activity.createdBy) !== String(user._id))
      return reply.status(403).send({ message: "Forbidden" });

    const { title, description, mode, tags, tasks, authoriseEdit, constraints, deadline, teamsList } =
      request.body;

    if (title !== undefined) activity.title = title;
    if (description !== undefined) activity.description = description;
    if (mode !== undefined) activity.mode = mode;
    if (tags !== undefined) activity.tags = tags;
    if (tasks !== undefined) activity.tasks = tasks as any;
    if (authoriseEdit !== undefined) activity.authoriseEdit = authoriseEdit;
    if (constraints !== undefined) activity.constraints = constraints;
    if (deadline !== undefined) activity.deadline = new Date(deadline);

    if (teamsList !== undefined) {
      if (!Array.isArray(teamsList)) {
        return reply.status(400).send({ message: "'teamsList' must be an array." });
      }
      const teamIds = await upsertTeams(
        teamsList,
        activity.teams as unknown as mongoose.Types.ObjectId[],
        uid,
        reply
      );
      if (!teamIds) return;
      activity.teams = teamIds as any;
    }

    const updated = await activity.save();
    return reply.send(updated);
  } catch (err) {
    console.error("Error updating draft activity:", err);
    return reply.code(500).send({ error: "Server error", message: err });
  }
};

export const publishActivity = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;
  const { user } = resolved;

  const { id } = request.params;

  try {
    const activity = await Activity.findById(id);
    if (!activity) return reply.status(404).send({ message: "Activity not found" });
    if (activity.status !== "DRAFT")
      return reply.status(400).send({ message: "Only DRAFT activities can be published" });
    if (String(activity.createdBy) !== String(user._id))
      return reply.status(403).send({ message: "Forbidden" });

    activity.status = "PUBLISHED";
    const published = await activity.save();
    return reply.send(published);
  } catch (err) {
    console.error("Error publishing activity:", err);
    return reply.code(500).send({ error: "Server error", message: err });
  }
};

export interface AttachPlaygroundImageBody {
  imageId: string;
}

/**
 * Attach an already-uploaded PictoImage to an activity's playground scene.
 * Creates the playground PictoProject on first use (and grants the creator
 * OLP UPLOAD/EDIT/VIEW/DELETE rights on it, since a freshly created project
 * has no permission record yet and would otherwise 403 its own owner).
 */
export const attachPlaygroundImage = async (
  request: FastifyRequest<{ Params: { id: string }; Body: AttachPlaygroundImageBody }>,
  reply: FastifyReply
) => {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;
  const { user } = resolved;

  const { id } = request.params;
  const { imageId } = request.body;

  if (!imageId?.trim()) {
    return reply.status(400).send({ message: "'imageId' is required" });
  }

  try {
    const activity = await Activity.findById(id);
    if (!activity) return reply.status(404).send({ message: "Activity not found" });
    // This behaviore could change if we introduce collaborative ediation (with supervisors e.g)
    if (String(activity.createdBy) !== String(user._id))
      return reply.status(403).send({ message: "Forbidden" });

    const image = await PictoImage.findById(imageId);
    if (!image) return reply.status(404).send({ message: "Image not found" });

    let project: ProjectDocument | null;

    if (activity.playground) {
      project = await PictoProject.findById(activity.playground);
      if (!project) return reply.status(404).send({ message: "Playground project not found" });
    } else {
      project = await PictoProject.create({
        name: `${activity.title} - Playground`,
        images: [],
      });

      // A brand-new project has no OLP record for anyone yet. Grant the
      // activity's creator full rights on it so the permission check in
      // ImageService.linkImageToProject doesn't reject their own upload.
      await Permission.create({
        subjectType: "USER",
        subjectId: user._id,
        objectType: "PictoProject",
        objectId: project._id,
        actions: ["VIEW", "EDIT", "UPLOAD", "DELETE"],
      });

      activity.playground = project._id as any;
    }

    try {
      // Lazily required: image.service.ts pulls in the Cloudflare middleware,
      // which eagerly reads Cloudflare env vars at module load. 
      const ImageService = (require("./image.service") as typeof import("./image.service")).default;
      await ImageService.linkImageToProject(image, project, user);
    } catch (err) {
      if (err instanceof Error && /permission/i.test(err.message)) {
        return reply.status(403).send({ message: err.message });
      }
      throw err;
    }

    await activity.save();

    const populated = await Activity.findById(activity._id)
      .populate({ path: "playground", populate: { path: "images" } })
      .lean();

    return reply.send(populated);
  } catch (err) {
    console.error("Error attaching image to playground:", err);
    return reply.status(500).send({
      error: "Server error",
      message: err instanceof Error ? err.message : String(err),
    });
  }
};

export const getActivities = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const resolved = await resolveUser(request, reply);
    if (!resolved) return;
    const { user: mongoUser } = resolved;

    const userId = mongoUser._id;

    // const supervisedTeamIds = await Team.find({ supervisorId: uid }).distinct("_id");

    const activities = await Activity.find({ createdBy: userId })
      .populate("teams")
      .populate("createdBy")
      .populate({ path: "playground", populate: { path: "images" } })
      .lean();

    const activitiesWithOwnership = activities.map((act) => {
      const totalParticipants = act.teams.reduce((sum, team) => {
        return sum + (team.participantsList?.length || 0);
      }, 0);

      return {
        ...act,
        ownership: String(act.createdBy?._id) === String(userId) ? "creator" : "supervisor",
        totalParticipants,
      };
    });

    reply.send(activitiesWithOwnership);
  } catch (err) {
    console.error("GET /activities error:", err);
    reply.status(500).send({
      error: "Failed to fetch activities",
      message: err instanceof Error ? err.message : JSON.stringify(err),
    });
  }
};

export const getActivityById = async (request: FastifyRequest, reply: FastifyReply) => {
  const resolved = await resolveUser(request, reply);
  if (!resolved) return;
  const { user: mongoUser, uid } = resolved;

  const { id } = request.params as { id: string };

  try {

    const activity = await Activity.findById(id)
      .populate({
        path: "teams",
        populate: [{ path: "participantsList" }],
      })
      .populate("createdBy")
      .populate({ path: "playground", populate: { path: "images" } })
      .lean();
    
    if (!activity) return reply.status(404).send({ message: "Activity not found" });

    const isCreator = String(activity.createdBy._id) === String(mongoUser._id);
    const isSupervisor = activity.teams.some(
      (team: any) => team.supervisorId === uid
    );

    if (!isCreator && !isSupervisor) {
      return reply.status(403).send({ message: "Access denied" });
    }

    const totalParticipants = activity.teams.reduce((sum, team: any) => {
      return sum + (team.participantsList?.length || 0);
    }, 0);

    return reply.send({
      ...activity,
      ownership: isCreator ? "creator" : "supervisor",
      totalParticipants,
    });
  } catch (err) {
    console.error("Error fetching activity:", err);
    return reply.status(500).send({ message: "Server error" });
  }
};
