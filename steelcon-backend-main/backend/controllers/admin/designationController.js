import Department from "../../models/departmentModel.js";
import userModel from "../../models/userModel.js";

////////////////////////////////////////////////////////////////////////////////////////
// Designation Module
////////////////////////////////////////////////////////////////////////////////////////

// Get all designations from all departments
export const getDesignations = async (req, res, next) => {
  try {
    const departments = await Department.find({}, "name code designations");

    // Extract all designations from departments
    const designations = departments.flatMap((dept) =>
      dept.designations.map((desig) => ({
        departmentName: dept.name,
        departmentCode: dept.code,
        designation: desig.designation,
        designationCode: desig.code,
      }))
    );

    res.status(200).json({
      success: true,
      count: designations.length,
      data: designations,
    });
  } catch (error) {
    console.error("Error fetching designations:", error);
    next("Server Error");
  }
};

// Add a designation
export const addDesignation = async (req, res, next) => {
  try {
    const { departmentCode, designation, code } = req.body;

    // Validate inputs
    if (!departmentCode) return next("Department code is required");
    if (!designation) return next("Designation name is required");
    if (!code) return next("Designation code is required");

    // Find the department by its code
    const department = await Department.findOne({ code: departmentCode });

    if (!department) return next("Department not found");

    // Check if designation already exists in the department
    const existingDesignation = department.designations.find(
      (d) => d.code === code
    );

    if (existingDesignation)
      return next(
        "Designation with this code already exists in this department"
      );

    // Add new designation to the array
    department.designations.push({ designation, code });

    // Save changes
    await department.save();

    res.status(201).json({
      success: true,
      message: "Designation added successfully.",
      data: {
        departmentName: department.name,
        departmentCode: department.code,
        designation,
        designationCode: code,
      },
    });
  } catch (error) {
    console.error("Error adding designation:", error);
    next("Server Error");
  }
};

export const updateDesignation = async (req, res, next) => {
  try {
    const { departmentCode, designationCode, designation } = req.body;

    // Validate inputs
    if (!departmentCode) return next("Department code is required");
    if (!designationCode) return next("Designation code is required");
    if (!designation) return next("New designation name is required");

    // Find the department by its code
    const department = await Department.findOne({ code: departmentCode });

    if (!department) return next("Department not found");

    // Find the designation inside the department
    const designationIndex = department.designations.findIndex(
      (d) => d.code === designationCode
    );

    if (designationIndex === -1)
      return next("Designation not found in this department");

    // Update the designation name
    department.designations[designationIndex].designation = designation;

    // Save changes
    await department.save();

    res.status(200).json({
      success: true,
      message: "Designation updated successfully.",
      data: {
        departmentName: department.name,
        departmentCode: department.code,
        designation,
        designationCode,
      },
    });
  } catch (error) {
    console.error("Error updating designation:", error);
    next("Server Error");
  }
};

// Delete a designation using id
export const deleteDesignation = async (req, res, next) => {
  try {
    const { departmentCode, designationCode } = req.body;

    if (!departmentCode) return next("Department code is required");
    if (!designationCode) return next("Designation code is required");

    // Find the department
    const department = await Department.findOne({ code: departmentCode });
    if (!department) return next("Department not found");

    // Filter out the designation
    const updatedDesignations = department.designations.filter(
      (d) => d.code !== designationCode
    );

    // If no designation was removed, return an error
    if (updatedDesignations.length === department.designations.length) {
      return next("Designation not found in this department");
    }

    // Update the department's designations array
    department.designations = updatedDesignations;
    await department.save();

    res.status(200).json({
      success: true,
      message: "Designation deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting designation:", error);
    next("Server Error");
  }
};

// Search designations using designation code
export const searchDesignation = async (req, res, next) => {
  try {
    const { query } = req.query; // Get designation code from query

    if (!query) return next("Designation code is required");

    // Find department that contains this designation code
    const department = await Department.findOne({
      "designations.code": query.toUpperCase(),
    });

    if (!department) return next("Designation not found");

    // Extract the matching designation from the department
    const designation = department.designations.find(
      (d) => d.code === query.toUpperCase()
    );

    res.status(200).json({
      success: true,
      data: {
        departmentName: department.name,
        departmentCode: department.code,
        designation: designation.designation,
        designationCode: designation.code,
      },
    });
  } catch (error) {
    console.error("Error searching designation:", error);
    next("Server Error");
  }
};

// // 🔍 Get employees of a specific department using department code
// export const getEmployeesFromDesignation = async (req, res, next) => {
//   try {
//     const { code } = req.params;

//     // Find the designation with the given code
//     const designation = await Designation.findOne({ code: code.toUpperCase() });

//     if (!designation) {
//       next("Designation not found");
//     }

//     // Find employees belonging to the designation code
//     const employees = await userModel.find({
//       designationCode: designation.code,
//     });

//     if (employees.length === 0) {
//       next("No employees found for this designation");
//     }

//     res.status(200).json(employees);
//   } catch (error) {
//     next("Server Error");
//   }
// };
