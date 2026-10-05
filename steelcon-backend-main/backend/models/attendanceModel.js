import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day", "Leave"],
      required: true,
    },
    reportingUnit: {
      type: String,
      trim: true,
    },
    approvalStatus: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    approvedBy: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// To prevent duplicate entries for the same employee on the same date
attendanceSchema.index({ empId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
