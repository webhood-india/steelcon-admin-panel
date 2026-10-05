import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const AddDisciplinaryActionForm = () => {
  const [formData, setFormData] = useState({
    employeeId: "Rhye",
    employeeName: "Rhye",
    designation: "Rhye",
    reportTo: "Rhye",
    disciplinaryFormRaisedBy: "Rhye",
    disciplinaryFormNo: "Rhye",
    date: "Rhye",
    employeeEmail: "Rhye",
    employeeMobile: "Rhye",
    dateOfJoining: "Rhye",
    levelOfCorrectiveAction: "Enter",
    warningLevel: "Enter",
    violationType: "Enter",
    violationDate: "Enter",
    violationTime: "Enter",
    placeOfViolation: "Enter",
    shortDescription: "Enter",
    objectiveOfForm: "Enter",
    correctiveActionRequired: "Enter",
    comments: "Enter",
    uploadDocument: "Enter",
    timeLimit: "Enter",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving form data:", formData);
  };

  const handleSaveAndSend = () => {
    console.log("Saving and sending form data:", formData);
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add Disciplinary Action
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleSaveAndSend}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Save & Send
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Employee ID No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee ID No.
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) =>
                    handleInputChange("employeeId", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Disciplinary Form Raised by */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disciplinary Form Raised by
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.disciplinaryFormRaisedBy}
                    onChange={(e) =>
                      handleInputChange(
                        "disciplinaryFormRaisedBy",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Employee Personal Mobile No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Personal Mobile No.
                </label>
                <input
                  type="text"
                  value={formData.employeeMobile}
                  onChange={(e) =>
                    handleInputChange("employeeMobile", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Level of Corrective Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level of Corrective Action
                </label>
                <div className="relative">
                  <select
                    value={formData.levelOfCorrectiveAction}
                    onChange={(e) =>
                      handleInputChange(
                        "levelOfCorrectiveAction",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Level 1</option>
                    <option>Level 2</option>
                    <option>Level 3</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Violation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Violation Type
                </label>
                <div className="relative">
                  <select
                    value={formData.violationType}
                    onChange={(e) =>
                      handleInputChange("violationType", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Minor Violation</option>
                    <option>Major Violation</option>
                    <option>Critical Violation</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Violation Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Violation Time
                </label>
                <div className="relative">
                  <select
                    value={formData.violationTime}
                    onChange={(e) =>
                      handleInputChange("violationTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Short Description / Facts of Misconduct */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description / Facts of Misconduct
                </label>
                <div className="relative">
                  <select
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Misconduct Type 1</option>
                    <option>Misconduct Type 2</option>
                    <option>Misconduct Type 3</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Corrective Action Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Corrective Action Required
                </label>
                <div className="relative">
                  <select
                    value={formData.correctiveActionRequired}
                    onChange={(e) =>
                      handleInputChange(
                        "correctiveActionRequired",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Warning</option>
                    <option>Suspension</option>
                    <option>Training</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upload Relevant Document (if applicable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Relevant Document (if applicable)
                </label>
                <div className="relative">
                  <select
                    value={formData.uploadDocument}
                    onChange={(e) =>
                      handleInputChange("uploadDocument", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Upload Document</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Employee Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Full Name
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) =>
                    handleInputChange("employeeName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Report to (if applicable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report to (if applicable)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.reportTo}
                    onChange={(e) =>
                      handleInputChange("reportTo", e.target.value)
                    }
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Disciplinary Form No. */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disciplinary Form No.
                </label>
                <input
                  type="text"
                  value={formData.disciplinaryFormNo}
                  onChange={(e) =>
                    handleInputChange("disciplinaryFormNo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Employee Personal Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Personal Email
                </label>
                <input
                  type="text"
                  value={formData.employeeEmail}
                  onChange={(e) =>
                    handleInputChange("employeeEmail", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Date of Joining */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Joining
                </label>
                <input
                  type="text"
                  value={formData.dateOfJoining}
                  onChange={(e) =>
                    handleInputChange("dateOfJoining", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Warning Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Warning Level
                </label>
                <div className="relative">
                  <select
                    value={formData.warningLevel}
                    onChange={(e) =>
                      handleInputChange("warningLevel", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>First Warning</option>
                    <option>Second Warning</option>
                    <option>Final Warning</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Violation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Violation Date
                </label>
                <div className="relative">
                  <select
                    value={formData.violationDate}
                    onChange={(e) =>
                      handleInputChange("violationDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Other Date</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Place of Violation Occurred */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place of Violation Occurred
                </label>
                <div className="relative">
                  <select
                    value={formData.placeOfViolation}
                    onChange={(e) =>
                      handleInputChange("placeOfViolation", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Office Premises</option>
                    <option>Work Site</option>
                    <option>Break Room</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Objective of Disciplinary Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objective of Disciplinary Form
                </label>
                <div className="relative">
                  <select
                    value={formData.objectiveOfForm}
                    onChange={(e) =>
                      handleInputChange("objectiveOfForm", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Corrective Measure</option>
                    <option>Documentation</option>
                    <option>Performance Improvement</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Comments / Additional Information (Manager) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments / Additional Information (Manager)
                </label>
                <div className="relative">
                  <select
                    value={formData.comments}
                    onChange={(e) =>
                      handleInputChange("comments", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>Add Comments</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Time limit provided for Corrective Action / Response */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time limit provided for Corrective Action / Response
                </label>
                <div className="relative">
                  <select
                    value={formData.timeLimit}
                    onChange={(e) =>
                      handleInputChange("timeLimit", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
                  >
                    <option>Enter</option>
                    <option>24 Hours</option>
                    <option>48 Hours</option>
                    <option>1 Week</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDisciplinaryActionForm;
