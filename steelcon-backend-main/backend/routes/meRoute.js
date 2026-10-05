import express from "express";
import { getMe, updateMe } from "../controllers/meController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);
router.get("/me", getMe);
router.put("/me", updateMe);
export default router;
