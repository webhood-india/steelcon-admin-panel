// src/pages/ManageManpower/ManageManpower.jsx
import React from "react";
import { Eye, Trash } from "lucide-react";

/**
 * Pixel-faithful table replica for:
 * "Manage Manpower requisition requests"
 *
 * Tailwind CSS required in project.
 */

const data = [
  {
    id: "1",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Arlene McCoy",
    requestedBy: "Arlene McCoy",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Complete",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "2",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Esther Howard",
    requestedBy: "Esther Howard",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: "3",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Jacob Jones",
    requestedBy: "Jacob Jones",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Complete",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: "4",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Guy Hawkins",
    requestedBy: "Guy Hawkins",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: "5",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Marvin McKinney",
    requestedBy: "Marvin McKinney",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Complete",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg",
  },
  {
    id: "6",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Albert Flores",
    requestedBy: "Albert Flores",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    id: "7",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Guy Hawkins",
    requestedBy: "Guy Hawkins",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Complete",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    id: "8",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Darlene Robertson",
    requestedBy: "Darlene Robertson",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Pending",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    id: "9",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Cameron Williamson",
    requestedBy: "Cameron Williamson",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Complete",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    id: "10",
    positionTitle: "Staff Engineer",
    requestingDepartment: "Engineering",
    manager: "Eleanor Pena",
    requestedBy: "Eleanor Pena",
    vacancies: 3,
    requiredBy: "24 Jan 2024",
    status: "Complete",
    avatar: "https://randomuser.me/api/portraits/women/74.jpg",
  },
];

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full";
  if (status === "Complete")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>{status}</span>
    );
  if (status === "Pending")
    return (
      <span className={`${base} bg-amber-100 text-amber-700`}>{status}</span>
    );
  return <span className={`${base} bg-gray-100 text-gray-700`}>{status}</span>;
}

export default function ManageManpower() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Manage Manpower requisition requests
        </h1>

        {/* Table wrapper */}
        <div className="overflow-x-auto bg-white rounded-md shadow-sm">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50 text-sm font-medium text-gray-600 text-left">
                <th className="px-6 py-4">Position Title</th>
                <th className="px-6 py-4">Requesting Department</th>
                <th className="px-6 py-4">Manager</th>
                <th className="px-6 py-4">Requested By</th>
                <th className="px-6 py-4">Vacancies</th>
                <th className="px-6 py-4">Required by</th>
                <th className="px-6 py-4">Request Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {/* Position Title */}
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm font-medium text-gray-900">
                      {row.positionTitle}
                    </div>
                  </td>

                  {/* Requesting Department */}
                  <td className="px-6 py-4 align-top text-sm text-gray-700">
                    {row.requestingDepartment}
                  </td>

                  {/* Manager */}
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.manager}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-sm text-gray-900">{row.manager}</div>
                    </div>
                  </td>

                  {/* Requested By */}
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.requestedBy}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-sm text-gray-900">
                        {row.requestedBy}
                      </div>
                    </div>
                  </td>

                  {/* Vacancies */}
                  <td className="px-6 py-4 align-top text-sm text-gray-700">
                    {row.vacancies}
                  </td>

                  {/* Required by */}
                  <td className="px-6 py-4 align-top text-sm text-gray-700">
                    {row.requiredBy}
                  </td>

                  {/* Request Status */}
                  <td className="px-6 py-4 align-top">
                    <StatusBadge status={row.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center gap-4">
                      <button
                        className="text-gray-500 hover:text-gray-700 p-1"
                        aria-label={`view-${row.id}`}
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600 p-1"
                        aria-label={`delete-${row.id}`}
                        title="Delete"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
