import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      immutable: true,
    },
    designations: [
      {
        designation: { type: String, required: true, trim: true },
        code: { type: String, required: true, uppercase: true, trim: true },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
