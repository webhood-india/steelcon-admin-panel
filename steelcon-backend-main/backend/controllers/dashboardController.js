import userModel from "../models/userModel.js";
import attendanceModel from "../models/attendanceModel.js";
import leaveModel from "../models/leaveModel.js";
import loanModel from "../models/loanModel.js";

export const getDashboard = async (req, res, next) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const base = req.user.typeOfUser === "manager" ? { typeOfUser: "employee", teamManager: req.user._id.toString() } : {};
    const [employees, managers, presentToday, leaveRequests, activeLoans] = await Promise.all([
      userModel.countDocuments({ ...base, typeOfUser: "employee" }),
      req.user.typeOfUser === "admin" ? userModel.countDocuments({ typeOfUser: "manager" }) : Promise.resolve(0),
      attendanceModel.countDocuments({ date: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()), $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) }, status: "Present" }),
      leaveModel.countDocuments({ fromDate: { $lt: end }, toDate: { $gte: start } }),
      loanModel.countDocuments({ status: "open" }),
    ]);
    const workingPopulation = employees + managers;
    res.json({ success: true, data: { employees, managers, presentToday, leaveRequests, activeLoans, workingPopulation } });
  } catch (error) { next(error.message); }
};
