import bcrypt from "bcryptjs";
import sendEmail from "../../utils/sendEmail.js";
import userModel from "../../models/userModel.js"; // Importing the User model

////////////////////////////////////////////////////////////////////////////////////////
// Manager Module
////////////////////////////////////////////////////////////////////////////////////////

// // Get all managers
// export const getManagers = async (req, res, next) => {
//   try {
//     const managers = await userModel.find({ typeOfUser: "manager" }); // Fetch Manager details
//     res.status(200).json({
//       success: true,
//       count: managers.length,
//       data: managers,
//     });
//   } catch (error) {
//     console.error("Error fetching managers:", error);
//     next("Server Error");
//   }
// };

// Get all managers or filter by department code
export const getManagers = async (req, res, next) => {
  try {
    const { department } = req.query; // Get department code from query params

    let filter = { typeOfUser: "manager" }; // Base filter to get only managers

    if (department) {
      filter.department = department.toUpperCase(); // Apply department filter if present
    }

    const managers = await userModel.find(filter).select("-password -resetPasswordToken -resetPasswordExpires");
    // .select("firstName lastName _id department");

    res.status(200).json({
      success: true,
      count: managers.length,
      data: managers,
    });
  } catch (error) {
    console.error("Error fetching managers:", error);
    next("Server Error");
  }
};

// API to create a new manager
export const addManager = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      profileImg,
      personalEmail,
      personalMobile,
      emergencyContact,
      workDays,
      paidLeaves,
      sickLeaves,
      isHR,
      resignDeduction,
      joiningDate,
      designation,
      department,
      teamManager,
      reportTo,
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
    console.log(personalEmail);

    // **Step 1: Generate a Unique Employee ID**
    const lastManager = await userModel
      .findOne({ typeOfUser: "manager" })
      .sort({ createdAt: -1 });

    let newEmpId = "STL00001"; // Default for the first manager

    if (lastManager) {
      let lastIdNum = Number(lastManager.empId.slice(3)); // Extract the number after 'STL'
      let nextIdNum = lastIdNum + 1; // Increment by 1
      newEmpId = `STL${nextIdNum.toString().padStart(5, "0")}`; // Format to 5 digits
    }

    // **Step 2: Generate a Temporary Password and Hash It**
    const tempPassword = `Temp@${Math.floor(1000 + Math.random() * 9000)}`; // Example: Temp@1234
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(tempPassword, salt);

    // **Step 3: Create a New Manager Object**
    const newManager = new userModel({
      typeOfUser: "manager",
      isFirstUser: true,
      empId: newEmpId,
      firstName,
      middleName,
      lastName,
      profileImg,
      personalEmail,
      personalMobile,
      emergencyContact,
      workDays,
      paidLeaves,
      sickLeaves,
      isHR,
      resignDeduction,
      joiningDate,
      designation,
      department,
      teamManager,
      reportTo,
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

    // **Step 4: Save the Manager to the Database**
    await newManager.save();

    // **Step 5: Send credentials via email**
    // await sendEmail(
    //   personalEmail,
    //   "Login Credentials",
    //   `Email: ${personalEmail},
    //   Password: ${tempPassword},
    //   Login Link: https://steelcon.vercel.app/login`
    // );
    // console.log("Email sent successfully");

    // **Step 6: Send Response Back**
    res.status(201).json({
      success: true,
      message: "Manager created successfully",
      empId: newEmpId,
      password: tempPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating manager",
      error: error.message,
    });
  }
};

//  Search for a manager by name
export const searchManager = async (req, res, next) => {
  try {
    const { name } = req.query; // Get search input from query params

    if (!name) {
      next("Please provide a name to search");
    }

    // Search for managers whose name contains the input (case-insensitive)
    const managers = await userModel.find({
      typeOfUser: "manager",
      $or: [
        { firstName: { $regex: name, $options: "i" } },
        { middleName: { $regex: name, $options: "i" } },
        { lastName: { $regex: name, $options: "i" } },
      ],
    }).select("-password -resetPasswordToken -resetPasswordExpires");

    if (managers.length === 0) {
      next("No managers found");
    }

    res.status(200).json(managers);
  } catch (error) {
    console.error("Error searching managers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update a manager
export const updateManager = async (req, res, next) => {
  try {
    const { id } = req.params; // Get manager's ID from URL
    const updates = req.body; // Get updated details from request body

    // Prevent empId from being updated
    if (updates.empId) {
      next("Employee ID cannot be changed");
    }

    // Find manager by ID and update details
    const updatedManager = await userModel.findOneAndUpdate(
      { _id: id, typeOfUser: "manager" }, // Ensure only managers are updated
      updates,
      { new: true, runValidators: true } // Return updated data and enforce validation
    );

    if (!updatedManager) {
      next("Manager not found");
    }

    res
      .status(200)
      .json({ message: "Manager updated successfully", updatedManager });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating manager", error: error.message });
  }
};

// Get managers by department code
export const getManagersByDepartment = async (req, res, next) => {
  try {
    const { department } = req.query;
    if (!department) return next("Department code is required");

    // Find all employees who are managers in this department
    const managers = await userModel
      .find({
        department: department.toUpperCase(),
        role: "Manager",
      })
      .select("firstName lastName _id");

    res.status(200).json({
      success: true,
      data: managers,
    });
  } catch (error) {
    console.error("Error fetching managers:", error);
    next("Server Error");
  }
};
