import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mail from "../../../assets/images/checkemail.png";
import arrow from "../../../assets/icon/arrow.png";
import { useLocation } from "react-router-dom";
const CheckEmail = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/route/forgot-password-post`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/checkemail");
      }, 2000);
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
      <div className="w-[360px]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DBE6F0] backdrop-blur-md">
            <img src={mail} alt="email" />
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-semibold text-[#101828]">
              Check your email
            </h2>
            <p className="text-base font-normal text-[#475467]">
              We sent a password reset link to {email}
            </p>
          </div>
        </div>

        <div className="mt-3 text-center text-base font-bold text-[#475467]">
          Open your Gmail account to reset your password
        </div>
        <div className="flex items-center justify-center mt-4 gap-1">
          <p className="text-sm font-normal">Didn’t receive the email?</p>
          <button
            onClick={handleClick}
            className="text-sm font-semibold text-[#213B54] hover:underline"
            disabled={loading}
          >
            {loading ? "Resending..." : "Click to resend"}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
        )}

        <div className="mt-5 flex items-center justify-center gap-2">
          <img src={arrow} className="w-3 h-3 mt-1" alt="arrow" />
          <Link
            to="/login"
            className="text-sm font-semibold text-[#475467] hover:underline"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
