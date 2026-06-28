import { authenticate } from "@/middlewares/firebaseAuth";
import { User } from "@/models/user.model";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function userRoutes (app:FastifyInstance){
    app.post("/users", postUsers);
    app.put("/users", putUserName);
    app.get("/users/search", searchUsers);
    app.get("/users/by-uid/:uid", getUserByUid);
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


const SAFE_USER_FIELDS = "uid email displayName photoUrl";

const searchUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    await authenticate(request, reply);
    if (!(request as any).user) return reply.status(401).send({ message: "Unauthorised" });

    const q = (request.query as any).q as string | undefined;
    if (!q || q.trim().length < 2) {
        return reply.status(400).send({ message: "Query must be at least 2 characters" });
    }

    const regex = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const users = await User.find({
        $or: [{ displayName: regex }, { email: regex }],
    })
        .select(SAFE_USER_FIELDS)
        .limit(10)
        .lean();

    return reply.send(users);
};

const getUserByUid = async (request: FastifyRequest, reply: FastifyReply) => {
    await authenticate(request, reply);
    if (!(request as any).user) return reply.status(401).send({ message: "Unauthorised" });

    const { uid } = request.params as { uid: string };
    const user = await User.findOne({ uid }).select(SAFE_USER_FIELDS).lean();
    if (!user) return reply.status(404).send({ message: "User not found" });

    return reply.send(user);
};

const putUserName = async (request:FastifyRequest,reply:FastifyReply)=>{
    await authenticate(request, reply);
    const userData = (request as any).user;

    if(!userData) return reply.status(401).send({message:"Unauthorised"});

    const {uid,name,picture} = userData;

    try{
        await User.updateOne({uid:uid},{displayName:name,photoUrl:picture})
    }catch(error:any){
        reply.status(500).send("Error on user update")
    }
}