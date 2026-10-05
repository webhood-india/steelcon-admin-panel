import User from "../../models/userModel.js";
import Attendance from "../../models/attendanceModel.js";
import Loan from "../../models/loanModel.js";

const getWorkingDaysInMonth = (year, month) => {
  let count = 0;
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    if (date.getDay() !== 0 && date.getDay() !== 6) count++;
    date.setDate(date.getDate() + 1);
  }
  return count;
};

export const calculatePayments = async (req, res, next) => {
  try {
    const now = new Date();
    const targetMonth = now.getMonth() - 1;
    const targetYear = targetMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
    const month = targetMonth < 0 ? 11 : targetMonth;
    const startDate = new Date(targetYear, month, 1);
    const endDate = new Date(targetYear, month + 1, 1);
    const filter = req.user.typeOfUser === "employee" ? { _id: req.user._id } : { typeOfUser: { $in: ["employee", "manager"] } };
    const users = await User.find(filter).lean();
    const totalWorkingDays = getWorkingDaysInMonth(targetYear, month);
    const result = [];

    for (const user of users) {
      const monthlySalary = Number(user.salary?.netPay || user.salary?.ctc || 0);
      const attendance = await Attendance.find({ empId: user.empId, date: { $gte: startDate, $lt: endDate }, status: { $in: ["Present", "Leave", "Half Day"] }, approvalStatus: { $in: ["Approved", undefined] } }).lean();
      const fullDays = attendance.filter((a) => a.status !== "Half Day").length;
      const halfDays = attendance.filter((a) => a.status === "Half Day").length;
      const payableDays = fullDays + halfDays * 0.5;
      const perDaySalary = totalWorkingDays ? monthlySalary / totalWorkingDays : 0;
      const grossPay = payableDays >= totalWorkingDays ? monthlySalary : payableDays * perDaySalary;
      const activeLoan = await Loan.findOne({ empId: user.empId, status: "open", repaymentMethod: { $ne: "one_time" } }).lean();
      const emi = activeLoan ? Math.min(Number(activeLoan.amountPaid || 0) / Math.max(Number(activeLoan.tenure || 1), 1), Number(activeLoan.amountPaid || 0) - Number(activeLoan.amountRecovered || 0)) : 0;
      const deductions = Number(user.salary?.profTax || 0) + Number(user.salary?.pf || 0) + Number(user.salary?.tds || 0) + Number(user.salary?.advance || 0) + emi;
      result.push({ profileImg: user.profileImg || "", firstName: `${user.firstName} ${user.lastName}`, empId: user.empId, numberOfDaysWorked: payableDays, totalWorkingDays, salaryPerMonth: monthlySalary, loanDeduction: Math.round(emi), grossPay: Math.round(grossPay), deductions: Math.round(deductions), salaryToBePaid: Math.max(0, Math.round(grossPay - deductions)), period: `${targetYear}-${String(month + 1).padStart(2, "0")}` });
    }
    res.json({ success: true, period: `${targetYear}-${String(month + 1).padStart(2, "0")}`, payments: result });
  } catch (error) { next(error.message); }
};
