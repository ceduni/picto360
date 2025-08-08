import { authenticate } from "@/middlewares/firebaseAuth";
import { User } from "@/models/user.model";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function userRoutes (app:FastifyInstance){
    app.post("/users",postUsers);
    app.put("/users",putUserName);
    app.get("/users",async () =>{return User.find()} )
}


const postUsers = async (request:FastifyRequest,reply:FastifyReply)=>{
    await authenticate(request, reply);
    const userData = (request as any).user;

    if(!userData) return reply.status(401).send({message:"Unauthorised"});

    const {uid,email,name,picture} = userData;

    let user = await User.findOne({firebaseUid:uid});
    if(!user) {
        try{
            user = await User.create({
                firebaseUid:uid,
                email,
                displayName:name,
                photoUrl:picture,
            })
        }catch(error:any){
            return reply.status(500).send({message:"Error while creating user, try again"})
        }
    }
}


const putUserName = async (request:FastifyRequest,reply:FastifyReply)=>{
    await authenticate(request, reply);
    const userData = (request as any).user;

    if(!userData) return reply.status(401).send({message:"Unauthorised"});

    const {uid,name,picture} = userData;

    try{
        await User.updateOne({firebaseUid:uid},{displayName:name,photoUrl:picture})
    }catch(error:any){
        reply.status(500).send("Error on user update")
    }


}