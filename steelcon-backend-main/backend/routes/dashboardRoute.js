import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/dashboard", requireAuth, getDashboard);
export default router;
