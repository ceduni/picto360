import { FastifyInstance } from "fastify";
import {
  CreateDraftBody,
  createDraft,
  UpdateDraftBody,
  updateDraft,
  publishActivity,
  getActivities,
  getActivityById,
  createActivityPlayground,
  AttachPlaygroundMediaBody,
  attachPlaygroundMedia,
} from "@/services/activity.service";
import { authenticate } from "@/middlewares/firebaseAuth";

export default async function activityRoutes(app: FastifyInstance) {
  app.post<{ Body: CreateDraftBody }>("/activities", { preHandler: authenticate }, createDraft);
  app.patch<{ Params: { id: string }; Body: UpdateDraftBody }>("/activities/:id", { preHandler: authenticate }, updateDraft);
  app.post<{ Params: { id: string } }>("/activities/:id/publish", { preHandler: authenticate }, publishActivity);
  app.get("/activities", { preHandler: authenticate }, getActivities);
  app.get("/activities/:id", { preHandler: authenticate }, getActivityById);
  app.post<{ Params: { id: string } }>("/activities/:id/playground", { preHandler: authenticate }, createActivityPlayground);
  app.post<{ Params: { id: string }; Body: AttachPlaygroundMediaBody }>(
    "/activities/:id/playground/media",
    { preHandler: authenticate },
    attachPlaygroundMedia
  );
}
