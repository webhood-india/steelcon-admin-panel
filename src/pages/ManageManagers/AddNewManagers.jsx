import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const AddNewManagers = ({
  setShowAddNewManager,
  fetchManagers,
  allDepartments,
  designations,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    profileImg: "",
    personalEmail: "",
    personalMobile: "",
    emergencyContact: { name: "", mobile: "" },
    workDays: "",
    paidLeaves: "",
    sickLeaves: "",
    isHR: false,
    resignDeduction: "",
    joiningDate: "",
    designation: "",
    department: "",
    teamManager: "",
    employeeId: "",
    reportTo: "",
    deptEmail: "",
    workEmail: "",
    password: "Temp@1234",
    bank: {
      accName: "",
      bankName: "",
      accNumber: "",
      ifsc: "",
      branch: "",
      cancelledCheque: "",
    },
    salary: {
      ctc: "",
      autoTDS: true,
      basicDA: "",
      hra: "",
      conveyance: "",
      other: "",
      arrears: "0",
      profTax: "",
      pf: "",
      tds: "",
      advance: "0",
      totalDeductions: "",
      netPay: "",
      bonus: "",
      gratuity: "",
    },
    aadharNo: "",
    panNo: "",
    uan: "",
    esicNo: "",
    documents: {
      passportPhoto: "",
      aadhar: "",
      addressProof: "",
      panCard: "",
      qualification: "",
      resume: "",
      otherDocs: "",
    },
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e, nestedField = null) => {
    const { name, value } = e.target;
    if (nestedField) {
      setFormData((prev) => ({
        ...prev,
        [nestedField]: {
          ...prev[nestedField],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  // Handle file uploads
  const handleFileUpload = async (e, fieldName, nestedField = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_Preset_Name);
    formData.append("cloud_name", import.meta.env.VITE_Cloud_Name);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_Cloud_Name
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const fileData = data.secure_url;
      console.log(data, "ddwd", fileData);
      setFormData((prev) => {
        if (nestedField) {
          return {
            ...prev,
            [nestedField]: {
              ...prev[nestedField],
              [fieldName]: fileData,
            },
          };
        } else {
          return {
            ...prev,
            [fieldName]: fileData,
          };
        }
      });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  // Validation function
  const validateForm = () => {
    let tempErrors = {};

    // Personal Info
    if (!formData.firstName) tempErrors.firstName = "First name is required";
    if (!formData.lastName) tempErrors.lastName = "Last name is required";
    if (!formData.personalEmail) tempErrors.personalEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.personalEmail))
      tempErrors.personalEmail = "Invalid email";
    if (!formData.personalMobile)
      tempErrors.personalMobile = "Mobile is required";
    else if (!/^\d{10}$/.test(formData.personalMobile))
      tempErrors.personalMobile = "Must be 10 digits";
    if (!formData.emergencyContact.name)
      tempErrors.emergencyContactName = "Required";
    if (!formData.emergencyContact.mobile)
      tempErrors.emergencyContactMobile = "Required";
    else if (!/^\d{10}$/.test(formData.emergencyContact.mobile))
      tempErrors.emergencyContactMobile = "Must be 10 digits";
    if (!formData.workDays) tempErrors.workDays = "Required";
    if (!formData.paidLeaves) tempErrors.paidLeaves = "Required";
    if (!formData.sickLeaves) tempErrors.sickLeaves = "Required";
    if (!formData.resignDeduction) tempErrors.resignDeduction = "Required";

    // Company Details
    if (!formData.designation) tempErrors.designation = "Required";
    if (!formData.department) tempErrors.department = "Required";
    if (!formData.teamManager) tempErrors.teamManager = "Required";
    if (!formData.deptEmail) tempErrors.deptEmail = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.deptEmail))
      tempErrors.deptEmail = "Invalid email";

    // Banking Details
    if (!formData.bank.accName) tempErrors.accName = "Required";
    if (!formData.bank.bankName) tempErrors.bankName = "Required";
    if (!formData.bank.accNumber) tempErrors.accNumber = "Required";
    if (!formData.bank.ifsc) tempErrors.ifsc = "Required";
    if (!formData.bank.branch) tempErrors.branch = "Required";

    // Salary Details
    if (!formData.salary.ctc) tempErrors.ctc = "Required";
    if (!formData.salary.basicDA) tempErrors.basicDA = "Required";
    if (!formData.salary.hra) tempErrors.hra = "Required";
    if (!formData.salary.conveyance) tempErrors.conveyance = "Required";

    // Identification Details
    if (!formData.aadharNo) tempErrors.aadharNo = "Required";
    else if (!/^\d{12}$/.test(formData.aadharNo))
      tempErrors.aadharNo = "Must be 12 digits";
    if (!formData.panNo) tempErrors.panNo = "Required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo))
      tempErrors.panNo = "Invalid PAN format";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    dispatch(setLoading(true));
    console.log(formData, "formdata");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/managers`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200 || response.status === 201) {
        setShowAddNewManager(false);
        fetchManagers();

        toast.success("Manager added successfully");
        setFormData({ ...formData }); // Reset form
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add manager");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="container mx-auto  mt-8 px-3">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-[#101828] tracking-tight">
          Add New Managers
        </h1>
        <div className="flex items-center gap-4">
          <Button
            className="gap-2 bg-white py-4 font-semibold border border-[#D0D5DD] text-[#344054] text-sm hover:bg-[#344054] hover:text-white"
            onClick={() => {
              setFormData({ ...formData });
              setShowAddNewManager(false);
            }}
          >
            BACK
          </Button>
          <Button
            className="gap-2 bg-[#305679] py-4 font-semibold text-white text-sm"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
      {/* Personal Info */}
      <div className="w-full flex justify-between mb-5">
        <div className="min-w-[280px] flex flex-col gap-1">
          <h2 className="text-sm font-medium text-[#344054]">Personal info</h2>
          <p className="text-xs font-normal text-[#475467]">
            Fill in the following details
          </p>
        </div>
        <Card className="border-0 shadow-sm w-full">
          <CardContent className="py-1 px-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-[#344054] font-medium font-sm"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="middleName"
                  className="text-[#344054] font-medium font-sm"
                >
                  Middle Name
                </Label>
                <Input
                  id="middleName"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-[#344054] font-medium font-sm"
                >
                  Last name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="profileImage"
                  className="text-[#344054] font-medium font-sm"
                >
                  Profile Image
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.profileImg ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.profileImg}
                        alt="Profile"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, profileImg: "" }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="profileImage"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleFileUpload(e, "profileImg")}
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="personalEmail"
                  className="text-[#344054] font-medium font-sm"
                >
                  Personal Email
                </Label>
                <Input
                  id="personalEmail"
                  name="personalEmail"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.personalEmail ? "border-red-500" : ""}
                />
                {errors.personalEmail && (
                  <p className="text-red-500 text-xs">{errors.personalEmail}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="personalMobile">Personal Mobile No.</Label>
                <Input
                  id="personalMobile"
                  name="personalMobile"
                  value={formData.personalMobile}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.personalMobile ? "border-red-500" : ""}
                />
                {errors.personalMobile && (
                  <p className="text-red-500 text-xs">
                    {errors.personalMobile}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="emergencyName"
                  className="text-[#344054] font-medium font-sm"
                >
                  Emergency Contact Name
                </Label>
                <Input
                  id="emergencyName"
                  name="name"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleChange(e, "emergencyContact")}
                  placeholder="Enter"
                  className={
                    errors.emergencyContactName ? "border-red-500" : ""
                  }
                />
                {errors.emergencyContactName && (
                  <p className="text-red-500 text-xs">
                    {errors.emergencyContactName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="emergencyMobile"
                  className="text-[#344054] font-medium font-sm"
                >
                  Emergency Contact No.
                </Label>
                <Input
                  id="emergencyMobile"
                  name="mobile"
                  value={formData.emergencyContact.mobile}
                  onChange={(e) => handleChange(e, "emergencyContact")}
                  placeholder="Enter"
                  className={
                    errors.emergencyContactMobile ? "border-red-500" : ""
                  }
                />
                {errors.emergencyContactMobile && (
                  <p className="text-red-500 text-xs">
                    {errors.emergencyContactMobile}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="workDays"
                  className="text-[#344054] font-medium font-sm"
                >
                  Work Days
                </Label>
                <Input
                  id="workDays"
                  name="workDays"
                  value={formData.workDays}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.workDays ? "border-red-500" : ""}
                />
                {errors.workDays && (
                  <p className="text-red-500 text-xs">{errors.workDays}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="paidLeaves"
                  className="text-[#344054] font-medium font-sm"
                >
                  Paid Leaves
                </Label>
                <div className="flex items-center">
                  <Input
                    id="paidLeaves"
                    name="paidLeaves"
                    value={formData.paidLeaves}
                    onChange={handleChange}
                    placeholder="Enter"
                    className={`flex-1 rounded-r-none ${
                      errors.paidLeaves ? "border-red-500" : ""
                    }`}
                  />
                  <div className="bg-white border font-semibold text-base rounded-r-md px-3 py-1.5">
                    Days
                  </div>
                </div>
                {errors.paidLeaves && (
                  <p className="text-red-500 text-xs">{errors.paidLeaves}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="sickLeaves"
                  className="text-[#344054] font-medium font-sm"
                >
                  Sick Leaves
                </Label>
                <div className="flex items-center">
                  <Input
                    id="sickLeaves"
                    name="sickLeaves"
                    value={formData.sickLeaves}
                    onChange={handleChange}
                    placeholder="Enter"
                    className={`flex-1 rounded-r-none ${
                      errors.sickLeaves ? "border-red-500" : ""
                    }`}
                  />
                  <div className="bg-white border font-semibold text-base rounded-r-md px-3 py-1.5">
                    Days
                  </div>
                </div>
                {errors.sickLeaves && (
                  <p className="text-red-500 text-xs">{errors.sickLeaves}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-[#344054] font-medium font-sm">
                  Authorise as an HR
                </Label>
                <RadioGroup
                  value={formData.isHR ? "yes" : "no"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, isHR: value === "yes" }))
                  }
                  className="flex items-center space-x-18 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hr-yes" />
                    <Label
                      htmlFor="hr-yes"
                      className="cursor-pointer text-sm font-normal text-[#667085]"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hr-no" />
                    <Label
                      htmlFor="hr-no"
                      className="cursor-pointer text-sm font-normal text-[#667085]"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-3 col-span-2 max-w-[389px]">
                <Label
                  htmlFor="resignDeduction"
                  className="text-[#344054] font-medium font-sm"
                >
                  Enter deduction amount during resignation
                </Label>
                <div className="flex items-center">
                  <Select value="inr">
                    <SelectTrigger className="w-24 rounded-l-md rounded-r-none border border-[#D0D5DD] border-r-0 py-2.5 px-3">
                      <SelectValue placeholder="INR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="resignDeduction"
                    name="resignDeduction"
                    value={formData.resignDeduction}
                    onChange={handleChange}
                    placeholder="Enter"
                    className={`flex-1 border-l-0 rounded-l-none ${
                      errors.resignDeduction ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.resignDeduction && (
                  <p className="text-red-500 text-xs">
                    {errors.resignDeduction}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Details */}
      <div className="w-full flex justify-between my-5">
        <div className="min-w-[280px] flex flex-col gap-1">
          <h2 className="text-sm font-medium text-[#344054]">
            Company Details
          </h2>
          <p className="text-xs font-normal text-[#475467]">
            Update your company details
          </p>
        </div>
        <Card className="border-0 shadow-sm w-full">
          <CardContent className="py-1 px-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="employeeId"
                  className="text-[#344054] font-medium font-sm"
                >
                  Employee ID No
                </Label>
                <Input
                  id="employeeId"
                  name="lastName"
                  disabled={true}
                  // value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="joiningDate"
                  className="text-[#344054] font-medium font-sm"
                >
                  Joining Date
                </Label>
                <Input
                  id="joiningDate"
                  name="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="department"
                  className="text-[#344054] font-medium font-sm"
                >
                  Department
                </Label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-[#D0D5DD] py-2.5 px-3.5  text-[#667085] text-base font-normal shadow focus:shadow rounded-md "
                >
                  <option value="">Select Department</option>
                  {allDepartments?.map((department, index) => {
                    return (
                      <option key={index} value={department?.code}>
                        {department?.name}
                      </option>
                    );
                  })}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs">{errors.department}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="designation"
                  className="text-[#344054] font-medium font-sm"
                >
                  Designation
                </Label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full border border-[#D0D5DD] py-2.5 px-3.5  text-[#667085] text-base font-normal shadow focus:shadow rounded-md "
                >
                  <option value="">Select Designation</option>
                  {designations?.map((item, index) => {
                    return (
                      <option key={index} value={item?.code}>
                        {item?.designation}
                      </option>
                    );
                  })}
                </select>
                {errors.designation && (
                  <p className="text-red-500 text-xs">{errors.designation}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="teamManager"
                  className="text-[#344054] font-medium font-sm"
                >
                  Team Manager
                </Label>
                <select
                  id="teamManager"
                  name="teamManager"
                  value={formData.teamManager}
                  onChange={handleChange}
                  className="w-full border border-[#D0D5DD] py-2.5 px-3.5  text-[#667085] text-base font-normal shadow focus:shadow rounded-md "
                >
                  <option value="">Select Name</option>
                  <option value="Ram">Ram</option>
                  <option value="Guy Hawkins">Guy Hawkins</option>
                  <option value="Marvin McKinney">Marvin McKinney</option>
                  <option value="Albert Flores">Albert Flores</option>
                  <option value="Darlene Robertson">Darlene Robertson</option>
                  <option value="Eleanor Pena">Eleanor Pena</option>
                </select>
                {errors.teamManager && (
                  <p className="text-red-500 text-xs">{errors.teamManager}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reportTo"
                  className="text-[#344054] font-medium font-sm"
                >
                  Report to (If applicable)
                </Label>
                <select
                  id="reportTo"
                  name="reportTo"
                  value={formData.reportTo}
                  onChange={handleChange}
                  placeholder="Enter"
                  className="w-full border border-[#D0D5DD] py-2.5 px-3.5  text-[#667085] text-base font-normal shadow focus:shadow rounded-md "
                >
                  <option value="">Select Name</option>
                  <option value="Ram">Ram</option>
                  <option value="Guy Hawkins">Guy Hawkins</option>
                  <option value="Marvin McKinney">Marvin McKinney</option>
                  <option value="Albert Flores">Albert Flores</option>
                  <option value="Darlene Robertson">Darlene Robertson</option>
                  <option value="Eleanor Pena">Eleanor Pena</option>
                </select>
                {errors.reportTo && (
                  <p className="text-red-500 text-xs">{errors.teamManager}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="deptEmail"
                  className="text-[#344054] font-medium font-sm"
                >
                  Department Email
                </Label>
                <Input
                  id="deptEmail"
                  name="deptEmail"
                  value={formData.deptEmail}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.deptEmail ? "border-red-500" : ""}
                />
                {errors.deptEmail && (
                  <p className="text-red-500 text-xs">{errors.deptEmail}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="workEmail"
                  className="text-[#344054] font-medium font-sm"
                >
                  Work Email (If applicable)
                </Label>
                <Input
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  placeholder="Enter"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Banking Details */}
      <div className="w-full flex justify-between my-5">
        <div className="min-w-[280px] flex flex-col gap-1">
          <h2 className="text-sm font-medium text-[#344054]">
            Banking Details
          </h2>
          <p className="text-xs font-normal text-[#475467]">
            Update your finance details
          </p>
        </div>
        <Card className="border-0 shadow-sm w-full">
          <CardContent className="py-1 px-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="accName"
                  className="text-[#344054] font-medium font-sm"
                >
                  Account Name
                </Label>
                <Input
                  id="accName"
                  name="accName"
                  value={formData.bank.accName}
                  onChange={(e) => handleChange(e, "bank")}
                  placeholder="Enter"
                  className={errors.accName ? "border-red-500" : ""}
                />
                {errors.accName && (
                  <p className="text-red-500 text-xs">{errors.accName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bankName"
                  className="text-[#344054] font-medium font-sm"
                >
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={formData.bank.bankName}
                  onChange={(e) => handleChange(e, "bank")}
                  placeholder="Enter"
                  className={errors.bankName ? "border-red-500" : ""}
                />
                {errors.bankName && (
                  <p className="text-red-500 text-xs">{errors.bankName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="accNumber"
                  className="text-[#344054] font-medium font-sm"
                >
                  Account Number
                </Label>
                <Input
                  id="accNumber"
                  name="accNumber"
                  value={formData.bank.accNumber}
                  onChange={(e) => handleChange(e, "bank")}
                  placeholder="Enter"
                  className={errors.accNumber ? "border-red-500" : ""}
                />
                {errors.accNumber && (
                  <p className="text-red-500 text-xs">{errors.accNumber}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="ifsc"
                  className="text-[#344054] font-medium font-sm"
                >
                  IFSC
                </Label>
                <Input
                  id="ifsc"
                  name="ifsc"
                  value={formData.bank.ifsc}
                  onChange={(e) => handleChange(e, "bank")}
                  placeholder="Enter"
                  className={errors.ifsc ? "border-red-500" : ""}
                />
                {errors.ifsc && (
                  <p className="text-red-500 text-xs">{errors.ifsc}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="branch"
                  className="text-[#344054] font-medium font-sm"
                >
                  Branch Name
                </Label>
                <Input
                  id="branch"
                  name="branch"
                  value={formData.bank.branch}
                  onChange={(e) => handleChange(e, "bank")}
                  placeholder="Enter"
                  className={errors.branch ? "border-red-500" : ""}
                />
                {errors.branch && (
                  <p className="text-red-500 text-xs">{errors.branch}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="cancelledCheque"
                  className="text-[#344054] font-medium font-sm"
                >
                  Cancelled Cheque
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.bank.cancelledCheque ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.bank.cancelledCheque}
                        alt="Cheque"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            bank: { ...prev.bank, cancelledCheque: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="cancelledCheque"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "cancelledCheque", "bank")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Details */}
      <div className="w-full flex justify-between my-5">
        <div className="min-w-[280px] flex flex-col gap-1">
          <h2 className="text-sm font-medium text-[#344054]">Salary Details</h2>
          <p className="text-xs font-normal text-[#475467]">
            Update your salary details
          </p>
        </div>
        <Card className="border-0 shadow-sm w-full">
          <CardContent className="py-1 px-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="ctc"
                  className="text-[#344054] font-medium font-sm"
                >
                  Total CTC
                </Label>
                <Input
                  id="ctc"
                  name="ctc"
                  value={formData.salary.ctc}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                  className={errors.ctc ? "border-red-500" : ""}
                />
                {errors.ctc && (
                  <p className="text-red-500 text-xs">{errors.ctc}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-[#344054] font-medium font-sm">
                  Auto-TDS
                </Label>
                <RadioGroup
                  value={formData.salary.autoTDS ? "yes" : "no"}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      salary: { ...prev.salary, autoTDS: value === "yes" },
                    }))
                  }
                  className="flex items-center space-x-28 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="autoTDS-yes" />
                    <Label
                      htmlFor="autoTDS-yes"
                      className="cursor-pointer text-sm font-normal text-[#667085]"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="autoTDS-no" />
                    <Label
                      htmlFor="autoTDS-no"
                      className="cursor-pointer text-sm font-normal text-[#667085]"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="basicDA"
                  className="text-[#344054] font-medium font-sm"
                >
                  Basic+DA
                </Label>
                <Input
                  id="basicDA"
                  name="basicDA"
                  value={formData.salary.basicDA}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                  className={errors.basicDA ? "border-red-500" : ""}
                />
                {errors.basicDA && (
                  <p className="text-red-500 text-xs">{errors.basicDA}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="hra"
                  className="text-[#344054] font-medium font-sm"
                >
                  House Rent Allowance
                </Label>
                <Input
                  id="hra"
                  name="hra"
                  value={formData.salary.hra}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                  className={errors.hra ? "border-red-500" : ""}
                />
                {errors.hra && (
                  <p className="text-red-500 text-xs">{errors.hra}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="conveyance"
                  className="text-[#344054] font-medium font-sm"
                >
                  TPT / Conveyance
                </Label>
                <Input
                  id="conveyance"
                  name="conveyance"
                  value={formData.salary.conveyance}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                  className={errors.conveyance ? "border-red-500" : ""}
                />
                {errors.conveyance && (
                  <p className="text-red-500 text-xs">{errors.conveyance}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="other"
                  className="text-[#344054] font-medium font-sm"
                >
                  Other
                </Label>
                <Input
                  id="other"
                  name="other"
                  value={formData.salary.other}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="arrears"
                  className="text-[#344054] font-medium font-sm"
                >
                  Arrear Salary
                </Label>
                <Input
                  id="arrears"
                  name="arrears"
                  value={formData.salary.arrears}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="profTax"
                  className="text-[#344054] font-medium font-sm"
                >
                  Professional Tax
                </Label>
                <Input
                  id="profTax"
                  name="profTax"
                  value={formData.salary.profTax}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="pf"
                  className="text-[#344054] font-medium font-sm"
                >
                  Provident Fund
                </Label>
                <Input
                  id="pf"
                  name="pf"
                  value={formData.salary.pf}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="tds"
                  className="text-[#344054] font-medium font-sm"
                >
                  TDS
                </Label>
                <Input
                  id="tds"
                  name="tds"
                  value={formData.salary.tds}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="advance"
                  className="text-[#344054] font-medium font-sm"
                >
                  Advance
                </Label>
                <Input
                  id="advance"
                  name="advance"
                  value={formData.salary.advance}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="totalDeductions"
                  className="text-[#344054] font-medium font-sm"
                >
                  Total Deductions
                </Label>
                <Input
                  id="totalDeductions"
                  name="totalDeductions"
                  value={formData.salary.totalDeductions}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="netPay"
                  className="text-[#344054] font-medium font-sm"
                >
                  Net Amount
                </Label>
                <Input
                  id="netPay"
                  name="netPay"
                  value={formData.salary.netPay}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="bonus"
                  className="text-[#344054] font-medium font-sm"
                >
                  Bonus (Variable Pay)
                </Label>
                <Input
                  id="bonus"
                  name="bonus"
                  value={formData.salary.bonus}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="gratuity"
                  className="text-[#344054] font-medium font-sm"
                >
                  Gratuity
                </Label>
                <Input
                  id="gratuity"
                  name="gratuity"
                  value={formData.salary.gratuity}
                  onChange={(e) => handleChange(e, "salary")}
                  placeholder="Enter"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Identification Details */}
      <div className="w-full flex justify-between my-5">
        <div className="min-w-[280px] flex flex-col gap-1">
          <h2 className="text-sm font-medium text-[#344054]">
            Identification Details
          </h2>
          <p className="text-xs font-normal text-[#475467]">
            Update your personal identification details
          </p>
        </div>
        <Card className="border-0 shadow-sm w-full">
          <CardContent className="py-1 px-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="aadharNo"
                  className="text-[#344054] font-medium font-sm"
                >
                  Aadhar Card Number
                </Label>
                <Input
                  id="aadharNo"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.aadharNo ? "border-red-500" : ""}
                />
                {errors.aadharNo && (
                  <p className="text-red-500 text-xs">{errors.aadharNo}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="panNo"
                  className="text-[#344054] font-medium font-sm"
                >
                  PAN
                </Label>
                <Input
                  id="panNo"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  placeholder="Enter"
                  className={errors.panNo ? "border-red-500" : ""}
                />
                {errors.panNo && (
                  <p className="text-red-500 text-xs">{errors.panNo}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="uan"
                  className="text-[#344054] font-medium font-sm"
                >
                  Provident Fund (UAN)
                </Label>
                <Input
                  id="uan"
                  name="uan"
                  value={formData.uan}
                  onChange={handleChange}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="esicNo"
                  className="text-[#344054] font-medium font-sm"
                >
                  ESIC No.
                </Label>
                <Input
                  id="esicNo"
                  name="esicNo"
                  value={formData.esicNo}
                  onChange={handleChange}
                  placeholder="Enter"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="passportPhoto"
                  className="text-[#344054] font-medium font-sm"
                >
                  Passport Size Photograph
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.passportPhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.passportPhoto}
                        alt="Photo"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, passportPhoto: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="passportPhoto"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "passportPhoto", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="aadhar"
                  className="text-[#344054] font-medium font-sm"
                >
                  Proof of Identity – Aadhar
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.aadhar ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.aadhar}
                        alt="Aadhar"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, aadhar: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="aadhar"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "aadhar", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="addressProof"
                  className="text-[#344054] font-medium font-sm"
                >
                  Proof of Address
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.addressProof ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.addressProof}
                        alt="Address"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, addressProof: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="addressProof"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "addressProof", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="panCard"
                  className="text-[#344054] font-medium font-sm"
                >
                  PAN
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.panCard ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.panCard}
                        alt="PAN"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, panCard: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="panCard"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "panCard", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="qualification"
                  className="text-[#344054] font-medium font-sm"
                >
                  Proof of Qualification
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.qualification ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.qualification}
                        alt="Qualification"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, qualification: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="qualification"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "qualification", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="resume"
                  className="text-[#344054] font-medium font-sm"
                >
                  Copy of Latest CV / Resume
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.resume ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.resume}
                        alt="Resume"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, resume: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="resume"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "resume", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="otherDocs"
                  className="text-[#344054] font-medium font-sm"
                >
                  Other Relevant Documents
                </Label>
                <div className="border rounded-md flex flex-col items-center justify-center p-6 h-[100px] relative">
                  {formData.documents.otherDocs ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.documents.otherDocs}
                        alt="Docs"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            documents: { ...prev.documents, otherDocs: "" },
                          }))
                        }
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                      <input
                        type="file"
                        id="otherDocs"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) =>
                          handleFileUpload(e, "otherDocs", "documents")
                        }
                        accept=".svg,.png,.jpg,.jpeg,.gif,.heic"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                          <div className="text-sm font-medium">
                            Click to upload
                          </div>
                          <div className="text-xs font-normal text-[#475467]">
                            or drag and drop
                          </div>
                        </div>
                        <div className="text-normal text-center text-sm text-[#475467]">
                          svg / .png / .jpg / .gif / .heic
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Remarks */}
      <div className="w-full flex justify-between my-5">
        <div className="min-w-[280px] flex flex-col gap-1">
          <label className="text-sm font-medium text-[#344054]">
            Any Additional Information /Remarks
          </label>
          <p className="text-sm font-normal text-[#475467]">
            Fill in the following details
          </p>
        </div>
        <div className="border rounded-lg p-5 w-full shadow-sm">
          <label className="text-sm font-medium text-[#344054]">Remarks</label>
          <textarea
            className="mt-2 w-full h-38 border rounded-md p-3 text-gray-800"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter"
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewManagers;
