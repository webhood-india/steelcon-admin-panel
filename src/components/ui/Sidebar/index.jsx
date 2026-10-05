import React from "react";
// import logo from "../../../assets/images/logo.png";
const Sidebar = () => {
  return (
    <>
      {/* <div className="w-[312px] h-screen bg-[#1e3a5f] text-white flex flex-col py-8 pl-6">
        <div className="flex items-center  ">
          <img src={logo} alt="Company Logo" className="h-12 w-auto" />
        </div>
        <nav className="flex-1 mt-6">
          <ul className="space-y-1">
            <li className="bg-[#3b537f] rounded-lg">
              <Link to="#" className="flex items-center px-4 py-2">
                <span className="mr-3">📊</span> Dashboard
              </Link>
            </li>
            {[
              ["📄", "View Policies"],
              ["🏢", "Manage Department"],
              ["📦", "Manage Managers"],
              ["👥", "Manage Team"],
              ["🕒", "Attendance"],
              ["✉️", "Leave Application"],
              ["💰", "Payout Details"],
              ["🛡️", "Discipline Action"],
              ["📜", "Offer Letter"],
              ["📢", "Announcement"],
              ["🎓", "Training Module"],
              ["📂", "Company Policies"],
            ].map(([icon, label], index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 hover:bg-[#2c4b75] rounded-lg"
                >
                  <span className="mr-3">{icon}</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-3 hover:bg-[#2c4b75] rounded-lg"
              >
                <span className="mr-3">⚙️</span> Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-3 hover:bg-[#2c4b75] rounded-lg"
              >
                <span className="mr-3">🆘</span> Support Request
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 mt-6 p-3 bg-[#2c4b75] rounded-lg">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">Olivia Rhye</p>
            <p className="text-xs text-gray-300">olivia@untitledui.com</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
