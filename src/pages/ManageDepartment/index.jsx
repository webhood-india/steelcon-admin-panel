import { useCallback, useEffect, useState } from "react";
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
import { Edit3Icon, Plus } from "lucide-react";
import { Eye } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import AddNewDepartament from "./AddNewDepartment";
import DeleteDepartment from "./DeleteDepartment";
import EditDepartment from "./EditDepartment";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import DepartmentView from "./DepartmentView";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loadingSlice";
const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddNew, setOpenAddNew] = useState(false);
  const [viewDepartment, setViewDepartment] = useState(false);
  // const [departmentDetail, setDerpartmentDetail] = useState();
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch all departments when component mounts
    getAllDepartments();
  }, []);
  const getAllDepartments = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/departments`
      );
      setDepartments(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setDepartments([]);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const searchDepartments = useCallback(
    async (query) => {
      try {
        // If query is empty, fetch all departments
        if (!query.trim()) {
          await getAllDepartments();
          return;
        }
        dispatch(setLoading(true));

        // Try API search first
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/search-departments?query=${encodeURIComponent(
            query
          )}`
        );

        // If API returns data, update departments
        if (response.data?.data?.length > 0) {
          setDepartments(response.data.data);
        } else {
          // Fallback to local filtering
          const filteredDepartments = departments.filter(
            (department) =>
              department.name?.toLowerCase().includes(query.toLowerCase()) ||
              department.code?.toLowerCase().includes(query.toLowerCase())
          );
          setDepartments(filteredDepartments);
        }
      } catch (err) {
        console.error("Error searching departments:", err);

        // Fallback to local filtering if API call fails
        const filteredDepartments = departments.filter(
          (department) =>
            department.name?.toLowerCase().includes(query.toLowerCase()) ||
            department.code?.toLowerCase().includes(query.toLowerCase())
        );
        setDepartments(filteredDepartments);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [departments]
  );

  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);

      // Use debounce with setTimeout
      const debounceTimer = setTimeout(() => {
        searchDepartments(query);
      }, 300);

      // Cleanup function to clear timeout
      return () => clearTimeout(debounceTimer);
    },
    [searchDepartments]
  );

  // Dialog open/close handlers
  const closeDeleteDialog = () => setDeletingDepartmentId(null);
  const closeEditDialog = () => setEditingDepartmentId(null);
  const closeAddNewDialog = () => setOpenAddNew(false);
  if (viewDepartment) {
    return <DepartmentView setViewDepartment={setViewDepartment} />;
  }

  return (
    <div className="container mx-auto mt-8 px-3">
      <div className="flex items-center justify-between mb-11">
        <h1 className="text-3xl font-semibold text-[#101828] tracking-tight">
          Manage Department
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search"
              className="w-[320px] pl-10 border border-[#D0D5DD] placeholder:font-normal placeholder:text-base placeholder:text-[#667085] "
              value={searchQuery}
              onChange={handleSearchChange}
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
            <DialogTrigger asChild>
              <Button className="gap-2 bg-[#305679] py-4 font-semibold  text-white text-sm">
                <Plus className="w-4" />
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white  w-[400px] rounded-2xl p-6">
              <AddNewDepartament
                getAllDepartments={getAllDepartments}
                closeAddNewDialog={closeAddNewDialog}
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
                Name
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
            {departments?.map((department) => (
              <TableRow key={department?._id}>
                <TableCell className=" w-[784px] py-6 pl-5 text-sm font-medium  text-[#101828]">
                  {department.name}
                </TableCell>
                <TableCell className="w-[120px] py-6 text-start text-sm font-normal text-[#475467]">
                  {department.code}
                </TableCell>
                <TableCell className="w-[120px] text-right pr-5">
                  <div className="flex justify-end gap-1">
                    <Button
                      onClick={() => setViewDepartment(true)}
                      variant="ghost"
                      size="icon"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Dialog
                      open={deletingDepartmentId === department._id}
                      onOpenChange={(open) =>
                        open
                          ? setDeletingDepartmentId(department._id)
                          : setDeletingDepartmentId(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setDeletingDepartmentId(department._id)
                          }
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white w-[400px] rounded-2xl p-6">
                        <DeleteDepartment
                          departmentId={department?._id}
                          closeDeleteDialog={closeDeleteDialog}
                          getAllDepartments={getAllDepartments}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={editingDepartmentId === department._id}
                      onOpenChange={(open) =>
                        open
                          ? setEditingDepartmentId(department._id)
                          : setEditingDepartmentId(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => setEditingDepartmentId(department._id)}
                          variant="ghost"
                          size="icon"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white w-[400px] rounded-2xl p-6">
                        <EditDepartment
                          departmentCode={department.code}
                          departmentId={department?._id}
                          getAllDepartments={getAllDepartments}
                          closeEditDialog={closeEditDialog}
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

export default ManageDepartment;
