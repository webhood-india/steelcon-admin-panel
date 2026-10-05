import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectRoutes";
import DeafultLayout from "@/pages/DeafultLayout";
import Dashboard from "@/pages/Dashbord";
import Login from "@/pages/Auth/Login";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import CreatePassword from "@/pages/Auth/CreatePassword";
import CheckEmail from "@/pages/Auth/CheckEmail";
import ResetPassword from "@/pages/Auth/ResetPassword";
import SetPassword from "@/pages/Auth/SetPassword";
import ManageDepartment from "@/pages/ManageDepartment";
import MangeManagers from "@/pages/ManageManagers";
import ManageTeam from "@/pages/ManageTeam";
import DepartmentDesignation from "@/pages/DepartmentDesignation";
import ManageAttendence from "@/pages/Attendence";
import AttendanceReport from "@/pages/Report";
import LeaveApplication from "@/pages/LeaveApplication";
import ManagePayments from "@/pages/Payout/ManagePayments";
import ManageLoan from "@/pages/Loans/ManageLoan";
import ManageProfile from "@/pages/Accounts/ManageProfile";
import Settings from "@/pages/Settings/Settings";
import CrudModule from "@/pages/Management/CrudModule";

const roles = { all: ["admin", "manager", "employee"], admin: ["admin"], manager: ["admin", "manager"], adminManager: ["admin", "manager"] };
const page = (Component, allowed = roles.all) => (
  <ProtectedRoute roles={allowed}><DeafultLayout><Component /></DeafultLayout></ProtectedRoute>
);

const router = createBrowserRouter([
  { path: "/", element: page(Dashboard) },
  { path: "/login", element: <Login /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/createpassword", element: <CreatePassword /> },
  { path: "/checkemail", element: <CheckEmail /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  { path: "/setpassword", element: <SetPassword /> },

  { path: "/manage-department", element: page(ManageDepartment, roles.admin) },
  { path: "/department-designation", element: page(DepartmentDesignation, roles.admin) },
  { path: "/manage-managers", element: page(MangeManagers, roles.admin) },
  { path: "/manage-team", element: page(ManageTeam, roles.adminManager) },
  { path: "/manage-attendance", element: page(ManageAttendence) },
  { path: "/attendance-report", element: page(AttendanceReport) },
  { path: "/leave-application", element: page(LeaveApplication) },
  { path: "/payout-details", element: page(ManagePayments, ["admin", "employee"]) },
  { path: "/discipline-action", element: page(() => <CrudModule type="discipline" />) },
  
  
  { path: "/settings", element: page(Settings, roles.admin) },
  { path: "/referrals", element: page(() => <CrudModule type="referrals" />) },
  
  { path: "/loans", element: page(ManageLoan, roles.admin) },
  { path: "/manage-manpower", element: page(() => <CrudModule type="manpower" />, roles.adminManager) },
  { path: "/resignation", element: page(() => <CrudModule type="resignations" />, ["admin", "employee"]) },
  { path: "/training-module", element: page(() => <CrudModule type="training" />) },
  { path: "/offer-letter", element: page(() => <CrudModule type="offers" />, roles.admin) },
  { path: "/support-request", element: page(() => <CrudModule type="support" />) },
  { path: "/manage-profile", element: page(ManageProfile) },
  { path: "/announcement", element: page(() => <CrudModule type="announcements" />) },
  { path: "/company-policies", element: page(() => <CrudModule type="policies" />) },
]);

export default router;
