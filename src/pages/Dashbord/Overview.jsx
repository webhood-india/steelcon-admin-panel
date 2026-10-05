import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { getApiError } from "@/lib/api";
import { useSelector } from "react-redux";

const Overview = () => {
  const user = useSelector((state) => state.auth.user);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/dashboard/dashboard")
      .then((response) => { if (active) setStats(response.data?.data || {}); })
      .catch((err) => { if (active) setError(getApiError(err)); });
    return () => { active = false; };
  }, []);

  const cards = [
    { title: "Employees", value: stats?.employees ?? "—" },
    { title: "Managers", value: stats?.managers ?? "—" },
    { title: "Present Today", value: stats?.presentToday ?? "—" },
    { title: "Pending/Active Leave", value: stats?.leaveRequests ?? "—" },
    { title: "Active Loans", value: stats?.activeLoans ?? "—" },
  ];

  return (
    <div className="container mx-auto px-4 py-5 border-t border-b">
      {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="mb-4 text-sm text-[#475467]">Company overview · <span className="capitalize">{user?.typeOfUser}</span></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <div key={card.title} className="rounded-lg border bg-white px-5 py-4 shadow-sm">
            <div className="text-sm font-medium text-[#475467] mb-3">{card.title}</div>
            <div className="text-3xl font-semibold text-[#101828]">{stats ? card.value : "…"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
