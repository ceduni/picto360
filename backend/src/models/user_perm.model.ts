import mongoose, { Document, Schema, Types } from "mongoose";

export type PermissionAction = "VIEW" | "EDIT" | "UPLOAD" | "DELETE";
export type PermissionResourceType =
  | "PictoProject"
  | "PictoImage"
  | "Annotation"
  | "Content"
  | "Activity";
type PermissionSubjectType = "USER" | "PARTICIPANT"

interface PermissionDocument extends Document{
    subjectType : PermissionSubjectType
    subjectId: Types.ObjectId
    objectType: PermissionResourceType,
    objectId: Types.ObjectId;
    actions:[PermissionAction],
}

const permissionSchema = new Schema<PermissionDocument>(
  {
    subjectType: {
      type: String,
      enum: ["USER", "PARTICIPANT"],
      required: true,
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    objectType: {
      type: String,
      enum: ["PictoProject", "PictoImage", "Annotation", "Content", "Activity"],
      required: true,
      index: true,
    },
    objectId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    actions: {
      type: [String],
      enum: ["VIEW", "EDIT", "UPLOAD", "DELETE"],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

permissionSchema.index(
  { subjectType: 1, subjectId: 1, objectType: 1, objectId: 1 },
  { unique: true }
);
const Permission = mongoose.model<PermissionDocument>("Permission", permissionSchema);

export default Permission 