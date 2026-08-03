import { Document, Schema, model } from 'mongoose';
import { constraintSchema, IConstraint } from './activity.model';


export interface TeamParticipant{
  name:string,
  joinLink:string;
}

const teamParticipantSchema = new Schema<TeamParticipant>(
    {
        name: { type: String, required: true, trim: true },
        joinLink: {type:String,default:""},
    },
    { 
      _id: true,
      timestamps:true,
    }
);

export interface ITeam extends Document {
    teamName: string;
    description:string;
    supervised:boolean;
    supervisorId: string;
    participantsList: TeamParticipant[];
    constraints:IConstraint[]
}

const teamSchema = new Schema<ITeam>({
    teamName: { type: String, required: true },
    description:{type:String},
    supervised:{type:Boolean,default:false},
    supervisorId: { type: String},
    participantsList: {type:[teamParticipantSchema], required:true},
    constraints:{type:[constraintSchema]}
    // workspace: { type: ActivityWorkspace, required: false },
},
{
    _id:true,
    timestamps:true,
}
);

const Team = model<ITeam>('Team', teamSchema);

export default Team;