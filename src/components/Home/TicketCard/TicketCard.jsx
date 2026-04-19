import { MapPin } from "lucide-react";
import React from "react";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { IoBoatOutline } from "react-icons/io5";
import { LuBus, LuClock, LuPlane, LuTicket } from "react-icons/lu";
import { PiTrain } from "react-icons/pi";
import { Link } from "react-router";

const TicketCard = ({ ticket }) => {
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



  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden border border-accent-content flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={ticket.ticketImage}
          alt={ticket.ticketTitle}
          className="h-52 w-full object-cover transform group-hover:scale-104 transition-transform duration-500 ease-out"
        />

        {/* Transport Badge */}
        <div className="absolute top-3 left-3 z-10">
          {ticket.transport === "Bus" && (
            <div className="flex items-center gap-2 bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <LuBus size={16} />
              <span className="text-sm font-medium">Bus</span>
            </div>
          )}

          {ticket.transport === "Train" && (
            <div className="flex items-center gap-2 bg-[#00bb87]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <PiTrain size={16} />
              <span className="text-sm font-medium">Train</span>
            </div>
          )}

          {ticket.transport === "Launch" && (
            <div className="flex items-center gap-2 bg-[#ec5a00]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <IoBoatOutline size={16} />
              <span className="text-sm font-medium">Launch</span>
            </div>
          )}

          {ticket.transport === "Plane" && (
            <div className="flex items-center gap-2 bg-[#9260da]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <LuPlane size={16} />
              <span className="text-sm font-medium">Plane</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 z-10 text-white">
          <h2 className="text-xl font-bold drop-shadow-lg">
            {ticket.ticketTitle}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col grow">
        <div className="p-4 space-y-4">
          {/* Route */}
          <div className="flex justify-between items-center bg-base-300 rounded-xl p-3 group-hover:bg-primary/8 transition">
            <h3 className="font-semibold">{ticket.from}</h3>
            <FaArrowRight className="text-primary" />
            <h3 className="font-semibold">{ticket.to}</h3>
          </div>

         

          {/* Info */}
          <div className="text-sm text-secondary-content space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <FaRegCalendarAlt size={18} className="text-primary"></FaRegCalendarAlt>
                {date}
              </div>
              <div className="flex items-center gap-1">
                <LuClock  size={18} className="text-primary"></LuClock>
                {time}
              </div>
            </div>

            <p className="flex items-center gap-2">
              <LuTicket size={18} className="text-[#9260da]" />
              {ticket.ticketQuantity} tickets available
            </p>
          </div>

          {/* Perks */}
          <div className="flex flex-wrap gap-2">
            {ticket.perks?.map((perk, i) => (
              <span
                key={i}
                className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full hover:bg-primary hover:text-white transition"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-auto bg-base-300">
          <div className="p-4 flex justify-between items-center border-t border-primary/30">
            <div>
              <p className="text-xs text-secondary-content font-semibold">
                Price per ticket
              </p>
              <h2 className="text-2xl font-bold text-primary">
                ${ticket.ticketPrice}
              </h2>
            </div>

            <Link
              to={`/tickets/${ticket._id}`}
              className="btn relative overflow-hidden border-2 border-primary text-white bg-primary rounded-lg group/btn"
            >
              <span className="relative z-10 group-hover/btn:text-primary transition flex items-center">
                See details
              </span>

              <span className="absolute left-0 top-0 w-full h-0 bg-white transition-all duration-300 group-hover/btn:h-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
