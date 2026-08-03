import { FastifyReply, FastifyRequest } from "fastify";
import ActivityModels, { IConstraint } from "../models/activity.model";
import { User } from "@/models/user.model";
import Team, { ITeam } from "@/models/team.model";
import mongoose from "mongoose";

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
      supervised: team.supervised,
      supervisorId: team.supervisor_id ?? undefined,
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
  const { user } = resolved;

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
