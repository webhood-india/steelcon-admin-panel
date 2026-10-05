import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number, // In months
      required: true,
    },
    additionalInfo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    amountRecovered: {
      type: Number,
      default: 0,
    },
    repaymentMethod: { type: String, enum: ["salary_deduction", "one_time"], default: "salary_deduction" },
    oneTimePaymentDate: { type: Date },
    monthsLeft: {
      type: Number,
      default: function () {
        return this.tenure;
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Loan", loanSchema);
