import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import admin from "firebase-admin";
import serviceAccount from "../../picto-360-firebase-adminsdk-fbsvc-76d12c9ce7.json"; // must be in .gitignore

declare module "fastify" {
  interface FastifyRequest {
    user?: admin.auth.DecodedIdToken;
  }
}

if (!admin.apps.length) {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
}

export const authenticate = (
  request: FastifyRequest,
  reply: FastifyReply,
  next: HookHandlerDoneFunction,
) => {
  const token = request.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    reply.status(401).send({ message: "No token provided" });
    return;
  }

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
    request.user = decodedToken;
      next();
    })
    .catch(() => {
      reply.status(401).send({ message: "Invalid token" });
    });
};
