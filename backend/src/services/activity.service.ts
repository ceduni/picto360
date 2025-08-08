import { FastifyReply, FastifyRequest } from "fastify";
import Activity from "../models/activity.model";
import { v4 as uuidv4 } from "uuid";
import { authenticate } from "@/middlewares/firebaseAuth";
import { User } from "@/models/user.model";
import Team,{ITeam} from "@/models/team.model";
import mongoose from "mongoose";
import { request } from "http";

interface IncomingTeam {
  id: string;
  name: string;
  participantsNames: {id: string ,name:string}[];
  supervised: boolean;
  supervisor_id?: string;
  imageUrl?: string;
  indicesTable?: { object: string; [key: string]: any }[];
}


interface CreateActivityBody {
  id: string;
  title: string;
  tags: string[];
  description: string;
  tasks: string[];
  type: "group" | "solo";
  authoriseEdit: boolean;
  teamsList: IncomingTeam[];
}

export const postActivity =  async (request:FastifyRequest<{Body:CreateActivityBody}>, reply:FastifyReply) => {
    await authenticate(request, reply);
    const userData = (request as any).user;
    if (!userData) return reply.status(401).send({ message: "Unauthorized" });

    const {uid} = userData;

    let user = await User.findOne({firebaseUid:uid});
    if(!user) {
        return reply.status(404).send({message:"User Acount not found"});
    }

    try{
        const { id, title, description, type, tasks, authoriseEdit, tags, teamsList  } = request.body;

        if (!teamsList || !Array.isArray(teamsList)) {
            console.error("Invalid or missing teamsList:", teamsList);
            return reply.status(400).send({ message: "Invalid request: 'teamsList' must be an array." });
        };

        const incomingTeams = teamsList;
        const teamIds :mongoose.Types.ObjectId[] = [];
        
        for (const team of incomingTeams) {
            if (!team.id || typeof team.id !== "string") {
                return reply.status(400).send({ message: "Each team must have a valid 'id' (string)." });
            }
            if (!team.name || typeof team.name !== "string") {
                return reply.status(400).send({ message: "Each team must have a valid 'name' (string)." });
            }
            if (!Array.isArray(team.participantsNames)) {
                return reply.status(400).send({ message: "Each team must have a valid 'participantsNames' array." });
            }
            if (typeof team.supervised !== "boolean") {
                return reply.status(400).send({ message: "Each team must have a 'supervised' boolean field." });
            }            
            const participantsList = team.participantsNames.map((particip, idx) => ({
                participantId: particip.id,
                name:particip.name,
                joinLink: "",
            }));

            // const objectstoFind = team.indicesTable.map(({ object, ...indicesMap }) => ({
            //     objectName: object,
            //     indices: Object.entries(indicesMap).map(([k, v]) => ({ indiceTitle: k, indiceValue: v }))
            // }));

            // const imageWithObjects = await mongoose.model("Image").create({ url: team.imageUrl });

            const teamDoc : ITeam = await Team.create({
                teamId: team.id,
                teamName: team.name,
                supervisorId: team.supervisor_id || user.firebaseUid,
                participantsList,
                // objectsAndImage: {
                //     objectstoFind,
                //     imageWithObjects: imageWithObjects._id,
                // },
            }) ;

            teamIds.push(teamDoc._id as mongoose.Types.ObjectId);
        }

        const activity = new Activity({ id, 
                                        title, 
                                        description, 
                                        type, 
                                        tasks, 
                                        authoriseEdit, 
                                        tags, 
                                        teams:teamIds, 
                                        createdBy:user._id});
        const saved = await activity.save();

        reply.code(201).send(saved);
    } catch(err)
     {
        console.error("Error while post on activities route:" , err);
        reply.code(500).send({ error: 'Server error', message: err });
    }

  };



export const getActivities = async ( request: FastifyRequest , reply:FastifyReply) => {
    try{
        await authenticate(request, reply);
        const firebaseUser = (request as any).user;
        if (!firebaseUser) return reply.status(401).send({ message: "Unauthorized" });

        const mongoUser = await User.findOne({ firebaseUid: firebaseUser.uid });
        if (!mongoUser) return reply.status(404).send({ message: "User not found" });

        const userId = mongoUser._id;

        // Find teams where this user is a supervisor
        const supervisedTeamIds = await Team.find({ supervisorId: firebaseUser.uid }).distinct("_id");

        // Find activities created by user or involving their supervised teams
        const activities = await Activity.find({
            $or: [
            { createdBy: userId },
            { teams: { $in: supervisedTeamIds } }
            ]
        })
            .populate("teams")
            .populate("createdBy")
            .lean();

        // Add ownership flag
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
    }catch (err) {
        console.error("❌ GET /activities error:", err);
        reply.status(500).send({ error: 'Failed to fetch activities', 
                                message: err instanceof Error ? err.message:JSON.stringify(err) });
    }
  }

  export const getActivityById = async (request,reply)=>{
    await authenticate(request, reply);
    const firebaseUser = (request as any).user;
    if (!firebaseUser) return reply.status(401).send({ message: "Unauthorized" });

    const { id } = request.params as { id: string };

    try {
        const mongoUser = await User.findOne({ firebaseUid: firebaseUser.uid });
        if (!mongoUser) return reply.status(404).send({ message: "User not found" });

        const activity = await Activity.findById(id)
        .populate({
            path: "teams",
            populate: [
            { path: "participantsList" },
            // {
            //     path: "objectsAndImage.imageWithObjects",
            //     model: "Image", // ensure this model is registered
            // },
            ],
        })
        .populate("createdBy")
        .lean();

        if (!activity) {
        return reply.status(404).send({ message: "Activity not found" });
        }

        const isCreator = String(activity.createdBy._id) === String(mongoUser._id);
        const isSupervisor = activity.teams.some(
        (team: any) => team.supervisorId === firebaseUser.uid
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
    
  }

