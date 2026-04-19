import { ArrowRight, MapPin } from "lucide-react";
import React from "react";
import { useState } from "react";
import Countdown from "react-countdown";
import { FaArrowRight, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoBoatOutline } from "react-icons/io5";
import { LuBus, LuPlane } from "react-icons/lu";
import { PiTrain } from "react-icons/pi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookedTicketCard = ({ bookingTicket }) => {
  const axiosSecure = useAxiosSecure();
  const [isExpired, setIsExpired] = useState(false);
  const {
    ticketImage,
    totalPrice,
    ticketTitle,
    transport,
    quantity,
    from,
    to,
    departureDateTime,
    status,
  } = bookingTicket;

  const dateObj = new Date(departureDateTime);

  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handlePayment = async (booking) => {
    const paymentInfo = {
      bookingId: booking._id,
      ticketId: booking.ticketId,
      ticketTitle: booking.ticketTitle,
      ticketImage: booking.ticketImage,
      userEmail: booking.userEmail,
      vendorEmail: booking.vendorEmail,
      quantity: booking.quantity,
      unitPrice: booking.unitPrice,
      totalPrice: booking.totalPrice,
      from: booking.from,
      to: booking.to,
      departureDateTime: booking.departureDateTime,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo,
    );
    // window.location.href = res.data.url;
    window.location.assign(res.data.url);
  };
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden border border-accent-content flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={ticketImage}
          alt={ticketTitle}
          className="h-52 w-full object-cover transform group-hover:scale-104 transition-transform duration-500 ease-out"
        />

        {/* Transport Badge */}
        <div className="absolute top-3 left-3 z-10">
          {transport === "Bus" && (
            <div className="flex items-center gap-2 bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <LuBus size={16} />
              <span className="text-sm font-medium">Bus</span>
            </div>
          )}

          {transport === "Train" && (
            <div className="flex items-center gap-2 bg-[#00bb87]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <PiTrain size={16} />
              <span className="text-sm font-medium">Train</span>
            </div>
          )}

          {transport === "Launch" && (
            <div className="flex items-center gap-2 bg-[#ec5a00]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <IoBoatOutline size={16} />
              <span className="text-sm font-medium">Launch</span>
            </div>
          )}

          {transport === "Plane" && (
            <div className="flex items-center gap-2 bg-[#9260da]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <LuPlane size={16} />
              <span className="text-sm font-medium">Plane</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col grow">
        <div className="p-4 space-y-3">
          <h2 className="text-lg font-bold text-primary-content">
            {ticketTitle}
          </h2>

          {/* Route */}
          <div className="w-full bg-base-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-secondary-content uppercase">
                From
              </p>
              <h2 className="text-base font-bold text-primary-content">{from}</h2>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="relative flex items-center justify-center">
                <div className="relative z-10 bg-white border border-accent-content rounded-full p-2 shadow-sm">
                  <ArrowRight className="text-primary" size={18} />
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-secondary-content uppercase">
                To
              </p>
              <h2 className="text-base font-bold text-primary-content">{to}</h2>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-4 text-sm text-secondary-content">
            <div className="flex-1 flex items-center gap-2 bg-base-200 p-2 rounded-md">
              <FaRegCalendarAlt size={16} />
              <span className="font-semibold text-sm">{date}</span>
            </div>

            <div className="flex-1 flex items-center gap-2  bg-base-200 p-2 rounded-md">
              <FiClock size={16} />
              <span className="font-semibold text-sm">{time}</span>
            </div>
          </div>

          <div className="bg-base-200 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-secondary-content font-medium">
                Booking Qty
              </p>
              <p className="font-semibold">{quantity} tickets</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-secondary-content font-medium">
                Total Price
              </p>
              <p className="text-primary font-bold text-lg">৳{totalPrice}</p>
            </div>
          </div>

          <div>
            <Countdown
              date={new Date(departureDateTime)}
              onComplete={() => setIsExpired(true)}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return (
                    <span className="text-red-500 font-bold bg-base-200 p-4 block rounded-lg">
                      Departed
                    </span>
                  );
                }

                const timeData = [
                  { val: days, label: "Days" },
                  { val: hours, label: "Hours" },
                  { val: minutes, label: "Mins" },
                  { val: seconds, label: "Secs" },
                ];

                return (
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {timeData.map((t) => (
                      <div
                        key={t.label}
                        className="bg-primary/10 py-2 rounded-lg"
                      >
                        <p className="font-bold text-primary">{t.val}</p>
                        <p className="text-xs font-semibold text-secondary-content uppercase">
                          {t.label}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="bg-base-300 h-full">
          <div className="p-4 flex justify-center items-center border-t border-primary/30 ">
            {status === "paid" ? (
              <p className="text-green-600 font-semibold">Paid</p>
            ) : status === "accepted" && !isExpired ? (
              <button
                onClick={() => handlePayment(bookingTicket)}
                className="w-full py-2 rounded-lg text-white bg-primary/80 hover:bg-primary transition cursor-pointer"
              >
                Pay Now
              </button>
            ) : status === "pending" ? (
              <p className="text-yellow-500 text-sm font-semibold mt-2">
                Waiting for vendor approval
              </p>
            ) : status === "rejected" ? (
              <p className="text-red-500 text-sm font font-semibold mt-2">Booking rejected</p>
            ) : isExpired ? (
              <p className="text-red-500 text-sm font-semibold mt-2">
                Payment unavailable (Expired)
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTicketCard;
