import mongoose, { Document, Schema } from "mongoose";


const participantSchema = new mongoose.Schema({
  id: String,
  name: String,
  joinLink: String,
});

const activitySchema = new mongoose.Schema({
  id:{ type: String , required: true },
  title: {type: String , required:true},
  description: String,
  type:{type: Boolean , required:true},
  tags: [String],
  tasks:{type: [String] , required:true},
  authoriseEdit:{type: Boolean , required:true},
  participants: [participantSchema],
  createdAt: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;