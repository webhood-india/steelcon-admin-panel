import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import userModel from "./models/userModel.js";

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const required = ["MONGODB_URI", "JWT_SECRET", "SEED_ADMIN_USERNAME", "SEED_ADMIN_EMAIL", "SEED_ADMIN_PASSWORD"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = process.env.SEED_ADMIN_EMAIL.trim().toLowerCase();
    const username = process.env.SEED_ADMIN_USERNAME.trim();
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (password.length < 12) {
      throw new Error("SEED_ADMIN_PASSWORD must be at least 12 characters long.");
    }

    const existingSuperAdmin = await userModel.findOne({
      typeOfUser: "admin",
      adminLevel: "super_admin",
    });

    if (existingSuperAdmin) {
      console.log(`Super Admin already exists: ${existingSuperAdmin.personalEmail}`);
      console.log("No changes were made.");
      return;
    }

    const [emailConflict, usernameConflict] = await Promise.all([
      userModel.findOne({ personalEmail: email }),
      userModel.findOne({ username }),
    ]);

    if (emailConflict) {
      throw new Error(`A user already exists with email ${email}. Resolve it before seeding the Super Admin.`);
    }

    if (usernameConflict) {
      throw new Error(`A user already exists with username ${username}. Resolve it before seeding the Super Admin.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const adminUser = await userModel.create({
      empId: "ADM00001",
      firstName: "Super",
      lastName: "Admin",
      personalEmail: email,
      personalMobile: "0000000000",
      emergencyContact: {
        name: "System Contact",
        mobile: "0000000000",
      },
      isFirstUser: false,
      username,
      typeOfUser: "admin",
      adminLevel: "super_admin",
      password: hashedPassword,
      designation: "ADMIN",
      department: "ADMIN",
      deptEmail: email,
      aadharNo: "NOT_PROVIDED",
      panNo: "NOT_PROVIDED",
      paidLeaves: 0,
      sickLeaves: 0,
      casualLeaves: 0,
    });

    console.log("Super Admin created successfully.");
    console.log(`Email: ${adminUser.personalEmail}`);
    console.log(`Username: ${adminUser.username}`);
    console.log("Password: the value supplied in SEED_ADMIN_PASSWORD");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
