import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api, { getApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function MangerAttendence() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true); const [error,setError]=useState("");
  const load=()=>{setLoading(true);api.get("/admin/attendance/employee").then(r=>setRows(r.data?.data||[])).catch(e=>setError(getApiError(e))).finally(()=>setLoading(false));};
  useEffect(load,[]);
  if(loading)return <div className="py-12 text-center text-gray-500">Loading team attendance…</div>;
  return <div>{error&&<div className="mb-3 text-sm text-red-600">{error}</div>}<div className="overflow-x-auto"><div className="min-w-[760px]"><div className="grid grid-cols-5 bg-gray-50 border-b py-3 px-4 text-sm font-medium text-gray-500"><div>Employee</div><div>Present / Working</div><div>Department</div><div>Status</div><div>Action</div></div>{rows.map(row=>{const e=row.employee;return <div key={e._id} className="grid grid-cols-5 py-4 px-4 items-center border-b"><div className="flex items-center gap-3"><Avatar className="h-10 w-10 border"><AvatarImage src={e.profileImg}/><AvatarFallback>{e.firstName?.[0]}</AvatarFallback></Avatar><div><div className="text-sm font-medium">{e.firstName} {e.lastName}</div><div className="text-xs text-gray-500">{e.empId}</div></div></div><div className="text-sm">{row.presentDays}/{row.totalWorkingDays}</div><div className="text-sm">{e.department}</div><div className="text-sm">Monthly summary</div><div><Button variant="ghost" size="sm">Review</Button></div></div>})}</div></div></div>;
}
