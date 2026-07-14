import { authenticate } from "@/middlewares/firebaseAuth";
import { User } from "@/models/user.model";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function userRoutes (app:FastifyInstance){
    app.post("/users",postUsers);
    app.put("/users",putUserProfile);
    app.put("/user",putUserProfile);
    app.get("/users",async () =>{return User.find()} )
}


const postUsers = async (request:FastifyRequest,reply:FastifyReply)=>{
    await authenticate(request, reply);
    const userData = (request as any).user;

    if(!userData) return reply.status(401).send({message:"Unauthorised"});

    const {uid,email,name,picture} = userData;

    let user = await User.findOne({uid:uid});
    if(!user) {
        try{
            user = await User.create({
                uid:uid,
                email,
                displayName:name,
                photoUrl:picture,
            })
        }catch(error:any){
            return reply.status(500).send({message:"Error while creating user, try again"})
        }
    }
}


const putUserProfile = async (request:FastifyRequest,reply:FastifyReply)=>{
    await authenticate(request, reply);
    const userData = (request as any).user;

    if(!userData) return reply.status(401).send({message:"Unauthorised"});

    const {uid,name,picture} = userData;
    const body = (request.body ?? {}) as {
        displayName?: string;
        photoUrl?: string | null;
    };
    const { displayName, photoUrl } = body;
    const update: { displayName?: string; photoUrl?: string | null } = {};

    if(displayName !== undefined) update.displayName = displayName;
    else if(name !== undefined) update.displayName = name;

    if(photoUrl !== undefined) update.photoUrl = photoUrl;
    else if(picture !== undefined) update.photoUrl = picture;

    if(Object.keys(update).length === 0) {
        return reply.status(400).send({message:"No user profile fields provided"});
    }

    try{
        await User.updateOne({uid:uid},{$set:update})
        return reply.send({message:"User updated"})
    }catch(error:any){
        return reply.status(500).send("Error on user update")
    }


}
