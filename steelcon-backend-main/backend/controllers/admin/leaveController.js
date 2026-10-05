import Leave from "../../models/leaveModel.js";
import Attendance from "../../models/attendanceModel.js";
import User from "../../models/userModel.js";
import sendMail from "../../utils/sendEmail.js";

export const getAllLeaves = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.typeOfUser === "employee") filter.empId = req.user.empId;
    if (req.user.typeOfUser === "manager") {
      const team = await User.find({ teamManager: req.user._id.toString() }).select("empId");
      filter.empId = { $in: team.map((u) => u.empId) };
    }
    const leaves = await Leave.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: leaves });
  } catch (error) { next(error.message); }
};

export const addLeaveRequest = async (req, res, next) => {
  try {
    const { empId, fromDate, toDate, reason, category } = req.body;
    const employee = req.user.typeOfUser === "employee" ? req.user : await User.findOne({ empId });
    if (!employee) return next("Employee not found");
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return next("Invalid leave dates");
    const numberOfDays = Math.floor((end - start) / 86400000) + 1;
    const leave = await Leave.create({ name: `${employee.firstName} ${employee.lastName}`, empId: employee.empId, fromDate: start, toDate: end, numberOfDays, reason, category, status: "Pending" });
    res.status(201).json({ success: true, data: leave });
  } catch (error) { next(error.message); }
};

export const acceptLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.body.id);
    if (!leave) return next("Leave request not found");
    leave.status = "Approved";
    leave.approvedBy = req.user._id.toString();
    await leave.save();
    res.json({ success: true, data: leave });
  } catch (error) { next(error.message); }
};

export const rejectLeave = async (req, res, next) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: "Rejected", approvedBy: req.user._id.toString(), rejectionReason: req.body?.reason || "" }, { new: true });
    if (!leave) return next("Leave request not found");
    res.json({ success: true, data: leave });
  } catch (error) { next(error.message); }
};
