import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center px-4">
      {/* Error Code */}
      <h1 className="text-7xl font-black text-primary">404</h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-bold mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for might have been removed or does not exist.
      </p>

      {/* Button */}

      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
      >
        <FaArrowLeftLong />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
