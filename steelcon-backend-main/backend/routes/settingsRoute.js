import express from "express";
import { getCompanySettings, requestSettingsOtp, updateCompanySettings } from "../controllers/settingsController.js";
import { requireAuth, allowRoles } from "../middlewares/authMiddleware.js";
const router=express.Router();router.use(requireAuth,allowRoles("admin"));router.get("/company",getCompanySettings);router.post("/company/request-otp",requestSettingsOtp);router.put("/company",updateCompanySettings);export default router;
