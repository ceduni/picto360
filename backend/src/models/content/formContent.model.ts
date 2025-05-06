import mongoose, { Document, Schema } from "mongoose";

export interface ChoiceDocument extends Document {
  choiceText: string;
  isCorrect: boolean;
}

export interface FormContentDocument extends Document {
  id: string;
  creationDate: Date;
  lastModificationDate: Date;
  title: string;
  fields: ChoiceDocument[];
}

const choiceSchema = new Schema({
  choiceText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const formContentSchema = new Schema<FormContentDocument>({
  id: { type: String, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
  lastModificationDate: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
  fields: [choiceSchema], // Use the Choice schema
});

const FormContent = mongoose.model<FormContentDocument>(
  "FormContent",
  formContentSchema
);

export default FormContent;
