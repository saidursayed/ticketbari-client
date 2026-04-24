import React from "react";
import { PuffLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <PuffLoader color="#0073d5" size={80}></PuffLoader>
    </div>
  );
};

export default LoadingSpinner;
