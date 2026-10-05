import Loan from "../../models/loanModel.js";
import userModel from "../../models/userModel.js";

//// Api to add loan
export const addLoan = async (req, res) => {
  try {
    const { empId, amountPaid, tenure, additionalInfo, repaymentMethod, oneTimePaymentDate } = req.body;
    console.log(req.body);

    if (!empId || !amountPaid || !tenure) {
      return res
        .status(400)
        .json({ message: "employeeId, amountPaid, and tenure are required." });
    }

    // Check if employee with empId exists
    const userExists = await userModel.findOne({ empId: empId });

    if (!userExists) {
      return res
        .status(404)
        .json({ message: "Employee with the provided empId does not exist." });
    }

    const newLoan = new Loan({
      empId,
      amountPaid,
      tenure,
      additionalInfo,
      repaymentMethod: repaymentMethod || "salary_deduction",
      oneTimePaymentDate: repaymentMethod === "one_time" ? oneTimePaymentDate : undefined,
      amountRecovered: 0,
      monthsLeft: tenure,
      status: "open",
    });

    const savedLoan = await newLoan.save();
    res.status(201).json({ message: "Loan saved successfully", savedLoan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding loan application", error: error.message });
  }
};

////Api to get all loans
export const getAllLoan = async (req, res) => {
  try {
    const query = req.user.typeOfUser === "employee" ? { empId: req.user.empId } : {};
    const loans = await Loan.find(query);
    const loansWithUser = await Promise.all(
      loans.map(async (loan) => {
        const user = await userModel.findOne({ empId: loan.empId });
        return {
          ...loan.toObject(),
          user,
        };
      })
    );
    res.status(200).json(loansWithUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching loans", error: error.message });
  }
};

////Api to delete a loan
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLoan = await Loan.findByIdAndDelete(id);

    if (!deletedLoan) {
      return res
        .status(404)
        .json({ message: "Loan not found with the given ID." });
    }

    res
      .status(200)
      .json({ message: "Loan deleted successfully.", deletedLoan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting loan", error: error.message });
  }
};
