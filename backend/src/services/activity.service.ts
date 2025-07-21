import { FastifyReply, FastifyRequest } from "fastify";
import Activity from "../models/activity.model";
import { v4 as uuidv4 } from "uuid";


export const postActivity =  async (request:FastifyRequest, reply:FastifyReply) => {
    try{
        const { id, title, description, type, tasks, authoriseEdit, tags, participantCount = 0 } = request.body as {
            id:string,
            title:string,
            tags:string[],
            description:string,
            tasks:string[],
            type:boolean,
            authoriseEdit:boolean;
            participantCount: number;
        };

        if (participantCount < 0) {
            reply.code(400).send({ error: "Participant count must be >= 0" });
            return;
        }
        const participants = participantCount > 0 ? 
            Array.from({ length: participantCount }).map((_, index) => {
            const id = uuidv4();
                return {
                    id,
                    name: `Participant ${index + 1}`,
                    joinLink: `https://yourdomain.com/join/${id}`,
                };
            }) 
        : [] ;

        const activity = new Activity({ id, title, description, type, tasks, authoriseEdit, tags, participants });
        const saved = await activity.save();

        reply.code(201).send(saved);
    } catch(err)
     {
        console.error("Error while post on activities route:" , err);
        reply.code(500).send({ error: 'Server error', message: err });
    }

  };



export const getActivities = async ( _ : FastifyRequest , reply:FastifyReply) => {
    try{
        const activities = await Activity.find();
        reply.send(activities);
    }catch (err) {
        console.error("❌ GET /activities error:", err);
        reply.status(500).send({ error: 'Failed to fetch activities', 
                                message: err instanceof Error ? err.message:JSON.stringify(err) });
    }
  }
