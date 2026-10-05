import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function EmployeeAttendence() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/admin/attendance/employee").then(r => setRows(r.data?.data || [])).finally(() => setLoading(false)); }, []);
  if (loading) return <div className="py-12 text-center text-gray-500">Loading attendance…</div>;
  if (!rows.length) return <div className="py-12 text-center text-gray-500">No attendance records yet.</div>;
  return <div className="w-full overflow-x-auto"><div className="min-w-[760px]"><div className="grid grid-cols-5 bg-gray-50 border-b py-3 px-4 text-sm font-medium text-gray-500"><div>Employee</div><div>Present / Working</div><div>Department</div><div>Approval</div><div>Action</div></div>{rows.map((row) => { const employee=row.employee; const pct=row.totalWorkingDays ? Math.round(row.presentDays/row.totalWorkingDays*100) : 0; return <div key={employee._id} className="grid grid-cols-5 py-4 px-4 items-center border-b"><div className="flex items-center gap-3"><Avatar className="h-10 w-10 border"><AvatarImage src={employee.profileImg}/><AvatarFallback>{employee.firstName?.[0]}</AvatarFallback></Avatar><div><div className="text-sm font-medium">{employee.firstName} {employee.lastName}</div><div className="text-xs text-gray-500">{employee.empId}</div></div></div><div><div className="text-sm">{row.presentDays}/{row.totalWorkingDays}</div><div className="h-2 w-40 bg-gray-200 rounded mt-1"><div className="h-2 bg-[#305679] rounded" style={{width:`${pct}%`}} /></div></div><div className="text-sm">{employee.department}</div><div className="text-sm">See daily records</div><div><Button variant="ghost" size="sm">View</Button></div></div>; })}</div></div>;
}
