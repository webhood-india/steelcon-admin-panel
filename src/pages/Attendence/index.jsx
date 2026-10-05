import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import api, { getApiError } from "@/lib/api";
import EmployeeAttendence from "./EmployeeAttendence";
import MangerAttendence from "./MangerAttendence";

export default function ManageAttendance() {
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Present");
  const isEmployee = user?.typeOfUser === "employee";

  const markToday = async () => {
    setMessage(""); setError("");
    try {
      await api.post("/admin/add-attendance", { date: new Date().toISOString(), status });
      setMessage("Attendance submitted for manager approval.");
    } catch (err) { setError(getApiError(err)); }
  };

  return (
    <div className="w-full mx-auto px-3 mt-8">
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div><h1 className="text-3xl font-semibold text-[#101828]">Attendance</h1><p className="text-sm text-gray-500 mt-1">Submit, review and approve attendance.</p></div>
        {isEmployee && <div className="flex gap-2 items-center"><select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-md px-3 py-2 text-sm"><option>Present</option><option>Absent</option><option>Half Day</option><option>Leave</option></select><Button onClick={markToday}>Mark today</Button></div>}
      </div>
      {message && <div className="mb-4 rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-700">{message}</div>}
      {error && <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{error}</div>}
      {isEmployee ? <EmployeeAttendence /> : (
        <Tabs defaultValue="employee" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 rounded-none bg-white border-b">
            <TabsTrigger value="employee">Employee Attendance</TabsTrigger>
            <TabsTrigger value="manager">Manager Attendance</TabsTrigger>
          </TabsList>
          <TabsContent value="employee"><EmployeeAttendence /></TabsContent>
          <TabsContent value="manager"><MangerAttendence /></TabsContent>
        </Tabs>
      )}
    </div>
  );
}
