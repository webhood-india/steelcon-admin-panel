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
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import AddNewManagers from "./AddNewManagers";
import EditManager from "./EditManager";
import { setLoading } from "@/redux/loadingSlice";
import { useDispatch, useSelector } from "react-redux";

const ManageManagers = () => {
  const [managers, setManagers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddNewManager, setShowAddNewManager] = useState(false);
  const [showEditManager, setShowEditManager] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  const fetchManagers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/managers`
      );
      setManagers(response.data?.data || []);
      dispatch(setLoading(false));
    } catch (err) {
      console.error("Error fetching managers:", err);
      setError(err.message);
      dispatch(setLoading(false));
    }
  };
  const getAllDesignations = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/designations`
      );
      setDesignations(response?.data?.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      // Optionally, set an error state to show user-friendly message
      // setError("Failed to load departments");
    }
  };

  const getAllDepartments = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/departments`
      );
      setAllDepartments(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchManagers();
    getAllDepartments();
    getAllDesignations();
  }, []);

  const getAvatarFallback = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  // Image error handler
  const handleImageError = (e) => {
    e.currentTarget.style.display = "none";
  };
  if (isLoading) {
    return <div className="container mx-auto mt-8 px-3">Loading...</div>;
  }
  if (error) {
    return (
      <div className="container mx-auto mt-8 px-3 text-red-500">{error}</div>
    );
  }
  const filteredManagers = managers.filter(
    (manager) =>
      manager.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (showAddNewManager) {
    return (
      <AddNewManagers
        showAddNewManager={showAddNewManager}
        setShowAddNewManager={setShowAddNewManager}
        fetchManagers={fetchManagers}
        allDepartments={allDepartments}
        designations={designations}
      />
    );
  }
  if (showEditManager) {
    return (
      <EditManager
        managerData={managers[editIndex]}
        fetchManagers={fetchManagers}
        setShowEditManager={setShowEditManager}
        allDepartments={allDepartments}
        designations={designations}
      />
    );
  }
  console.log(allDepartments, "all");
  // console.log(managers[editIndex],"mng",managers,editIndex)
  return (
    <div className="container mx-auto mt-8 px-3">
      <div className="flex items-center justify-between mb-11">
        <h1 className="text-3xl font-semibold text-[#101828] tracking-tight">
          Manage Managers
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

          <Button
            onClick={() => setShowAddNewManager(true)}
            className="gap-2 bg-[#305679] py-4 font-semibold  text-white text-sm"
          >
            <Plus className="w-4" />
            Add New
          </Button>
        </div>
      </div>
      <div className="rounded-md  border-b border-[#EAECF0]">
        <Table>
          <TableHeader className="bg-[#F4F6F9] ">
            <TableRow className="">
              <TableHead className="w-[300px] py-3 pl-5 text-xs text-[#475467] font-medium ">
                Name
              </TableHead>
              <TableHead className="w-[167px] py-3 text-start text-xs text-[#475467] font-medium ">
                Department
              </TableHead>
              <TableHead className="w-[120px] py-3 text-start text-xs text-[#475467] font-medium ">
                Joining Date
              </TableHead>
              <TableHead className="w-[134px] py-3 text-start text-xs text-[#475467] font-medium ">
                Employee ID
              </TableHead>
              <TableHead className="w-[120px] py-3 text-start text-xs text-[#475467] font-medium ">
                Current CTC
              </TableHead>
              <TableHead className=" w-[123px] text-center py-3 pr-5 text-xs text-[#475467] font-medium ">
                Action Items
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredManagers.map((manager, index) => (
              <TableRow key={manager._id}>
                <TableCell className="flex gap-4 items-center w-[300px] py-6 pl-5 text-sm font-medium  text-[#101828]">
                  <Avatar>
                    <AvatarImage
                      src={manager.profileImg}
                      alt={manager.firstName}
                      onError={handleImageError}
                    />
                    <AvatarFallback>
                      {getAvatarFallback(manager.firstName, manager.lastName)}
                    </AvatarFallback>
                  </Avatar>
                  {manager.firstName} {manager.lastName}
                </TableCell>
                <TableCell className="w-[167px] py-6 text-start text-sm font-normal text-[#475467]">
                  {manager.department}
                </TableCell>
                <TableCell className="w-[120px] py-6 text-start text-sm font-normal text-[#475467]">
                  {new Date(manager.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="w-[134px] py-6 text-start text-sm font-normal text-[#475467]">
                  {manager.empId}
                </TableCell>
                <TableCell className="w-[120px] py-6 text-start text-sm font-normal text-[#475467]">
                  ₹{manager.salary.ctc.toLocaleString()}
                </TableCell>
                <TableCell className="w-[123px] text-right pr-5 flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowEditManager(true);
                      setEditIndex(index);
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageManagers;
