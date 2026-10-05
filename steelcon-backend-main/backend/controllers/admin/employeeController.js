import bcrypt from "bcryptjs";
import sendEmail from "../../utils/sendEmail.js";
import userModel from "../../models/userModel.js"; // Importing the User model

////////////////////////////////////////////////////////////////////////////////////////
// Employee Module
////////////////////////////////////////////////////////////////////////////////////////

// Get all employees
export const getEmployees = async (req, res, next) => {
  try {
    let filter = { typeOfUser: "employee" };
    if (req.user.typeOfUser === "employee") filter._id = req.user._id;
    if (req.user.typeOfUser === "manager") filter.teamManager = `${req.user.firstName} ${req.user.lastName}`;
    const employees = await userModel.find(filter).select("-password -resetPasswordToken -resetPasswordExpires");
    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    next("Server Error");
  }
};

// API to create a new employee
export const addEmployee = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      profileImg,
      personalEmail,
      personalMobile,
      emergencyContact,
      manpowerRequester,
      joiningDate,
      designation,
      department,
      teamManager,
      deptEmail,
      workEmail,
      bank,
      salary,
      aadharNo,
      panNo,
      uan,
      esicNo,
      documents,
      remarks,
    } = req.body;

    // **Step 1: Generate a Unique Employee ID**
    const lastEmployee = await userModel
      .findOne({ typeOfUser: "employee" })
      .sort({ createdAt: -1 });

    let newEmpId = "EMP00001"; // Default for the first employee

    if (lastEmployee) {
      let lastIdNum = Number(lastEmployee.empId.slice(3)); // Extract the number after 'STL'
      let nextIdNum = lastIdNum + 1; // Increment by 1
      newEmpId = `EMP${nextIdNum.toString().padStart(5, "0")}`; // Format to 5 digits
    }

    // **Step 2: Generate a Temporary Password and Hash It**
    const tempPassword = `Temp@${Math.floor(1000 + Math.random() * 9000)}`; // Example: Temp@1234
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    // **Step 3: Create a New Employee Object**
    const newEmployee = new userModel({
      typeOfUser: "employee",
      isFirstUser: true,
      empId: newEmpId,
      firstName,
      middleName,
      lastName,
      profileImg,
      personalEmail,
      personalMobile,
      emergencyContact,
      manpowerRequester,
      joiningDate,
      designation,
      department,
      teamManager,
      deptEmail,
      workEmail,
      password: hashedPassword, // Storing the hashed password
      bank,
      salary,
      aadharNo,
      panNo,
      uan,
      esicNo,
      documents,
      remarks,
    });

    // **Step 4: Save the Employee to the Database**
    await newEmployee.save();

    // **Step 5: Send credentials via email**
    // await sendEmail(
    //   personalEmail,
    //   "Login Credentials",
    // `Email: ${personalEmail},
    //       Password: ${tempPassword},
    //       Login Link: https://steelcon.vercel.app/login`
    // );
    // console.log("Email sent successfully");

    // **Step 6: Send Response Back**
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      empId: newEmpId,
      password: tempPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating employee",
      error: error.message,
    });
  }
};

//  Search for a employee by name
export const searchEmployee = async (req, res, next) => {
  try {
    const { name } = req.query; // Get search input from query params

    if (!name) {
      next("Please provide a name to search");
    }

    // Search for employees whose name contains the input (case-insensitive)
    let filter = {
      typeOfUser: "employee",
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { middleName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    };
    if (req.user.typeOfUser === "employee") filter._id = req.user._id;
    if (req.user.typeOfUser === "manager") filter.teamManager = `${req.user.firstName} ${req.user.lastName}`;
    const employees = await userModel.find(filter).select("-password -resetPasswordToken -resetPasswordExpires");

    if (employees.length === 0) {
      next("No employees found");
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error searching employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update a employee
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params; // Get employee's ID from URL
    const updates = req.body; // Get updated details from request body

    // Prevent empId from being updated
    if (updates.empId) {
      next("Employee ID cannot be changed");
    }

    // Find employee by ID and update details
    const updatedEmployee = await userModel.findOneAndUpdate(
      { _id: id, typeOfUser: "employee" }, // Ensure only employees are updated
      updates,
      { new: true, runValidators: true } // Return updated data and enforce validation
    );

    if (!updatedEmployee) {
      next("Employee not found");
    }

    res
      .status(200)
      .json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
};
