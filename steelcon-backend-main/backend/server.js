import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import meRoute from "./routes/meRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import settingsRoute from "./routes/settingsRoute.js";
import managementRoute from "./routes/managementRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();

// Middlewares
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json()); // To parse JSON requests
app.use(express.urlencoded({ extended: true })); // 👈 This enables parsing of form-data fields

const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Prod Routes
app.use("/api/route", authRoute);
app.use("/api/user", meRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/management", managementRoute);
app.use("/api/admin", adminRoute);

//Validation middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
