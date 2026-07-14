import { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";
import serviceAccount from "../../picto-360-firebase-adminsdk-fbsvc-76d12c9ce7.json"; // must be in .gitignore

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const authenticate = async (request, response) => {
  const token = request.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    throw request.server.httpErrors.unauthorized("No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    request.user = decodedToken;
  } catch (err) {
    return response.status(401).send({ message: "Invalid token" });
  }
};