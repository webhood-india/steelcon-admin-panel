import userModel from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const authPostController = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) return next("Username/email and password are required");
    const loggedInUser = await userModel.findOne({
      $or: [{ personalEmail: identifier.trim().toLowerCase() }, { username: identifier.trim() }],
    });
    if (!loggedInUser) return next("Invalid username/email or password");

    const isMatch = await loggedInUser.comparePassword(password);
    if (!isMatch) return next("Invalid username/email or password");

    const token = JWT.sign({ userId: loggedInUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const safeUser = loggedInUser.toObject();
    delete safeUser.password;
    delete safeUser.resetPasswordToken;
    delete safeUser.resetPasswordExpires;
    res.status(200).json({ message: "Login Successful", loggedInUser: safeUser, token });
  } catch (error) {
    next(error.message || "Server Error");
  }
};

export const registerController = async (req, res, next) => {
  try {
    let { userId, userName, newPassword } = req.body;
    console.log(req.body);
    console.log("Querry Completed");
    if (!userId || !userName || !newPassword) {
      return next("All fields are required");
    }

    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId }, // Find user by ID
      {
        $set: { username: userName, password: newPassword, isFirstUser: false }, // Add username & update password
      },
      { new: true, upsert: false } // Return updated document, do not create new if not found
    );
    if (!updatedUser) {
      return next("User not found");
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    next("Internal Server Error");
  }
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Check if user exists
    const user = await userModel.findOne({ personalEmail: email });
    if (!user) return next("User not found");

    // Generate reset token (JWT)
    const resetToken = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Store token in database
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min expiration
    await user.save();

    // Send email with reset link
    const resetLink = `https://steelcon.vercel.app/setpassword?token=${resetToken}`;
    await sendEmail(
      user.personalEmail,
      "Password Reset",
      `Click here to reset: ${resetLink}`
    );

    console.log(user.resetPasswordToken, user.resetPasswordExpires, resetLink);

    res.json({ message: "Reset password link sent to email" });
  } catch (error) {
    console.log(error);
    next("Server Error");
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    let { token, newPassword } = req.body;

    if (!token) {
      next("Token is required");
    }
    if (!newPassword) {
      next("New Password is required");
    }

    // Verify the JWT token
    let decoded;
    try {
      decoded = JWT.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      next("Invalid or expired token");
    }

    // Find user by ID from decoded token
    const user = await userModel.findById(decoded.id);
    console.log(decoded.id);

    if (!user) {
      next("User not found");
    }

    // Check if the token matches the one in the database and is not expired
    if (
      user.resetPasswordToken !== token ||
      user.resetPasswordExpires < Date.now()
    ) {
      next("Token expired or already used");
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear reset token fields
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    // user.passwordChangedAt = Date.now(); // Optional: Forces logout from other devices
    await user.save();

    res.status(200).json({
      message:
        "Password reset successfully. You can now log in with the new password.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    next("Internal server error");
  }
};
