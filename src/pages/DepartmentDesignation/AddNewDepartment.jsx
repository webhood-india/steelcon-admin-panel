import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { colorSpace } from "@cloudinary/url-gen/actions/delivery";
const AddNewDepartment = ({
  getAllDesignations,
  closeAddNewDialog,
  departments,
}) => {
  const [designation, setDesignation] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ designation: "", code: "" });
  const [department, setDepartment] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");

  const dispatch = useDispatch();
  const validateInputs = () => {
    let newErrors = { designation: "", code: "" };
    let isValid = true;

    if (!designation.trim()) {
      newErrors.designation = "Department name is required"; // Added trim to check for empty spaces
      isValid = false;
    }

    if (!code.trim()) {
      newErrors.code = "Department code is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCancel = () => {
    setDesignation("");
    setCode("");
    setErrors({ designation: "", code: "" });
    closeAddNewDialog(); // Optionally close dialog on cancel
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/designations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            designation: designation,
            code: code,
            departmentCode: departmentCode,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to add department: ${response}`);
      }
      const data = await response.json(); // Parse the response

      // Reset state and close dialog only on success
      setDesignation("");
      setCode("");
      setErrors({ designation: "", code: "" });
      closeAddNewDialog();
      toast.success("Designation has been added sucessfully.");
      getAllDesignations(); // Refresh the department list
    } catch (err) {
      console.error("Error submitting department:");
      setErrors((prev) => ({
        ...prev,
        designation: "Failed to add department. Please try again.",
      }));
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="text-lg font-semibold text-[#101828]">
          Add New Designation
        </div>

        <div className="flex flex-col gap-[16px]">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label
              htmlFor="department"
              className="text-sm text-medium text-[#344054]"
            >
              Deparment
            </Label>
            <select
              id="department"
              value={department}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                const selectedDepartment = departments[selectedIndex - 1]; // -1 to account for the "Select Department" option
                
                setDepartment(e.target.value);
                if (selectedDepartment) {
                  setDepartmentCode(selectedDepartment.code);
                }
              }}
              className="border border-[#D0D5DD] py-2.5 px-3.5  text-[#667085] text-base font-normal shadow focus:shadow rounded-md "
            >
              <option value="">Select Department</option>
              {departments?.map((item, index) => {
                console.log(item);
                return (
                  <option
                    key={index}
                    value={item.code}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
            {errors.designation && (
              <p className="text-red-500 text-sm">{errors.designation}</p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label
              htmlFor="Designation"
              className="text-sm text-medium text-[#344054]"
            >
              Designation
            </Label>
            <Input
              type="text"
              id="Designation"
              placeholder="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="border border-[#D0D5DD] py-2.5 px-3.5 placeholder:text-[#667085] placeholder:text-base placeholder:font-normal"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code}</p>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label
              htmlFor="code"
              className="text-sm text-medium text-[#344054]"
            >
              Code
            </Label>
            <Input
              type="text"
              id="code"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-[#D0D5DD] py-2.5 px-3.5 placeholder:text-[#667085] placeholder:text-base placeholder:font-normal"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer py-2.5 px-4.5 border border-[#D0D5DD] rounded-lg font-semibold text-base text-[#344054] bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer py-2.5 px-4.5 border border-[#305679] rounded-lg font-semibold text-base text-white bg-[#305679] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddNewDepartment;
