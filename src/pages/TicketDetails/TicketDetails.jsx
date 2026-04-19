import { MapPin, Calendar, Clock, Train, Check, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import BookingModal from "../../components/Modal/BookingModal/BookingModal";
import { FaArrowLeft, FaStore } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Container from "../../components/Shared/Container/Container";
import { LuBus, LuPlane, LuUsers } from "react-icons/lu";
import Countdown from "react-countdown";
import { IoBoatOutline } from "react-icons/io5";
import { PiTrain } from "react-icons/pi";

const TicketDetails = () => {
  const { id } = useParams();
  const [isExpired, setIsExpired] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/${id}`,
      );
      return result.data;
    },
  });

  const dateObj = new Date(ticket.departureDateTime);

  const date = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isLoading) return <span>Loading...</span>;
  if (!ticket) return <p>No data found</p>;

  const {
    _id,
    ticketImage,
    ticketTitle,
    from,
    to,
    transport,
    ticketPrice,
    ticketQuantity,
    perks,
    departureDateTime,
    vendorName,
    vendorEmail,
  } = ticket;

  return (
    <div className="bg-base-100 py-16">
      <Container>
        <div>
          {/* Back Button */}
          <Link
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-medium text-primary-content mb-6 hover:text-primary transition-colors cursor-pointer"
          >
            <span className="mr-1">
              <FaArrowLeft></FaArrowLeft>
            </span>{" "}
            Back to Tickets
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Image and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image Section */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-110 group">
                <img
                  src={ticketImage}
                  alt={ticketTitle}
                  className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  {transport === "Bus" && (
                    <div className="flex items-center gap-2 bg-primary/90 backdrop-blur px-3 py-1 rounded-md text-white shadow">
                      <LuBus size={16} />
                      <span className="text-sm font-medium">Bus</span>
                    </div>
                  )}

                  {transport === "Train" && (
                    <div className="flex items-center gap-2 bg-[#00bb87]/90 backdrop-blur px-3 py-1 rounded-md text-white shadow">
                      <PiTrain size={16} />
                      <span className="text-sm font-medium">Train</span>
                    </div>
                  )}

                  {transport === "Launch" && (
                    <div className="flex items-center gap-2 bg-[#ec5a00]/90 backdrop-blur px-3 py-1 rounded-md text-white shadow">
                      <IoBoatOutline size={16} />
                      <span className="text-sm font-medium">Launch</span>
                    </div>
                  )}

                  {transport === "Plane" && (
                    <div className="flex items-center gap-2 bg-[#9260da]/90 backdrop-blur px-3 py-1 rounded-md text-white shadow">
                      <LuPlane size={16} />
                      <span className="text-sm font-medium">Plane</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Main Info Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h1 className="text-2xl font-semibold text-primary-content mb-8">
                  {ticketTitle}
                </h1>

                {/* Route Section */}
                <div className="flex items-center justify-between bg-base-200 p-6 rounded-xl mb-6 relative">
                  <div>
                    <p className="text-xs text-secondary-content font-semibold uppercase mb-1">
                      From
                    </p>
                    <h2 className="text-xl font-semibold text-primary-content">
                      {from}
                    </h2>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 bg-primary/10 p-2 rounded-full">
                    <MapPin className="text-primary" size={20} />
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-secondary-content font-semibold uppercase mb-1">
                      To
                    </p>
                    <h2 className="text-xl font-semibold text-primary-content">
                      {to}
                    </h2>
                  </div>
                </div>

                {/* Date and Time Section */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3">
                    <div className="text-primary">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-secondary-content font-bold uppercase">
                        Departure Date
                      </p>
                      <p className="text-sm font-semibold text-primary-content">
                        {date}
                      </p>
                    </div>
                  </div>
                  <div className="bg-base-200 p-4 rounded-xl flex items-center gap-3">
                    <div className="text-primary">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-secondary-content font-bold uppercase">
                        Departure Time
                      </p>
                      <p className="text-sm font-semibold text-primary-content">
                        {time}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Included Perks */}
                <div className="mb-8">
                  <p className="font-bold text-primary-content mb-3">
                    Included Perks:
                  </p>
                  <div className="flex gap-3">
                    {perks.map((perk) => (
                      <div
                        key={perk}
                        className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full text-[11px] font-bold text-primary-content/70"
                      >
                        <Check size={14} className="text-primary" /> {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
                {/* Title */}
                <h2 className="text-lg font-semibold text-primary-content mb-5">
                  Vendor Information
                </h2>

                {/* Content */}
                <div className="flex items-center justify-between gap-3">
                  {/* Vendor Name */}
                  <div className="flex-1 bg-base-200 p-3 rounded flex items-center gap-1.5">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <FaStore />
                    </div>
                    <div>
                      <p className="text-xs text-secondary-content font-medium">
                        Vendor Name
                      </p>
                      <p className="text-sm font-semibold text-primary-content">
                        {vendorName}
                      </p>
                    </div>
                  </div>

                  {/* Vendor Email */}
                  <div className="flex-1 bg-base-200 p-3 rounded flex items-center gap-1.5">
                    <div className="bg-primary/10 text-primary p-2 rounded-lg">
                      <MdEmail />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-secondary-content">
                        Email Address
                      </p>
                      <p className="text-sm font-semibold text-primary-content">
                        {vendorEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Widgets */}
            <div className="space-y-6">
              {/* Countdown Widget */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-primary" />
                  <h3 className="font-bold text-primary-content">
                    Departure Countdown
                  </h3>
                </div>

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
                            className="bg-primary/10 p-2 rounded-lg"
                          >
                            <p className="text-xl font-bold text-primary">
                              {t.val}
                            </p>
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

              {/* Booking Widget */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-primary-content mb-6 text-lg">
                  Book This Ticket
                </h3>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-primary-content/60 font-semibold">
                    Price per ticket
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {ticketPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-base-200 px-4 py-3 rounded-lg mb-6 border border-gray-100">
                  <div className="flex items-center gap-2 text-primary-content/80">
                    <LuUsers size={16} />
                    <span className="text-xs font-semibold uppercase">
                      Available
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary-content">
                    {ticketQuantity} tickets
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(true)}
                  disabled={ticketQuantity === 0 || isExpired}
                  className={`w-full text-white py-2.5 rounded-lg font-bold transition-all shadow-md cursor-pointer ${ticketQuantity === 0 || isExpired ? "bg-secondary-content/50 cursor-not-allowed" : "bg-primary hover:bg-primary/90 "}`}
                >
                  {ticketQuantity === 0 || isExpired
                    ? "Departed Cannot Book"
                    : "Book Now"}
                </button>

                <BookingModal
                  ticket={ticket}
                  closeModal={() => setIsOpen(false)}
                  isOpen={isOpen}
                ></BookingModal>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TicketDetails;
