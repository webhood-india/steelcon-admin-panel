import axios from "axios";
import React from "react";
import { toast } from "sonner";

const DeleteDepartment = ({
  departmentId,
  getAllDepartments,
  closeDeleteDialog,
}) => {
  const handleDeleteDepartment = async () => {
    // delete department
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/departments/${departmentId}`
      );
      getAllDepartments();
      closeDeleteDialog();
      toast.success(response?.data?.message);

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="">
          <div className="flex flex-col gap-5 ">
            <div className="text-lg font-semibold text-[#101828]">
              Delete Department
            </div>
            <div className="text-[#344054]">
              Are you sure you want to delete this department
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={closeDeleteDialog}
                className="cursor-pointer py-2.5 px-4.5 border border-[#D0D5DD] rounded-lg font-semibold text-base text-[#344054] bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDepartment}
                className="cursor-pointer py-2.5 px-4.5 border border-[#DC2626] rounded-lg font-semibold text-base text-white bg-[#DC2626]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDepartment;
