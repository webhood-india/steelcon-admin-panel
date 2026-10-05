import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../../assets/icon/arrow.png";
import key from "../../../assets/images/Featured icon.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/route/forgot-password-post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.err || "Something went wrong");
      }

      // Success
      setSuccess(true);
      setTimeout(() => {
        navigate("/checkemail", { state: { email } });
      });
    } catch (err) {
      setError(
        err.message || "Failed to send reset instructions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-[360px] ">
        <div className="flex flex-col items-center gap-[24px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDF2F8] ">
            <img src={key} alt="key" />
          </div>
          <div className="flex flex-col gap-[12px] ">
            <h2 className="text-3xl font-semibold text-center text-[#101828]">
              Forgot password?
            </h2>
            <p className="text-base font-normal text-[#475467] ">
              No worries, we'll send you reset instructions.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-[#344054]">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md border-[#D0D5DD] placeholder-[#667085]"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer w-full bg-[#305679] text-base text-white py-2.5 font-semibold rounded-lg ${
              loading ? "opacity-70" : ""
            }`}
          >
            {loading ? "Sending..." : "Reset password"}
          </button>
        </form>
        <div className="mt-8 flex gap-2 items-center justify-center">
          <img src={arrow} className="w-[12px] h-[12px] mt-1" alt="arrow" />
          <Link
            to="/login"
            className="text-sm text-[#475467] font-semibold hover:underline"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
