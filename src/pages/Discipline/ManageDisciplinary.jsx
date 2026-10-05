// src/pages/Discipline/ManageDisciplinary.jsx
import React, { useState } from "react";
import { Plus, FileText, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { disciplinaryActions as sampleData } from "@/data/discipline";

const ManageDisciplinary = () => {
  const [selectedStatus] = useState("Closed");
  const navigate = useNavigate();

  const getAvatarColor = (index) => {
    const colors = [
      "bg-purple-100",
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-pink-100",
      "bg-indigo-100",
      "bg-red-100",
      "bg-orange-100",
      "bg-cyan-100",
      "bg-emerald-100",
    ];
    return colors[index % colors.length];
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const onAddNew = () => navigate("/discipline/new");
  const goToDetails = (id) => navigate(`/discipline/${id}`);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Manage Disciplinary Actions
        </h1>

        <div className="flex gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <span>{selectedStatus}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600 border-b">
          <div>Employee Name</div>
          <div>Brief of action</div>
          <div>Category</div>
          <div>Status</div>
          <div>Attachment</div>
          <div>Action</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {sampleData.map((action, index) => (
            <div
              key={action.id}
              role="button"
              tabIndex={0}
              onClick={() => goToDetails(action.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToDetails(action.id);
                }
              }}
              /* 
                Important classes:
                  - min-h ensures rows are consistent height
                  - whitespace-nowrap + truncate prevents wrapping
                  - focus:outline-none hides browser outline for mouse focus
                  - focus-visible:ring-* shows ring only for keyboard focus
              */
              className={
                "grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors cursor-pointer " +
                "min-h-[72px] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2"
              }
            >
              {/* Employee cell */}
              <div className="flex items-center gap-3">
                <div
                  className={`${getAvatarColor(
                    index
                  )} w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 flex-shrink-0`}
                >
                  {getInitials(action.name)}
                </div>
                <div className="overflow-hidden">
                  <div
                    className="font-medium text-gray-900 truncate max-w-[220px] whitespace-nowrap"
                    title={action.name}
                  >
                    {action.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-[220px] whitespace-nowrap">
                    ID {action.employeeId}
                  </div>
                </div>
              </div>

              {/* Brief column */}
              <div className="text-gray-700 text-sm truncate max-w-[260px] whitespace-nowrap">
                {action.brief}
              </div>

              {/* Category */}
              <div className="text-gray-700 text-sm truncate max-w-[120px] whitespace-nowrap">
                {action.category}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    action.status === "Closed"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {action.status}
                </span>
              </div>

              {/* Attachment */}
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700 truncate max-w-[140px] whitespace-nowrap">
                  {action.attachment}
                </span>
              </div>

              {/* Action */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent calling row onClick twice
                    goToDetails(action.id);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageDisciplinary;
