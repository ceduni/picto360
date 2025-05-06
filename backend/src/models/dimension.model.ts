import mongoose, { Document, Schema } from "mongoose";

export interface DimensionDocument extends Document {
  width: number;
  height: number;
  ratio: number;
}

const dimensionSchema = new Schema<DimensionDocument>({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  ratio: { type: Number, required: true },
});

const Dimension = mongoose.model<DimensionDocument>(
  "Dimension",
  dimensionSchema
);

export default Dimension;
