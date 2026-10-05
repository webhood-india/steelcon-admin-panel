import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const sample = months.map((m, i) => {
  const base = 40000;
  const variations = [
    0, 0, 0, -39000, 0, 0, -38000, -38000, 0, -3000, -3000, 0,
  ];
  const salary = base + (variations[i] || 0);
  return { month: m, daysWorked: 26, totalDays: 31, salary };
});

function ProgressBar({ value, max = 100 }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          background:
            "linear-gradient(90deg, rgba(48,86,121,1) 0%, rgba(48,120,170,1) 100%)",
        }}
      />
    </div>
  );
}

export default function ViewPayout() {
  const [year, setYear] = useState(new Date().getFullYear());
  const rows = sample;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">View Payout</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border rounded p-2">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="outline-none text-sm"
            >
              {Array.from({ length: 5 }).map((_, i) => {
                const y = new Date().getFullYear() - 2 + i;
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <Card className="shadow-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-12 gap-4 items-center px-6 py-3 border-b bg-slate-50 text-sm text-gray-600">
            <div className="col-span-4">Month</div>
            <div className="col-span-5 text-left">Number of days worked</div>
            <div className="col-span-3 text-right">Salary per month</div>
          </div>

          <div className="divide-y">
            {rows.map((r) => (
              <div
                key={r.month}
                className="grid grid-cols-12 gap-4 items-center px-6 py-4"
              >
                <div className="col-span-4 text-sm text-gray-700">
                  {r.month}
                </div>
                <div className="col-span-5">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <ProgressBar value={r.daysWorked} max={r.totalDays} />
                    </div>
                    <div className="w-20 text-sm text-gray-600 text-right">{`${r.daysWorked}/${r.totalDays}`}</div>
                  </div>
                </div>
                <div className="col-span-3 text-right text-sm font-medium text-gray-700">
                  {formatCurrency(r.salary)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
