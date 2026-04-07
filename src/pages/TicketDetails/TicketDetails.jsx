import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaArrowRight, FaRegCalendarAlt, FaStore } from "react-icons/fa";
import { FaBusSimple, FaLocationDot, FaTicket } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";
import { MdAcUnit, MdEmail } from "react-icons/md";
import { useParams } from "react-router";
import CountdownTimer from "../../components/Shared/CountdownTimer/CountdownTimer";
import BookingModal from "../../components/Modal/BookingModal/BookingModal";

const TicketDetails = () => {
  const { id } = useParams();
  const [isExpired, setIsExpired] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  const { data: ticket = {}, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/${id}`,
      );
      return result.data;
    },
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
    verificationStatus,
  } = ticket;

  return (
    <div className="space-y-8 py-8">
      {/* 🔝 Banner */}
      <div className="relative h-100 rounded-2xl overflow-hidden">
        <img src={ticketImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
          <h1 className="text-2xl font-bold">{ticketTitle}</h1>
          {/* <p className="flex items-center gap-2 text-sm mt-1">
              <MdLocationOn /> {from} → {to}
            </p> */}
        </div>
      </div>

      {/* 🔽 Main Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* Journey Info */}
          <div className="bg-white p-4 rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-1">
              <FaTicket className="text-primary" />
              <span className="text-secondary">Ticket Details</span>
            </h2>
            <div className="flex justify-between items-center bg-[#ECF4F5] rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div>
                  <FaLocationDot size={30} className="text-[#FF700A]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <h3 className="font-semibold text-xl">{from}</h3>
                </div>
              </div>

              <FaArrowRight className="text-[#FF700A]" />

              <div>
                <p className="text-sm text-gray-500">To</p>
                <h3 className="font-semibold text-xl">{to}</h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-[#ECF4F5] p-3 rounded flex items-center gap-2">
                <div>
                  <FaRegCalendarAlt size={30} className="text-[#127384]" />
                </div>
                <div>
                  <p className="text-gray-500">Departure Time</p>

                  <p className="font-medium text-base text-secondary">
                    {departureDateTime}
                  </p>
                </div>
              </div>
              <div className="bg-[#ECF4F5] p-3 rounded flex items-center gap-2">
                <div>
                  <LuCalendarClock size={30} className="text-[#127384]" />
                </div>
                <div>
                  <p className="text-gray-500">Departure Time</p>
                  <p className="font-medium text-base text-secondary">
                    <CountdownTimer
                      departureDateTime={departureDateTime}
                      onExpire={() => setIsExpired(true)}
                    ></CountdownTimer>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-secondary text-xl mb-3">
                Included Perks
              </h2>
              <div className="flex flex-wrap gap-2">
                <MdAcUnit></MdAcUnit>
                {perks.map((perk, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#ECF4F5] rounded-full text-sm font-medium"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}

          {/* Operator Info */}

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Vendor Information
            </h2>

            {/* Content */}
            <div className="flex items-center justify-between gap-3">
              {/* Vendor Name */}
              <div className="flex-1 bg-[#ECF4F5] p-3 rounded flex items-center gap-1.5">
                <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                  <FaStore />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Vendor Name</p>
                  <p className="text-sm font-medium text-gray-800">
                    {vendorName}
                  </p>
                </div>
              </div>

              {/* Vendor Email */}
              <div className="flex-1 bg-[#ECF4F5] p-3 rounded flex items-center gap-1.5">
                <div className="bg-gray-100 text-gray-600 p-2 rounded-lg">
                  <MdEmail />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-sm font-medium text-gray-700">
                    {vendorEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded-xl shadow space-y-4 h-fit">
          <div>
            <p className="text-secondary text-xl capitalize font-semibold">
              Price per Ticket
            </p>
            <h2 className="text-2xl font-bold text-primary">${ticketPrice}</h2>
          </div>

          <div className="flex justify-between text-sm bg-[#ECF4F5] p-3 rounded items-center">
            <div className="flex items-center gap-1.5">
              <IoTicketOutline className="text-[#FF700A]" size={24} />
              <span className="text-base text-secondary font-semibold">
                Available Tickets
              </span>
            </div>
            <span className="text-green-600 font-bold text-base">
              {ticketQuantity}
            </span>
          </div>

          <div className="flex justify-between text-sm bg-[#ECF4F5] p-3 rounded items-center">
            <div className="flex items-center gap-1.5">
              <FaBusSimple className="text-[#850883]" size={24} />
              <span className="text-base text-secondary font-semibold">
                Transport
              </span>
            </div>
            <span className=" font-bold text-base">{transport}</span>
          </div>

          <div className="flex justify-between text-sm bg-[#ECF4F5] p-3 rounded items-center">
            <div className="flex items-center gap-1.5">
              {/* <FaBusSimple className="text-[#850883]" size={24} /> */}
              <span className="text-base text-secondary font-semibold">
                Status
              </span>
            </div>
            <span className=" font-bold text-base">{verificationStatus}</span>
          </div>

          {/* Button */}

          <button
            onClick={() => setIsOpen(true)}
            disabled={ticketQuantity === 0 || isExpired}
            className={`w-full py-2 rounded-lg text-white ${
              ticketQuantity === 0 || isExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {ticketQuantity === 0 || isExpired ? "Departed Cannot Book" : "Book Now"}
          </button>
         
          <BookingModal
            ticket={ticket}
            closeModal={() => setIsOpen(false)}
            isOpen={isOpen}
          ></BookingModal>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
