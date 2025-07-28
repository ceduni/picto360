import mongoose, { Document, Schema, model } from 'mongoose';

interface IParticipant {
    participantId: string;
    name: string;
    joinLink: string;
}

interface IIndice {
    indiceTitle: string;
    indiceValue: any; 
}

interface IObjectToFind {
    objectName: string;
    indices: IIndice[];
}

const indiceSchema = new Schema<IIndice>({
  indiceTitle: { type: String, required: true },
  indiceValue: { type: String, required: true },
});

const objectSchema = new Schema<IObjectToFind>({
  objectName: { type: String, required: true },
  indices: { type: [indiceSchema], required: true },
});

export interface ObjectsAndImageDocument extends Document {
  objectstoFind: IObjectToFind[];
  imageWithObjects: mongoose.Types.ObjectId;
}

const objectsAndImageSchema = new Schema<ObjectsAndImageDocument>({
  objectstoFind: { type: [objectSchema], required: true },
  imageWithObjects: { type: Schema.Types.ObjectId, required: true },
});

export interface ITeam extends Document {
    teamId: string;
    teamName: string;
    supervisorId: string;
    participantsList: IParticipant[];
    objectsAndImage?: ObjectsAndImageDocument;
}

const teamSchema = new Schema<ITeam>({
    teamId: { type: String, required: true, unique: true },
    teamName: { type: String, required: true },
    supervisorId: { type: String, default: "" },
    participantsList: [
        {
            participantId: { type: String, required: true },
            name: { type: String, required: true },
            joinLink: { type: String, default: "" },
        },
    ],
    objectsAndImage: { type: objectsAndImageSchema, required: false },
});

const Team = model<ITeam>('Team', teamSchema);

export default Team;