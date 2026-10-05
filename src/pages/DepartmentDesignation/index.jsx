import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Pencil, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteDepartment from "./DeleteDepartament";
import EditDepartment from "./EditDepartment";
import AddNewDepartment from "./AddNewDepartment";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loadingSlice";

const DepartmentDesignation = () => {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  // Added state for dialog open/close
  const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
  const [openAddNew, setOpenAddNew] = useState(false);
  const dispatch = useDispatch();

  const closeAddNewDialog = () => setOpenAddNew(false);
  const openEditDialog = (departmentCode) =>
    setEditingDepartmentId(departmentCode);
  const closeEditDialog = () => setEditingDepartmentId(null);
  const openDeleteDialog = (designationCode) =>
    setDeletingDepartmentId(designationCode);
  const closeDeleteDialog = () => setDeletingDepartmentId(null);

  const getAllDesignations = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/designations`
      );
      setDesignations(response.data.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const getAllDepartments = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/departments`
      );
      console.log(response);
      setDepartments(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setDepartments([]);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllDesignations();
    getAllDepartments();
  }, []);
  const filteredDepartments = designations.filter(
    (designation) =>
      designation?.designation &&
      designation?.departmentCode &&
      ((designation?.designation ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        (designation?.designationCode ?? "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );
  return (
    <div className="container mx-auto mt-8 px-3">
      <div className="flex items-center justify-between mb-11">
        <h1 className="text-3xl font-semibold text-[#101828] tracking-tight">
          Department Designation
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search"
              className="w-[320px] pl-10 border border-[#D0D5DD] placeholder:font-normal placeholder:text-base placeholder:text-[#667085] "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Dialog open={openAddNew} onOpenChange={setOpenAddNew}>
            <DialogTrigger>
              <Button className="gap-2 bg-[#305679] py-4 font-semibold  text-white text-sm">
                <Plus className="w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white  w-[400px] rounded-2xl p-6">
              <AddNewDepartment
                getAllDesignations={getAllDesignations}
                closeAddNewDialog={closeAddNewDialog}
                departments={departments}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md  border-b border-[#EAECF0]">
        <Table>
          <TableHeader className="bg-[#F4F6F9] ">
            <TableRow className="">
              <TableHead className=" w-[784px] py-3 pl-5 text-xs text-[#475467] font-medium ">
                Designation
              </TableHead>
              <TableHead className="w-[120px] py-3 text-start text-xs text-[#475467] font-medium ">
                Code
              </TableHead>
              <TableHead className=" w-[160px] text-center py-3 pr-5 text-xs text-[#475467] font-medium ">
                Action Items
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((department, index) => (
              <TableRow key={index}>
                <TableCell className=" w-[784px] py-6 pl-5 text-sm font-medium  text-[#101828]">
                  {department?.designation}
                </TableCell>
                <TableCell className="w-[120px] py-6 text-start text-sm font-normal text-[#475467]">
                  {department?.designationCode}
                </TableCell>
                <TableCell className="w-[120px] text-right pr-5">
                  <div className="flex justify-center gap-1">
                    <Dialog
                      open={
                        deletingDepartmentId === department?.designationCode
                      }
                      onOpenChange={(open) =>
                        open
                          ? openDeleteDialog(department?.designationCode)
                          : closeDeleteDialog()
                      }
                    >
                      {/* <Button
                        onClick={() => setViewDepartment(true)}
                        variant="ghost"
                        size="icon"
                      >
                        <Eye className="h-3 w-3" />
                      </Button> */}
                      <DialogTrigger>
                        <Button
                          // onClick={() => setOpenDelete(true)}
                          variant="ghost"
                          size="icon"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white w-[400px] rounded-2xl p-6">
                        <DeleteDepartment
                          closeDeleteDialog={closeDeleteDialog}
                          getAllDesignations={getAllDesignations}
                          departmentCode={department?.departmentCode}
                          designationCode={department?.designationCode}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={editingDepartmentId === department.designationCode}
                      onOpenChange={(open) =>
                        open
                          ? openEditDialog(department.designationCode)
                          : closeEditDialog()
                      }
                    >
                      <DialogTrigger>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white w-[400px] rounded-2xl p-6">
                        <EditDepartment
                          departmentCode={department?.departmentCode}
                          getAllDesignations={getAllDesignations}
                          closeEditDialog={closeEditDialog}
                          designationCode={department?.designationCode}
                          designation={department?.designation}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentDesignation;
