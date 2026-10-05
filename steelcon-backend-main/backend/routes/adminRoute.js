import express from "express";
import { requireAuth, allowRoles } from "../middlewares/authMiddleware.js";
import { listAdmins, createAdmin } from "../controllers/admin/adminController.js";
import {
  addDepartment,
  deleteDepartment,
  getDepartments,
  getEmployeesFromDepartment,
  searchDepartment,
  updateDepartment,
} from "../controllers/admin/departmentController.js";

import {
  addDesignation,
  deleteDesignation,
  getDesignations,
  searchDesignation,
  updateDesignation,
} from "../controllers/admin/designationController.js";

import {
  addManager,
  getManagers,
  searchManager,
  updateManager,
} from "../controllers/admin/managerController.js";

import {
  addEmployee,
  getEmployees,
  searchEmployee,
  updateEmployee,
} from "../controllers/admin/employeeController.js";

import {
  addAttendanceEntry,
  approveAttendance,
  getEmployeesAttendance,
  getManagersAttendance,
} from "../controllers/admin/attendanceController.js";

import {
  addLoan,
  deleteLoan,
  getAllLoan,
} from "../controllers/admin/loanController.js";

import {
  acceptLeave,
  addLeaveRequest,
  getAllLeaves,
  rejectLeave,
} from "../controllers/admin/leaveController.js";
import { calculatePayments } from "../controllers/admin/managePayment.js";

//router object
const router = express.Router();
router.use(requireAuth);

router.get("/admins", allowRoles("admin"), listAdmins);
router.post("/admins", allowRoles("admin"), createAdmin);

//Department Module routes
router.get("/departments", allowRoles("admin", "manager"), getDepartments);
router.post("/departments", allowRoles("admin"), addDepartment);
router.put("/departments/:id", allowRoles("admin"), updateDepartment);
router.delete("/departments/:id", allowRoles("admin"), deleteDepartment);
router.get("/search-departments", allowRoles("admin", "manager"), searchDepartment);
router.get("/departments/:code", getEmployeesFromDepartment);

//Designation Module routes
router.get("/designations", allowRoles("admin", "manager"), getDesignations);
router.post("/designations", allowRoles("admin"), addDesignation);
router.put("/designations", allowRoles("admin"), updateDesignation);
router.delete("/designations", allowRoles("admin"), deleteDesignation);
router.get("/search-designations", allowRoles("admin", "manager"), searchDesignation);
// router.get("/designations/:code", getEmployeesFromDesignation);

//Manager Module routes
router.get("/managers", allowRoles("admin"), getManagers);
router.post("/managers", allowRoles("admin"), addManager);
router.get("/search-managers", allowRoles("admin"), searchManager);
router.put("/managers/:id", allowRoles("admin"), updateManager);

//Employee Module routes
router.get("/employees", getEmployees);
router.post("/employees", allowRoles("admin"), addEmployee);
router.get("/search-employees", searchEmployee);
router.put("/employees/:id", allowRoles("admin"), updateEmployee);

//Attendance Module routes
router.get("/attendance/manager", allowRoles("admin"), getManagersAttendance);
router.get("/attendance/employee", getEmployeesAttendance);

//Loan Module routes
router.get("/loan", allowRoles("admin", "employee"), getAllLoan);
router.post("/loan", allowRoles("admin"), addLoan);
router.delete("/loan/:id", allowRoles("admin"), deleteLoan);

//Leave Module routes
router.get("/leave", getAllLeaves);
router.post("/accept-leave", allowRoles("admin", "manager"), acceptLeave);
router.delete("/reject-leave/:id", allowRoles("admin", "manager"), rejectLeave);

//Payment Module routes
router.get("/payment", allowRoles("admin"), calculatePayments);

//Test Api's
router.post("/add-attendance", allowRoles("employee", "manager", "admin"), addAttendanceEntry);
router.post("/approve-attendance", allowRoles("manager", "admin"), approveAttendance);
router.post("/add-leave", allowRoles("employee", "manager", "admin"), addLeaveRequest);

//export
export default router;
