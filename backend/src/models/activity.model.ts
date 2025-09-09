import mongoose, { Document, Schema } from "mongoose";
import { ITeam } from "./team.model";
import { UserDocument } from "./user.model";


export interface ActivityDocument extends Document {
  id:string,
  title: string,
  description: string,
  type:"solo" | "group",
  tags: string[],
  tasks:string[],
  authoriseEdit:boolean,
  teams: [ITeam],
  createdBy: mongoose.Types.ObjectId | UserDocument;
  createdAt:  Date ,
};


const activitySchema = new Schema<ActivityDocument> ({
  id:{ type: String , required: true },
  title: {type: String , required:true},
  description: {type:String},
  type:{type: String , required:true, default:"solo"},
  tags: {type:[String],required:false},
  tasks:{type: [String] , required:true},
  authoriseEdit:{type: Boolean , required:true},
  teams: {type:[Schema.Types.ObjectId],ref:"Team",required:true},
  createdBy:{ type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;