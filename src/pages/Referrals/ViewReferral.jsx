// src/pages/Referrals/ViewReferral.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { referrals } from "@/data/referrals"; // <-- use relative path if no '@'

export default function ViewReferral() {
  const { id } = useParams();
  const navigate = useNavigate();

  const item = referrals.find((x) => String(x.id) === String(id));

  if (!item) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-sm text-gray-600"
          >
            ← Back
          </button>
          <h2 className="text-xl font-semibold">Referral not found</h2>
          <p className="mt-2 text-sm text-gray-500">
            No referral exists with id <strong>{id}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white shadow-sm border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-medium text-gray-800">View Referral</h1>
          </div>
        </div>

        {/* Employee Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Employee Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
              <div className="text-xs text-gray-500">Employee ID No.</div>
              <div className="mt-1 font-medium">{item.employeeId || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Employee Full Name</div>
              <div className="mt-1 font-medium">{item.employeeName || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Designation</div>
              <div className="mt-1 font-medium">
                {item.position || item.department || "—"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Personal Email</div>
              <div className="mt-1 font-medium">
                {item.personalEmail || "—"}
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="text-xs text-gray-500">Mobile</div>
              <div className="mt-1 font-medium">
                {item.personalMobile || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Referral Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Referral Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-sm text-gray-700">
            <div>
              <div className="text-xs text-gray-500">Candidate Name</div>
              <div className="mt-1 font-medium">{item.candidateName}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="mt-1">{item.personalEmail || "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Mobile</div>
              <div className="mt-1">{item.personalMobile || "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">
                Position for which candidate is referred
              </div>
              <div className="mt-1 font-medium">{item.position}</div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs text-gray-500">
                Have you asked the individual to submit application online?
              </div>
              <div className="mt-1 font-medium">Yes</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">
                If Yes, Date Submitted
              </div>
              <div className="mt-1">{item.referredOn}</div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs text-gray-500">
                How do you know this individual?
              </div>
              <div className="mt-1">{item.brief || "—"}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">
                How long have you known this individual?
              </div>
              <div className="mt-1">
                {item.dateOfJoining
                  ? `${
                      new Date(item.dateOfJoining).getFullYear()
                        ? item.dateOfJoining
                        : "—"
                    }`
                  : "—"}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="text-xs text-gray-500">
                Why is this candidate qualified for the position?
              </div>
              <div className="mt-2 text-sm text-gray-700">
                {item.brief || "No additional details provided."}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-xs text-gray-500">Resume/CV</div>
              <div className="mt-1 inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-md px-3 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-xs">
                  {item.attachment || "Attachment.png"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Human Resources Information (simple) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Human Resources Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <label className="text-xs text-gray-500">
                Date and Time Received
              </label>
              <select className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm">
                <option>Select</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">Position</label>
              <input
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={item.position || ""}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Interviewed</label>
              <input
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={"Yes"}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Hired</label>
              <input
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={"No"}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">
                If hired, then Date of Hire
              </label>
              <input
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                value={item.dateOfJoining || ""}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">HR Rep. Name</label>
              <input
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
                defaultValue="David Lee"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Notes</label>
              <textarea
                className="mt-1 block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm h-24"
                defaultValue={item.brief || "No notes"}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-500">HR Signature</label>
              <div className="mt-2 border border-dashed border-gray-200 rounded-md p-6 text-center text-sm bg-gray-50">
                <div className="mb-2">Click to upload or drag and drop</div>
                <div className="text-xs text-gray-400">
                  pdf / .png / .jpg / .heic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
