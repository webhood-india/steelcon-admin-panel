import React from "react";
import menu from "../../assets/icon/menu.png";
import Overview from "./Overview";
import AnnouncementsPage from "./AnnoucementPage";
const Dashboard = () => {
  return (
    <>
      <div className="w-full">
        <div className=" mt-7 py-4 pl-3  flex flex-col gap-8">
          <div className="font-semibold text-3xl text-[#101828]">Dashboard</div>
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-lg">Overview</h4>
            <div className="">
              <img src={menu}></img>
            </div>
          </div>
        </div>
      </div>
      <Overview />
      {/* <AnnouncementsPage /> */}
    </>
  );
};

export default Dashboard;
