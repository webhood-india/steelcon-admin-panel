import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner"; // Assuming you're using sonner for notifications

const EditDepartment = ({
  departmentCode,
  getAllDesignations,
  closeEditDialog,
  designationCode,
  designation,
}) => {
  const [designationName, setDesignation] = useState(designation || "");
  const [isLoading, setIsLoading] = useState(false);
  console.log(designationCode, designation,"dqw");
  useEffect(() => {
    setDesignation(designation);
  }, [designation]);
  const handleEditDepartment = async () => {
    // Validate input
    if (!designationName.trim()) {
      toast.error("Designation cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/designations`,
        {
          
          designationCode: designationCode,
          designation: designationName,
          departmentCode: departmentCode,
        }
      );
      console.log(response, "response data");

      if (response.data.success) {
        toast.success("Designation updated successfully");
        getAllDesignations(); // Refresh the list
        closeEditDialog(); // Close the dialog
      } else {
        // Handle server-side validation or other errors
        toast.error(response.data.message || "Failed to update designation");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message 
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-5">
        <div className="text-lg font-semibold text-[#101828]">
          Edit Designation
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label
              htmlFor="Designation"
              className="text-sm text-medium text-[#344054]"
            >
              Designation
            </Label>
            <Input
              onChange={(e) => setDesignation(e.target.value)}
              value={designationName}
              type="text"
              id="Designation"
              placeholder="Enter Designation"
              className="border border-[#D0D5DD] py-2.5 px-3.5 placeholder:text-[#667085] placeholder:text-base placeholder:font-normal shadow focus:shadow"
            />
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
              value={designationCode}
              // placeholder={departmentCode}
              className="border border-[#D0D5DD] py-2.5 px-3.5 placeholder:text-[#667085] placeholder:text-base placeholder:font-normal bg-gray-100"
              disabled
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={closeEditDialog}
            className="cursor-pointer py-2.5 px-4.5 border border-[#D0D5DD] rounded-lg font-semibold text-base text-[#344054] bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleEditDepartment}
            disabled={isLoading}
            className={`
              cursor-pointer py-2.5 px-4.5 border border-[#305679] 
              rounded-lg font-semibold text-base text-white bg-[#305679]
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
