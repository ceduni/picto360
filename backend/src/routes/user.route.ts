import { authenticate } from "@/middlewares/firebaseAuth";
import { User } from "@/models/user.model";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function userRoutes (app:FastifyInstance){
    app.post("/users",{preHandler: authenticate},createNewUserProfile);
    app.put("/users",{preHandler: authenticate},updateUserProfile);
    app.get("/users/search", searchUsers);
    app.get("/users/by-uid/:uid", getUserByUid);
}

const createNewUserProfile = async (request:FastifyRequest,reply:FastifyReply)=>{
    const userData = request.user;

    if(!userData) return reply.status(401).send({message:"Unauthorised"});

    const {uid,email,name,picture} = userData;
    let user_name = name

    if( !name || name==undefined || name==""){
        user_name = email?.split("@")[0]
    }

    let user = await User.findOne({uid:uid});
    if(!user) {
        try{
            user = await User.create({
                uid:uid,
                email,
                displayName:user_name,
                photoUrl:picture,
            })
        }catch{
            return reply.status(500).send({message:"Error while creating user Profile, try again"})
        }
    }
}


const updateUserProfile = async (request:FastifyRequest,reply:FastifyReply)=>{
    const userData = request.user;

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
    }catch{
        return reply.status(500).send("Error on user update")
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

