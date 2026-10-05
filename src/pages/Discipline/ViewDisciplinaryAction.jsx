// src/pages/Discipline/ViewDisciplinaryAction.jsx
import React, { useState } from "react";
import { ArrowLeft, FileText, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { disciplinaryActions } from "@/data/discipline";

export default function ViewDisciplinaryAction() {
  const navigate = useNavigate();
  const { id } = useParams();
  // ensure id types match (disciplinaryActions may have string ids)
  const record = disciplinaryActions.find((r) => String(r.id) === String(id));

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brief: "",
    reEvaluation: "",
    remarks: "",
    attachment: "Attachment.png",
  });

  const handleBack = () => navigate(-1);
  const handleFinalDisposition = () => setShowModal(true);

  const handleSubmit = () => {
    // Replace with API call / state update when backend is ready
    console.log("Final Disposition Submitted:", formData);
    setShowModal(false);
  };

  if (!record) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={handleBack}
            className="mb-4 inline-flex items-center gap-2 text-sm text-slate-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-lg font-semibold">Record not found</h2>
            <p className="text-sm text-gray-500 mt-2">
              No disciplinary record matches id: {id}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const Cell = ({ label, children }) => (
    <div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-medium text-gray-900">{children ?? "—"}</div>
    </div>
  );

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              View Disciplinary Action
            </h1>
          </div>

          <div>
            <button
              onClick={handleFinalDisposition}
              className="px-4 py-2 rounded-md border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50"
            >
              Final Disposition
            </button>
          </div>
        </div>

        {/* Main details card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Cell label="Employee ID No.">{record.employeeId}</Cell>
            <Cell label="Employee Full Name">{record.name}</Cell>
            <Cell label="Designation">{record.designation ?? "—"}</Cell>
            <Cell label="Department">{record.department ?? "—"}</Cell>

            <Cell label="Report to (If applicable)">
              {record.reportTo ?? "—"}
            </Cell>
            <Cell label="Disciplinary Form Raised by">
              {record.disciplinaryFormRaisedBy ?? "—"}
            </Cell>

            <Cell label="Disciplinary Form No.">
              <div className="flex items-start gap-2">
                <div>{record.disciplinaryFormNo ?? "—"}</div>
                {record.warningLevel && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {record.warningLevel}
                  </div>
                )}
              </div>
            </Cell>

            <Cell label="Date">{record.date ?? "—"}</Cell>

            <Cell label="Personal Email">{record.personalEmail ?? "—"}</Cell>
            <Cell label="Personal Mobile No.">
              {record.personalMobile ?? "—"}
            </Cell>
            <Cell label="Date of Joining">{record.dateOfJoining ?? "—"}</Cell>
            <Cell label="Level of Corrective Action">
              {record.levelOfCorrectiveAction ?? "—"}
            </Cell>

            <Cell label="Warning Level">{record.warningLevel ?? "—"}</Cell>
            <Cell label="Violation Type / Description">
              {record.violationType ?? "—"}
            </Cell>
            <Cell label="Violation Date (if available)">
              {record.violationDate ?? "—"}
            </Cell>
            <Cell label="Violation Time (if available)">
              {record.violationTime ?? "—"}
            </Cell>

            <Cell label="Place of Violation Occurred (if available)">
              {record.placeOfViolation ?? "—"}
            </Cell>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 mb-1">
                Short Description / Facts of Misconduct
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.shortDescription ?? record.brief ?? "—"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 mb-1">
                Objective of Disciplinary Form
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.objectiveOfForm ?? "—"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 mb-1">
                Corrective Action Required
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.correctiveActionRequired ?? "—"}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-gray-500 mb-1">
                Comments / Additional Information (Manager)
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.comments ?? "—"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-500 mb-1">
                Upload Relevant Document (if applicable)
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-slate-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {record.attachment ?? "Attachment.png"}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">
                Time Limit Provided for Corrective Action / Response
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.timeLimit ?? "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Employee Submission card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Employee Submission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">
                Employee Statement
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.employeeStatement ?? "—"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">
                Comments / Additional Information (Employee)
              </div>
              <div className="text-sm font-medium text-gray-900">
                {record.employeeComments ?? "—"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">
                Upload Supportive Document (if applicable)
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-md bg-slate-50 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {record.employeeAttachment ?? "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Disposition Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Final Disposition
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Brief of action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brief of action
                </label>
                <textarea
                  rows={3}
                  value={formData.brief}
                  onChange={(e) =>
                    setFormData({ ...formData, brief: e.target.value })
                  }
                  placeholder="Enter"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Re-evaluation scheduled for */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Re-evaluation scheduled for
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.reEvaluation}
                    onChange={(e) =>
                      setFormData({ ...formData, reEvaluation: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm pr-8 focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Relevant Documents (if applicable)
                </label>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">
                    {formData.attachment}
                  </span>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any Additional Information / Remarks
                </label>
                <textarea
                  rows={3}
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                  placeholder="Enter"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
