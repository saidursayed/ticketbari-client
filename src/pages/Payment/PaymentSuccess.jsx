import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState();


  useEffect(() => {
    if (sessionId) {
      axios.patch(`${import.meta.env.VITE_API_URL}/payment-success?session_id=${sessionId}`).then((res) => {
        console.log(res.data);
        setPaymentInfo(res.data);
      });
    }
  }, [sessionId]);
  console.log(paymentInfo);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-lg text-center bg-secondary border border-accent-content rounded-2xl shadow-md p-8 relative overflow-hidden">
        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-green-500/20 mb-5">
          <IoBagCheckOutline className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-primary-content mb-2">
          Payment Successful!
        </h1>

        <p className="text-primary-content/70 mb-6 text-sm md:text-base">
          Your order has been confirmed. You can track it anytime from your
          dashboard.
        </p>

        <Link
          to="/dashboard/transaction-history"
          className="px-4 py-2 rounded-lg bg-primary text-white font-semibold 
              hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg "
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
