import mongoose, { Document, Schema } from "mongoose";
import { ITeam } from "./team.model";
import { UserDocument } from "./user.model";

/*
========================== Activity Task ==========================
*/
interface ActivityTask {
  title: string;
  level: "EASY" | "MEDIUM" | "HARD";
  points?: number;
}

const activityTaskSchema = new Schema<ActivityTask>(
  {
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ["EASY", "MEDIUM", "HARD"], required: true },
    points: { type: Number, min: 0, default: null },
  },
  { _id: true }
);

// =========== Activity constraints =====================
// Each constraint type has a known shape
interface TimedConstraintValue    { durationSeconds: number; }
interface ObjectsConstraintValue  { objects: string[]; cluesEnabled: boolean; }

// constraint_value becomes Schema.Types.Mixed but validated at the app layer
// — or use Mongoose discriminators 


export type ActivityConstraintType = "TIMED"|"CHASSE_AU_TRESOR"|"OBJECTS_IDENTIFICATION"|"AUTONOMOUS_LEARNING";

// Activity or group level constraints
export interface IConstraint{
  constraint_type:ActivityConstraintType,
  constraint_value:Schema.Types.Mixed,
  is_enabled : boolean,
}

export const constraintSchema = new Schema<IConstraint>(
  {
    constraint_type:{
      type: String, 
      enum:["TIMED","CHASSE_AU_TRESOR","OBJECTS_IDENTIFICATION","AUTONOMOUS_LEARNING"], 
      required:true
    },
    constraint_value:{type:Schema.Types.Mixed,required:true,default:{}},
    is_enabled : {type: Boolean, required:true, default:false},    
  }
)

/*  =================== Activity Participant progress track ===================
    Store the progress for a participant on a specific activity (Table join).
*/
export type ActivityParticipantStatus = "TODO" | "PENDING" | "FINISHED";

export interface ActivityParticipantProgress extends Document{  
  activity: mongoose.Types.ObjectId;
  participant: mongoose.Types.ObjectId;
  team:mongoose.Types.ObjectId;
  status: ActivityParticipantStatus;
}

const activityParticipantProgressSchema = new Schema<ActivityParticipantProgress>(
  {
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
      index: true,
    },
    participant: {
      type: Schema.Types.ObjectId,
      ref: "Participant",
      required: true,
      index: true,
    },
    team:{
      type:Schema.Types.ObjectId,
      ref:"Team",
      required:true,
      index:true,
    },
    // Will be expanded to include the task done
    status: {
      type: String,
      enum: ["TODO", "PENDING", "FINISHED"],
      default: "TODO",
      required: true,
    },
  },
  { timestamps: true }
);


activityParticipantProgressSchema.index(
  { activity: 1, participant: 1, team: 1 },  // ensures one participant can only have one activity status
  { unique: true }
);

const ActivityParticipantProgressModel = mongoose.model(
  "ActivityParticipantProgress",
  activityParticipantProgressSchema
);

/*
========================== Activity Schema ==========================
*/
export interface ActivityDocument extends Document {
  title: string,
  description: string,
  mode: "SOLO" | "COLLABORATIVE" | "COMPETITIVE",
  constraints:IConstraint[],
  tags: string[],
  tasks:ActivityTask[],
  authoriseEdit:boolean,
  teams: [ITeam],
  createdBy: mongoose.Types.ObjectId | UserDocument;
};

const activitySchema = new Schema<ActivityDocument> (
  {
    title: {type: String , required:true},
    description: {type:String},
    mode:{type: String ,enum: ["SOLO", "COLLABORATIVE", "COMPETITIVE"], required:true, default:"SOLO"},
    constraints:{type:[constraintSchema]},
    tags: {type:[String],required:false},
    tasks:{type: [activityTaskSchema], default: []},
    authoriseEdit:{type: Boolean , required:true},
    teams: {type:[Schema.Types.ObjectId],ref:"Team",required:true},
    createdBy:{ type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps:true,  // Mongo manages createdAt and updatedAt automaticcaly
    _id:true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);
export default {Activity,ActivityParticipantProgressModel};