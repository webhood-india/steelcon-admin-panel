import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";

export const listAdmins = async (req, res, next) => { try { const admins = await User.find({ typeOfUser: "admin" }).select("-password -resetPasswordToken -resetPasswordExpires").sort({ createdAt: 1 }); res.json({ success: true, data: admins }); } catch (e) { next(e.message); } };

export const createAdmin = async (req, res, next) => {
  try {
    if (req.user.adminLevel !== "super_admin") return res.status(403).json({ message: "Only the Super Admin can create Admin accounts" });
    const { firstName, lastName, personalEmail, personalMobile, username, password } = req.body;
    if (!firstName || !lastName || !personalEmail || !personalMobile || !username || !password) return next("All admin fields are required");
    if (password.length < 8) return next("Password must be at least 8 characters");
    const exists = await User.findOne({ $or: [{ personalEmail: personalEmail.toLowerCase() }, { username }] });
    if (exists) return next("An account with that email or username already exists");
    const hashed = await bcrypt.hash(password, 12);
    const admin = await User.create({ typeOfUser: "admin", adminLevel: "admin", isFirstUser: false, firstName, lastName, personalEmail: personalEmail.toLowerCase(), personalMobile, username, password: hashed, emergencyContact: { name: firstName, mobile: personalMobile }, designation: "ADMIN", department: "ADMIN", deptEmail: personalEmail.toLowerCase(), aadharNo: "PENDING", panNo: "PENDING" });
    const safe = admin.toObject(); delete safe.password;
    res.status(201).json({ success: true, data: safe });
  } catch (e) { next(e.message); }
};
