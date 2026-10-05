import React, { useState, useEffect } from "react";
import key from "../../../assets/images/Featured icon.png";
import arrow from "../../../assets/icon/arrow.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract token from URL when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, [location]);

  const validatePassword = (pass) => {
    return pass.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/route/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      setIsSuccess(true);
      navigate("/resetpassword");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[360px] p-6">
        <div className="flex flex-col items-center gap-[22px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DBE6F0] backdrop-blur-md">
            <img src={key} alt="key" />
          </div>
          <div className="flex flex-col gap-[12px]">
            <h2 className="text-3xl font-semibold text-center text-[#101828]">
              {isSuccess ? "Password Reset" : "Set new password"}
            </h2>
            <p className="text-base text-center font-normal text-[#475467]">
              {isSuccess
                ? "Your password has been reset successfully. You can now log in with your new password."
                : "Your new password must be different to previously used passwords."}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-sm font-medium text-[#344054]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md border-[#D0D5DD] placeholder-[#667085]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className=" cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              <p className="text-sm font-normal text-[#475467]">
                Must be at least 8 characters.
              </p>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-sm font-medium text-[#344054]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded-md border-[#D0D5DD] placeholder-[#667085]"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className=" cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-[#305679] text-base text-white py-2.5 font-semibold rounded-lg hover:bg-[#264863] transition-colors disabled:bg-[#9BA6B4] disabled:cursor-not-allowed"
          >
            {isLoading ? "Resetting..." : "Reset password"}
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

export default SetPassword;
