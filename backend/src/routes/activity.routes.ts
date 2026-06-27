import { FastifyInstance } from "fastify";
import {
  createDraft,
  updateDraft,
  publishActivity,
  getActivities,
  getActivityById,
} from "@/services/activity.service";

export default async function activityRoutes(app: FastifyInstance) {
  app.post("/activities", createDraft);
  app.patch("/activities/:id", updateDraft);
  app.post("/activities/:id/publish", publishActivity);
  app.get("/activities", getActivities);
  app.get("/activities/:id", getActivityById);
}
