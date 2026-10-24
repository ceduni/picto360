import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "@/models/user.model";

/**
 * Resolve the Mongo User behind the Firebase token checked by `authenticate`.
 * Sends the 401/404 itself and returns null when there's no usable user, so
 * callers can just `if (!resolved) return;`.
 */
export async function resolveUser(request: FastifyRequest, reply: FastifyReply) {
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
