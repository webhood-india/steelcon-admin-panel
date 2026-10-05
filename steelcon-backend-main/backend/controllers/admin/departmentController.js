import Department from "../../models/departmentModel.js";
import userModel from "../../models/userModel.js";

////////////////////////////////////////////////////////////////////////////////////////
// Department Module
////////////////////////////////////////////////////////////////////////////////////////

// Get all departments
export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find(); // Fetch departments
    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    next("Server Error");
  }
};

// Add a new department
export const addDepartment = async (req, res, next) => {
  try {
    const { name, code } = req.body;

    // Check if both fields are provided
    if (!name) {
      next("Name is required");
    }
    if (!code) {
      next("Code is required");
    }

    // Check if department already exists
    const existingDepartment = await Department.findOne({ code });
    if (existingDepartment) {
      next("Department with this code already exists");
    }

    // Create and save new department
    const newDepartment = new Department({ name, code });
    await newDepartment.save();

    res.status(201).json({
      success: true,
      message: "Department added successfully.",
      data: newDepartment,
    });
  } catch (error) {
    console.error("Error adding department:", error);
    next("Server Error");
  }
};

//Update a department using id
export const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Check if both fields are provided
    if (!name) {
      next("Name is required");
    }

    // Find and update the department
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    // Check if department exists
    if (!updatedDepartment) {
      next("Department not found");
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      data: updatedDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    next("Server Error");
  }
};

// Delete a department using id
export const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find and delete the department
    const deletedDepartment = await Department.findByIdAndDelete(id);

    // Check if department exists
    if (!deletedDepartment) {
      next("Department not found");
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    next("Server Error");
  }
};

//  Search for a department by code only
export const searchDepartment = async (req, res, next) => {
  try {
    const { query } = req.query; // Get search input from query params

    if (!query) {
      next("Search query is required");
    }

    // Find department where code matches (case-insensitive)
    const departments = await Department.find({
      code: { $regex: query, $options: "i" },
    });

    if (departments.length === 0) {
      return res.status(404).json({ message: "No departments found" });
    }

    res.status(200).json(departments);
  } catch (error) {
    next("Server error");
  }
};

// 🔍 Get employees of a specific department using department code
export const getEmployeesFromDepartment = async (req, res, next) => {
  try {
    const { code } = req.params;

    // Find the department with the given code
    const department = await Department.findOne({ code: code.toUpperCase() });

    if (!department) {
      next("Department not found");
    }

    // Find employees belonging to the department code
    const employees = await userModel.find({ departmentCode: department.code });

    if (employees.length === 0) {
      next("No employees found for this department");
    }

    res.status(200).json(employees);
  } catch (error) {
    next("Server Error");
  }
};
