import { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";
import serviceAccount from "../../picto-360-firebase-adminsdk-fbsvc-542411c36b.json"; // must be in your .gitignore

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const authenticate = async (request, response) => {
  const token = request.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    console.warn("🚫 No token provided");
    throw request.server.httpErrors.unauthorized("No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    request.user = decodedToken;
  } catch (err) {
    console.log("❌ Token verification failed:", err);

    return response.status(401).send({ message: "Invalid token" });
  }
};