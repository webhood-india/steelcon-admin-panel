import mongoose from "mongoose";
const schema = new mongoose.Schema({
  key: { type: String, unique: true, default: "company" },
  companyName: { type: String, default: "Steelcon" },
  legalName: { type: String, default: "Steelcon" },
  address: { type: String, default: "" },
  email: { type: String, default: "" },
  phone: { type: String, default: "" },
  website: { type: String, default: "" },
  logoUrl: { type: String, default: "" },
  payrollCurrency: { type: String, default: "INR" },
  payrollDay: { type: Number, default: 1 },
  workingDays: { type: [Number], default: [1,2,3,4,5,6] },
  holidays: { type: [{ date: Date, name: String }], default: [] },
  updateOtpHash: String,
  updateOtpExpires: Date,
}, { timestamps: true });
export default mongoose.model("CompanySettings", schema);
