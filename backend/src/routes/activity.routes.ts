import { FastifyInstance } from "fastify";
import {postActivity,getActivities} from "@/services/activity.service";

export default async function activityRoutes(app: FastifyInstance) {
    app.post("/activities",postActivity);
    app.get("/activities",getActivities);

}