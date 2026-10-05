import React from "react";
import arrow from "../../../assets/icon/arrow.png";
import correct from "../../../assets/images/correctPassword.png";
import { Link } from "react-router-dom";
const ResetPassword = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-[360px] p-6">
        <div className="flex flex-col items-center gap-[24px]">
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#DBE6F0]  backdrop-blur-md">
            <img src={correct} alt="check" />
          </div>
          <div className="flex flex-col gap-[12px] ">
            <h2 className="text-3xl font-semibold text-center text-[#101828]">
              Password reset
            </h2>
            <p className="text-base text-center font-normal text-[#475467] ">
              Your password has been successfully reset. Click below to log in
              magically.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/">
            <button className=" cursor-pointer w-full bg-[#305679] text-base text-white py-2.5 font-semibold rounded-lg">
              Continue
            </button>
          </Link>
        </div>
        <div className="mt-8 flex gap-2 items-center justify-center">
          <img src={arrow} className="w-[12px] h-[12px] mt-1" alt="arrow" />
          <Link
            to="/login"
            className="text-sm text-[#475467] font-semibold hover:underline hover:decoration-[#475467]"
          >
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
