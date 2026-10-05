import React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const AttendanceReport = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  // Sample attendance data - in a real app this would come from an API
  const attendanceData = {
    Jan: Array(31)
      .fill("P")
      .map((p, i) => (i === 9 ? "A" : p)),
    Feb: Array(31)
      .fill("P")
      .map((p, i) => (i === 15 ? "C" : i === 20 ? "H" : p)),
    Mar: Array(31)
      .fill("A")
      .map((a, i) =>
        i === 5 || i === 9 || i === 11 || i === 17 || i === 21 || i === 25
          ? "P"
          : a
      ),
    Apr: Array(31)
      .fill("P")
      .map((p, i) => (i === 16 || i === 26 ? "H" : p)),
    May: Array(31)
      .fill("P")
      .map((p, i) => (i === 17 ? "H" : p)),
    June: Array(31)
      .fill("P")
      .map((p, i) => (i === 15 ? "C" : i === 20 ? "H" : p)),
    July: Array(31).fill("P"),
    Aug: Array(31)
      .fill("P")
      .map((p, i) => (i === 10 || i === 16 ? "C" : i === 22 ? "H" : p)),
    Sept: Array(31)
      .fill("P")
      .map((p, i) =>
        i === 5 || i === 16 || i === 20 || i === 22 || i === 25 || i === 28
          ? "A"
          : p
      ),
    Oct: Array(31)
      .fill("P")
      .map((p, i) => (i === 9 ? "A" : p)),
    Nov: Array(31).fill("P"),
    Dec: Array(31).fill("P"),
  };

  // State for the selected cell
  const [selected, setSelected] = useState({ month: "Jan", day: "10" });

  // Get status color based on attendance code
  const getStatusColor = (status) => {
    switch (status) {
      case "P":
        return "bg-green-500 text-white";
      case "A":
        return "bg-red-500 text-white";
      case "H":
        return "bg-orange-400 text-white";
      case "C":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <Card className="w-full mx-auto !border-0 shadow-none ">
      <CardHeader className="flex flex-row items-center justify-between pb-2 !border-b border-[#EAECF0]">
        <CardTitle className="text-lg font-semibold">
          Attendance Report
        </CardTitle>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-sm text-muted-foreground">Absent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              <span className="text-sm text-muted-foreground">Half-Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-sm text-muted-foreground">
                Company/Holiday Leave
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[80px_1fr] gap-2">
          <div className="text-sm font-medium text-muted-foreground pt-8">
            Month
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-31 min-w-[930px]">
              {days.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          {months.map((month) => (
            <div key={month} className="contents">
              <div className="h-8 flex items-center text-sm">{month}</div>
              <div className="grid grid-cols-31 gap-1 min-w-[930px]">
                {days.map((day, index) => {
                  const status = attendanceData[month]?.[index] || "";
                  const isSelected =
                    selected.month === month && selected.day === day;
                  return (
                    <button
                      key={`${month}-${day}`}
                      className={`
                        h-8 w-8 flex items-center justify-center text-xs font-medium rounded
                        ${getStatusColor(status)}
                        ${
                          isSelected ? "ring-2 ring-offset-2 ring-blue-500" : ""
                        }
                      `}
                      onClick={() => setSelected({ month, day })}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="text-sm font-medium text-muted-foreground pt-4">
            Days
          </div>
          <div className="overflow-x-auto pt-4">
            <div className="grid grid-cols-31 min-w-[930px]">
              {days.map((day) => (
                <div
                  key={day}
                  className="h-8 flex items-center justify-center text-xs text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default AttendanceReport;
