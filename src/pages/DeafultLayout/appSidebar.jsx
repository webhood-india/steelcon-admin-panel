import * as React from "react";
import logo from "../../assets/images/logo.png";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./navMain";
import { NavUser } from "./navUser";
import { NavSupportSetting } from "./navSupportSetting";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import dashboardIcon from "../../assets/sidebarImages/dashboardicon.png";
import Department from "../../assets/sidebarImages/manageDepartment.png";
import manager from "../../assets/sidebarImages/manageManager.png";
import manageTeam from "../../assets/sidebarImages/ManageTeam.png";
import Attendance from "../../assets/sidebarImages/manageAttendence.png";
import Application from "../../assets/sidebarImages/LeaveApplication.png";
import payout from "../../assets/sidebarImages/PayoutDeatail.png";
import Action from "../../assets/sidebarImages/DisciplineAction.png";
import offer from "../../assets/sidebarImages/offerletter.png";
import training from "../../assets/sidebarImages/TrainingModule.png";
import Announcement from "../../assets/sidebarImages/Announcement.png";
import companyPolicies from "../../assets/sidebarImages/CompanyPolicies.png";
import support from "../../assets/sidebarImages/supportRequest.png";
import setting from "../../assets/sidebarImages/setting.png";
import referral from "../../assets/sidebarImages/referrals.png";
import avatar from "../../assets/sidebarImages/Avatar.png";

const navMain = [
  { title: "Dashboard", url: "/", image: dashboardIcon, roles: ["admin", "manager", "employee"] },
  { title: "Manage Department", url: "/manage-department", image: Department, roles: ["admin"] },
  { title: "Department Designation", url: "/department-designation", image: Department, roles: ["admin"] },
  { title: "Manage Managers", url: "/manage-managers", image: manager, roles: ["admin"] },
  { title: "Manage Team", url: "/manage-team", image: manageTeam, roles: ["admin", "manager"] },
  { title: "Attendance", url: "/manage-attendance", image: Attendance, roles: ["admin", "manager", "employee"] },
  { title: "Leave Application", url: "/leave-application", image: Application, roles: ["admin", "manager", "employee"] },
  { title: "Payout Details", url: "/payout-details", image: payout, roles: ["admin", "employee"] },
  { title: "Discipline Action", url: "/discipline-action", image: Action, roles: ["admin", "manager", "employee"] },
  { title: "Offer Letter", url: "/offer-letter", image: offer, roles: ["admin"] },
  { title: "Announcement", url: "/announcement", image: Announcement, roles: ["admin", "manager", "employee"] },
  { title: "Training Module", url: "/training-module", image: training, roles: ["admin", "manager", "employee"] },
  { title: "Company Policies", url: "/company-policies", image: companyPolicies, roles: ["admin", "manager", "employee"] },
  { title: "Referrals", url: "/referrals", image: referral, roles: ["admin", "manager", "employee"] },
  { title: "Loans", url: "/loans", image: payout, roles: ["admin"] },
  { title: "Manpower Request", url: "/manage-manpower", image: manager, roles: ["admin", "manager"] },
  { title: "Resignation", url: "/resignation", image: manager, roles: ["admin", "employee"] },
  { title: "Profile", url: "/manage-profile", image: manager, roles: ["admin", "manager", "employee"] },
];

const navSupportSetting = [
  { title: "Support Request", url: "/support-request", image: support, roles: ["admin", "manager", "employee"] },
  { title: "Settings", url: "/settings", image: setting, roles: ["admin"] },
];

export function AppSidebar({ ...props }) {
  const user = useSelector((state) => state.auth.user);
  const role = user?.typeOfUser;
  const filter = (items) => items.filter((item) => item.roles.includes(role));
  const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.username || "User";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="pl-6">
        <Link to="/"><img src={logo} alt="Steelcon" className="h-[48px] w-[133px] object-contain mt-8" /></Link>
      </SidebarHeader>
      <SidebarContent className="pl-2 mt-0 pt-0 thin-scrollbar overflow-y-scroll">
        <NavMain items={filter(navMain)} />
        <NavSupportSetting items={filter(navSupportSetting)} />
      </SidebarContent>
      <SidebarFooter className="px-4">
        <NavUser user={{ ...user, name: displayName, email: user?.personalEmail || user?.workEmail || "", image: user?.profileImg || avatar }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
