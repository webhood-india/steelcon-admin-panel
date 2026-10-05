import React from "react";
import { useSelector } from "react-redux";
import { FadeLoader, SyncLoader } from "react-spinners";

const Spinner = () => {
  const loading = useSelector((state) => state.loading.loading);
  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
        <SyncLoader color="#305679" loading={loading} size={18} />
      </div>
    )
  );
};

export default Spinner;
