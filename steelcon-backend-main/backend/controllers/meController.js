import userModel from "../models/userModel.js";

const safeUser = (user) => {
  const value = user.toObject ? user.toObject() : { ...user };
  delete value.password;
  delete value.resetPasswordToken;
  delete value.resetPasswordExpires;
  return value;
};

export const getMe = async (req, res) => {
  res.json({ success: true, data: safeUser(req.user) });
};

export const updateMe = async (req, res, next) => {
  try {
    const allowed = [
      "firstName", "middleName", "lastName", "profileImg", "personalMobile",
      "emergencyContact", "bank", "documents", "remarks"
    ];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const updated = await userModel.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ success: true, data: safeUser(updated) });
  } catch (error) {
    next(error.message);
  }
};
