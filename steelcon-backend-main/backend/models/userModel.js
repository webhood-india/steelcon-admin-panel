import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      unique: true,
    },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    profileImg: { type: String },
    personalEmail: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    personalMobile: { type: String, required: true },
    emergencyContact: {
      name: { type: String, required: true },
      mobile: { type: String, required: true },
    },
    manpowerRequester: { type: Boolean, default: false },
    workDays: { type: Number },
    paidLeaves: { type: Number },
    sickLeaves: { type: Number, default: 0 },
    casualLeaves: { type: Number, default: 0 },
    isHR: { type: Boolean, default: false },
    resignDeduction: { type: Number }, // Deduction per notice period day
    isFirstUser: { type: Boolean, default: true },
    username: { type: String },
    typeOfUser: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true,
    },
    adminLevel: { type: String, enum: ["super_admin", "admin"], default: "admin" },
    // Login Credentials
    password: { type: String, required: true }, // Will be generated and sent via email,
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    // Work Details
    joiningDate: { type: Date },
    designation: { type: String, required: true, uppercase: true }, // Stores the designation CODE
    department: { type: String, required: true, uppercase: true }, // Stores the department CODE
    teamManager: { type: String }, // Name of Team Manager
    reportTo: { type: String }, // Reporting Manager (if applicable)
    deptEmail: { type: String, required: true },
    workEmail: { type: String },

    // Bank Details
    bank: {
      accName: { type: String },
      bankName: { type: String },
      accNumber: { type: String },
      ifsc: { type: String },
      branch: { type: String },
      cancelledCheque: { type: String },
    },

    // Salary & Deductions
    salary: {
      ctc: { type: Number },
      autoTDS: { type: Boolean, default: false },
      basicDA: { type: Number },
      hra: { type: Number },
      conveyance: { type: Number },
      other: { type: Number },
      arrears: { type: Number },
      profTax: { type: Number },
      pf: { type: Number },
      tds: { type: Number },
      advance: { type: Number },
      totalDeductions: { type: Number },
      netPay: { type: Number },
      bonus: { type: Number },
      gratuity: { type: Number },
    },

    // Government IDs
    aadharNo: { type: String, required: true },
    panNo: { type: String, required: true },
    uan: { type: String }, // PF UAN
    esicNo: { type: String },

    // Documents (File URLs)
    documents: {
      passportPhoto: { type: String },
      aadhar: { type: String },
      addressProof: { type: String },
      panCard: { type: String },
      qualification: { type: String },
      resume: { type: String },
      otherDocs: { type: String },
    },

    remarks: { type: String },
  },
  { timestamps: true }
);

//JSON WEBTOKEN middleware for the authentication
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Middleware to compare passwords
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", userSchema);

//Dummy Data

// {
//   "firstName": "John",
//   "middleName": "A.",
//   "lastName": "Doe",
//   "profileImg": "https://example.com/profile.jpg",
//   "personalEmail": "john.doe@example.com",
//   "personalMobile": "9876543210",
//   "emergencyContact": {
//     "name": "Jane Doe",
//     "mobile": "9123456789"
//   },
//   "workDays": 5,
//   "paidLeaves": 12,
//   "sickLeaves": 8,
//   "isHR": false,
//   "resignDeduction": 500,

//   "joiningDate": "2024-03-24",
//   "designation": "DEV001",
//   "department": "HR002",
//   "teamManager": "Alice Smith",
//   "reportTo": "Robert Brown",
//   "deptEmail": "hr@example.com",
//   "workEmail": "johndoe@company.com",

//   "password": "Temp@1234",

//   "bank": {
//     "accName": "John A. Doe",
//     "bankName": "State Bank of India",
//     "accNumber": "123456789012",
//     "ifsc": "SBIN0001234",
//     "branch": "Delhi Branch",
//     "cancelledCheque": "https://example.com/cancelled-cheque.jpg"
//   },

//   "salary": {
//     "ctc": 600000,
//     "autoTDS": true,
//     "basicDA": 25000,
//     "hra": 10000,
//     "conveyance": 2000,
//     "other": 5000,
//     "arrears": 0,
//     "profTax": 200,
//     "pf": 1800,
//     "tds": 5000,
//     "advance": 0,
//     "totalDeductions": 7000,
//     "netPay": 43000,
//     "bonus": 10000,
//     "gratuity": 3000
//   },

//   "aadharNo": "123456789012",
//   "panNo": "ABCDE1234F",
//   "uan": "100200300400",
//   "esicNo": "E12345678",

//   "documents": {
//     "passportPhoto": "https://example.com/photo.jpg",
//     "aadhar": "https://example.com/aadhar.jpg",
//     "addressProof": "https://example.com/address-proof.jpg",
//     "panCard": "https://example.com/pan.jpg",
//     "qualification": "https://example.com/degree.jpg",
//     "resume": "https://example.com/resume.pdf",
//     "otherDocs": "https://example.com/extra-doc.pdf"
//   },

//   "remarks": "This manager will oversee HR operations."
// }
