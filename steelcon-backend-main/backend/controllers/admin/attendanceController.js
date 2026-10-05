import Attendance from "../../models/attendanceModel.js";
import User from "../../models/userModel.js";

// Helper function to get working days in a month (excluding weekends)
const getWorkingDaysInMonth = (year, month) => {
  let totalDays = 0;
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      // 0 = Sunday, 6 = Saturday
      totalDays++;
    }
    date.setDate(date.getDate() + 1);
  }

  return totalDays;
};

export const getManagersAttendance = async (req, res, next) => {
  try {
    // 1. Get all managers
    const managers = await User.find({ typeOfUser: "manager" }).select("-password -resetPasswordToken -resetPasswordExpires");
    console.log(managers);

    // Get current year and month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    const currentYear = currentDate.getFullYear();

    // Get total working days in current month
    const workingDays = getWorkingDaysInMonth(currentYear, currentMonth);

    const summary = [];

    // 2. Iterate over each manager
    for (const manager of managers) {
      // 3. Count 'Present' attendance for this manager in current month
      const startOfMonth = new Date(currentYear, currentMonth, 1);
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

      const presentDays = await Attendance.countDocuments({
        empId: manager.empId,
        status: "Present",
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      });

      summary.push({
        manager,
        presentDays,
        totalWorkingDays: workingDays,
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching manager attendance summary:", error);
    next("Server Error");
  }
};

export const getEmployeesAttendance = async (req, res, next) => {
  try {
    // 1. Get all employees
    let employeeFilter = { typeOfUser: "employee" };
    if (req.user.typeOfUser === "employee") employeeFilter._id = req.user._id;
    if (req.user.typeOfUser === "manager") employeeFilter.teamManager = `${req.user.firstName} ${req.user.lastName}`;
    const employees = await User.find(employeeFilter).select("-password -resetPasswordToken -resetPasswordExpires");

    // Get current year and month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    const currentYear = currentDate.getFullYear();

    // Get total working days in current month
    const workingDays = getWorkingDaysInMonth(currentYear, currentMonth);

    const summary = [];

    // 2. Iterate over each manager
    for (const employee of employees) {
      // 3. Count 'Present' attendance for this manager in current month
      const startOfMonth = new Date(currentYear, currentMonth, 1);
      const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

      const presentDays = await Attendance.countDocuments({
        empId: employee.empId,
        status: "Present",
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      });
      console.log("Present = ", presentDays);

      summary.push({
        employee,
        presentDays,
        totalWorkingDays: workingDays,
      });
    }

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching employee attendance summary:", error);
    next("Server Error");
  }
};

// Employee submits attendance; approver is determined by role.
export const addAttendanceEntry = async (req, res, next) => {
  try {
    const { empId: requestedEmpId, date, status, reportingUnit } = req.body;
    const empId = req.user.typeOfUser === "employee" ? req.user.empId : requestedEmpId;
    if (!empId || !date || !status) return next("empId, date, and status are required");
    if (!["Present", "Absent", "Half Day", "Leave", "Holiday"].includes(status)) return next("Invalid attendance status");
    const employee = await User.findOne({ empId });
    if (!employee) return next("Employee not found");
    const existing = await Attendance.findOne({ empId, date: new Date(date) });
    if (existing) return res.status(409).json({ message: "Attendance already submitted for this date", data: existing });
    const approvalStatus = req.user.typeOfUser === "admin" ? "Approved" : "Pending";
    const attendance = await Attendance.create({ empId, date: new Date(date), status, reportingUnit, approvalStatus, approvedBy: req.user.typeOfUser === "admin" ? req.user._id.toString() : undefined });
    res.status(201).json({ success: true, data: attendance });
  } catch (error) { next(error.message); }
};

export const approveAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.body.id);
    if (!attendance) return next("Attendance entry not found");
    const employee = await User.findOne({ empId: attendance.empId });
    if (!employee) return next("Employee not found");
    if (req.user.typeOfUser === "manager") {
      const managerName = `${req.user.firstName} ${req.user.lastName}`;
      if (employee.teamManager !== managerName && employee.teamManager !== req.user._id.toString()) return res.status(403).json({ message: "This attendance is outside your team" });
    }
    attendance.approvalStatus = "Approved";
    attendance.approvedBy = req.user._id.toString();
    await attendance.save();
    res.json({ success: true, data: attendance });
  } catch (error) { next(error.message); }
};
