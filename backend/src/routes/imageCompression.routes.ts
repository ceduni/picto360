import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readFile, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

export default async function imageCompressionRoutes(app: FastifyInstance) {
    app.post("/api/compress-image", async (request:FastifyRequest, reply: FastifyReply)=>{
        try{
            const data = await request.file();

            if(!data){
                return reply.status(400).send({error:"No file uploaded"});
            }

            // Run sharp compression
            const buffer = await sharp(await data.toBuffer())
                .jpeg({ quality: 60 })   // compress jpeg quality
                .toBuffer();

            return reply
                .header("Content-Type", "image/jpg")
                .send(buffer);
        }catch(error){
            console.log(error);
            reply.status(500).send({error})
        }


    })
}