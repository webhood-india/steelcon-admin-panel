import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: "Authentication required" });

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.id;
    const user = await userModel.findById(userId).select("-password -resetPasswordToken -resetPasswordExpires");
    if (!user) return res.status(401).json({ success: false, message: "User account not found" });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired authentication token" });
  }
};

export const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.typeOfUser)) {
    return res.status(403).json({ success: false, message: "You do not have permission to perform this action" });
  }
  next();
};
