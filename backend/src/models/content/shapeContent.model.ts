import mongoose, { Document, Schema } from "mongoose";
import { baseContentFields, ContentDocument } from "./content.model";

export interface ChoiceDocument extends Document {
  choiceText: string;
  isCorrect: boolean;
}

export interface ShapeContentDocument extends ContentDocument {
  fields: ChoiceDocument[];
}

const choiceSchema = new Schema({
  choiceText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const shapeContentSchema = new Schema<ShapeContentDocument>({
  ...baseContentFields,
  fields: [choiceSchema], // Use the Choice schema
});

const ShapeContent = mongoose.model<ShapeContentDocument>(
  "ShapeContent",
  shapeContentSchema
);

export default ShapeContent;
