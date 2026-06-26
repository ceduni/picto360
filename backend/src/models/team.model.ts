import { Document, Schema, model } from 'mongoose';
import { constraintSchema, IConstraint } from './activity.model';


export interface TeamParticipant{
  praticipantName:string,
  joinLink:string,
}

const teamParticipantSchema = new Schema<TeamParticipant>(
    {
        praticipantName: { type: String, required: true, trim: true },
        joinLink: {type:String,required:true},
    },
    { 
      _id: true,
      timestamps:true,
    }
);

export interface ITeam extends Document {
    teamName: string;
    description:string;
    supervisorId: string;
    participantsList: TeamParticipant[];
    constraints:IConstraint[]
}

const teamSchema = new Schema<ITeam>({
    teamName: { type: String, required: true },
    description:{type:String},
    supervisorId: { type: String, default: "" },
    participantsList: {type:[teamParticipantSchema], required:true},
    constraints:{type:[constraintSchema]}
    // workspace: { type: ActivityWorkspace, required: false },
},
{
    _id:true,
}
);

const Team = model<ITeam>('Team', teamSchema);

export default Team;