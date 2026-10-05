import express from "express";

import {
  authPostController,
  registerController,
  forgotPasswordController,
  resetPassword,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routes
router.post("/auth-post", authPostController);
router.put("/register-put", registerController);
router.post("/forgot-password-post", forgotPasswordController);
router.post("/reset-password", resetPassword);

//export
export default router;
