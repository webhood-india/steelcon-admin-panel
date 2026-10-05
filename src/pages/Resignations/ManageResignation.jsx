// src/pages/Resignations/ManageResignation.jsx
import React, { useState } from "react";
import { Search, Plus, Eye, Check } from "lucide-react";

/**
 * ManageResignation.jsx
 * - Two tabs: Resignation Request / Resignation Payments
 * - Table layout matches screenshots
 * - Tailwind CSS required
 */

const requestData = [
  {
    id: "1",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "2",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: "3",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: "4",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "5",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    id: "6",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    id: "7",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
  },
  {
    id: "8",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    id: "9",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
  },
  {
    id: "10",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    department: "Manufacturing",
    deptHead: "Aakash Kumar",
    appliedOn: "Oct 17, 2024",
    avatar: "https://randomuser.me/api/portraits/women/74.jpg",
  },
];

const paymentsData = [
  {
    id: "p1",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "p2",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: "p3",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    id: "p4",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "p5",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
  },
  {
    id: "p6",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    id: "p7",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
  },
  {
    id: "p8",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    id: "p9",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
  },
  {
    id: "p10",
    name: "Arlene McCoy",
    empId: "EMP 1564654546984",
    noticeEnd: "Oct 17, 2024",
    amount: "INR 40,000",
    avatar: "https://randomuser.me/api/portraits/women/74.jpg",
  },
];

export default function ManageResignation() {
  const [tab, setTab] = useState("request");
  const [q, setQ] = useState("");

  const filteredRequests = requestData.filter(
    (r) =>
      r.name.toLowerCase().includes(q.toLowerCase()) ||
      r.empId.toLowerCase().includes(q.toLowerCase()) ||
      r.department.toLowerCase().includes(q.toLowerCase())
  );

  const filteredPayments = paymentsData.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.empId.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Resignations
          </h1>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="w-72 pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> Add New
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setTab("request")}
              className={`py-3 text-sm font-medium ${
                tab === "request"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              Resignation Request
            </button>

            <button
              onClick={() => setTab("payments")}
              className={`py-3 text-sm font-medium ${
                tab === "payments"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              Resignation Payments
            </button>
          </nav>
        </div>

        {/* Table area */}
        <div className="overflow-x-auto bg-white rounded-md">
          {tab === "request" ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50 text-sm font-medium text-gray-600 text-left">
                  <th className="px-6 py-4">Employee name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Department Head</th>
                  <th className="px-6 py-4">Applied on</th>
                  <th className="px-6 py-4">Action Items</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {r.name}
                          </div>
                          <div className="text-xs text-gray-500">{r.empId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {r.department}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={r.avatar}
                          alt={r.deptHead}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-sm text-gray-900">
                          {r.deptHead}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {r.appliedOn}
                    </td>

                    <td className="px-6 py-4">
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* payments tab */
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50 text-sm font-medium text-gray-600 text-left">
                  <th className="px-6 py-4">Employee name</th>
                  <th className="px-6 py-4">Notice period end date</th>
                  <th className="px-6 py-4">Amount to be paid</th>
                  <th className="px-6 py-4">Action Items</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {p.name}
                          </div>
                          <div className="text-xs text-gray-500">{p.empId}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {p.noticeEnd}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {p.amount}
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-green-600">
                        <Check className="w-5 h-5" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
