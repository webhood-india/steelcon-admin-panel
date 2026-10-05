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
import { Plus, Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatarImg from "../../assets/sidebarImages/Avatar.png";
import AddNewTeamMember from "./AddNewTeamMember";
import EditTeamMember from "./EditTeamMember";
import { setLoading } from "@/redux/loadingSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const ManageTeam = () => {
  const [employees, setEmployees] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [showAddNewEmployee, setShowAddNewEmployee] = useState(false);
  const [showEditTeamMember, setShowEditTeamMember] = useState(false);
  const [allDepartments, setAllDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [managers, setManagers] = useState([]);
  const dispatch = useDispatch();
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee.department &&
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  // const handleDelete = (id) => {
  //   setDepartments(departments.filter((dept) => dept.id !== id));
  // };
  // Fetch employees from API
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
      // dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/departments`
      );
      setAllDepartments(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
    //  finally {
    //   dispatch(setLoading(false));
    // }
  };
  const fetchEmployees = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/employees`
      );
      const result = await response.json();
      if (result.success) {
        setEmployees(result.data);
      } else {
        setError("Failed to fetch employees");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Error fetching employees:", err);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const fetchManagers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/managers?department=ENGINEERING `
      );
      setManagers(response.data?.data || []);
      dispatch(setLoading(false));
    } catch (err) {
      console.error("Error fetching managers:", err);
      setError(err.message);
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchEmployees();
    fetchManagers();
    getAllDepartments();
    getAllDesignations();
  }, []);

  // const closeDeleteDialog = () => setOpenDelete(false);

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "N/A";
    return `Rs ${amount.toLocaleString()}`;
  };
  // Format date from ISO to MM/DD/YY
  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return `${date.getMonth() + 1}/${date.getDate()}/${String(
      date.getFullYear()
    ).slice(2)}`;
  };

  if (showAddNewEmployee) {
    return (
      <AddNewTeamMember
        setShowAddNewEmployee={setShowAddNewEmployee}
        fetchEmployees={fetchEmployees}
        managers={managers}
        allDepartments={allDepartments}
        designations={designations}
      />
    );
  }
  if (showEditTeamMember) {
    return (
      <EditTeamMember
        fetchEmployees={fetchEmployees}
        employeeData={employees[editIndex]}
        setShowEditTeamMember={setShowEditTeamMember}
        managers={managers}
        allDepartments={allDepartments}
        designations={designations}
      />
    );
  }
  return (
    <div className="container mx-auto mt-8 px-3">
      <div className="flex items-center justify-between mb-11">
        <h1 className="text-3xl font-semibold text-[#101828] tracking-tight">
          Manage Employees
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
            onClick={() => setShowAddNewEmployee(true)}
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
              <TableHead className="w-[358px] py-3 pl-5 text-xs text-[#475467] font-medium ">
                Team Member Name
              </TableHead>
              <TableHead className="w-[163  px] py-3 text-start text-xs text-[#475467] font-medium ">
                Department
              </TableHead>
              <TableHead className="w-[120px] py-3 text-start text-xs text-[#475467] font-medium ">
                Joining Date
              </TableHead>
              <TableHead className="w-[164px] py-3 text-start text-xs text-[#475467] font-medium ">
                Report to
              </TableHead>

              <TableHead className="w-[136px] py-3 text-start text-xs text-[#475467] font-medium ">
                Current CTC
              </TableHead>
              <TableHead className=" w-[123px] text-center py-3 pr-5 text-xs text-[#475467] font-medium ">
                Action Items
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow key={employee._id}>
                <TableCell className="flex gap-4 items-center w-[358px] py-6 pl-5 text-sm font-medium  text-[#101828]">
                  <Avatar>
                    <AvatarImage
                      src={employee?.profileImg}
                      alt={`${employee.firstName} ${employee.lastName}`}
                    />
                    <AvatarFallback>
                      {employee?.firstName?.charAt(0) +
                        employee?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>{" "}
                  {`${employee.firstName} ${
                    employee.middleName ? employee.middleName + " " : ""
                  }${employee.lastName}`}
                </TableCell>
                <TableCell className="w-[163px] py-6 text-start text-sm font-normal text-[#475467]">
                  {employee?.department}
                </TableCell>
                <TableCell className="w-[120px] py-6 text-start text-sm font-normal text-[#475467]">
                  {formatDate(employee.joiningDate)}
                </TableCell>
                <TableCell className="flex gap-4 items-center w-[164px] py-6 text-start text-sm font-normal text-[#475467]">
                  <Avatar>
                    <AvatarImage
                      alt={employee.teamManager || "Manager"}
                      src={avatarImg}
                    />
                  </Avatar>
                  {employee.teamManager || "N/A"}
                </TableCell>
                <TableCell className="w-[136px] py-6 text-start text-sm font-normal text-[#475467]">
                  {employee.salary
                    ? formatCurrency(employee.salary.ctc)
                    : "N/A"}
                </TableCell>
                <TableCell className="w-[123px] text-right pr-5">
                  <div className="flex justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditIndex(index);
                        setShowEditTeamMember(true);
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
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

export default ManageTeam;
