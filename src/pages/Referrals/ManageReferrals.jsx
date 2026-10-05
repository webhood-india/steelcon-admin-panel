// src/pages/Referrals/ManageReferrals.jsx
import React from "react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { referrals } from "@/data/referrals"; // <-- if you don't use '@', use "../../data/referrals"

export default function ManageReferrals() {
  const navigate = useNavigate();

  const goToView = (e, id) => {
    if (e) e.stopPropagation();
    navigate(`/referrals/${id}`);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    // Replace with API call or state update
    if (confirm("Are you sure you want to delete this referral?")) {
      console.log("Delete referral", id);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Manage Referrals
      </h1>

      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-sm font-medium text-gray-600 text-left">
              <th className="px-6 py-3">Candidate Name</th>
              <th className="px-6 py-3">Referral Department</th>
              <th className="px-6 py-3">
                Position for which candidate is referred
              </th>
              <th className="px-6 py-3">Employee Name</th>
              <th className="px-6 py-3">Referred on</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {referrals.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => goToView(null, r.id)}
              >
                {/* Candidate */}
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-sm font-medium">
                        {r.candidateName}
                      </div>
                      <div className="text-xs text-gray-500">{r.brief}</div>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {r.department}
                </td>

                {/* Position */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {r.position}
                </td>

                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.employeeName}
                      className="w-10 h-10 rounded-full object-cover"
                      onClick={(e) => goToView(e, r.id)} // clicking avatar also goes to view
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {r.employeeName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID {r.employeeId}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Referred on */}
                <td className="px-6 py-4 text-sm text-gray-700">
                  {r.referredOn}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={(e) => goToView(e, r.id)}
                    className="text-gray-500 hover:text-gray-700 p-1"
                    aria-label={`View ${r.candidateName}`}
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => onDelete(e, r.id)}
                    className="text-gray-500 hover:text-red-600 p-1"
                    aria-label={`Delete ${r.candidateName}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
