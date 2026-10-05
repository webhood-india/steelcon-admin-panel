import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    numberOfDays: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["paidLeaves", "sickLeaves", "casualLeaves"],
      default: "casualLeaves",
    },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    approvedBy: { type: String },
    rejectionReason: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leave", leaveSchema);
