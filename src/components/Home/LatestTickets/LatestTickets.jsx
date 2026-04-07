import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { Link } from "react-router";

const LatestTickets = () => {

  const { data: latestTickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/latest-tickets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-center font-bold mb-6">Latest Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestTickets.map((ticket) => (
          <div key={ticket._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-primary hover:shadow-lg transition">
            {/* Image */}
            <div className="relative">
              <img
                src={ticket.ticketImage}
                alt={ticket.ticketTitle}
                className="h-48 w-full object-cover"
              />

              {/* Transport Badge */}
              <span className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {ticket.transport}
              </span>

              {/* Title */}
              <div className="absolute bottom-3 left-3 text-white">
                <h2 className="text-xl font-bold drop-shadow">
                  {ticket.ticketTitle}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* From → To */}
              <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                <div>
                  {/* <p className="text-sm text-gray-500">From</p> */}
                  <h3 className="font-semibold">{ticket.from}</h3>
                </div>

                <FaArrowRight className="text-[#ffa633]" />

                <div>
                  {/* <p className="text-sm text-gray-500">To</p> */}
                  <h3 className="font-semibold">{ticket.to}</h3>
                </div>
              </div>

              {/* Info */}
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <FaRegCalendarAlt className="text-blue-500" />
                  {ticket.departureDateTime}
                </p>

                <p className="flex items-center gap-2">
                  <LuTicket className="text-purple-500" />
                  {ticket.ticketQuantity} tickets available
                </p>
              </div>

              {/* Perks */}
              <div className="flex flex-wrap gap-2">
                {ticket.perks?.map((perk, i) => (
                  <span
                    key={i}
                    className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                  >
                    {perk}
                  </span>
                ))}
              </div>

              {/* Bottom */}
              <div className="flex justify-between items-center pt-3 border-t border-t-primary">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <h2 className="text-2xl font-bold">${ticket.ticketPrice}</h2>
                </div>

                <Link
                  to={`/tickets/${ticket._id}`}
                  className="btn relative overflow-hidden border-2 border-primary text-white bg-primary rounded-lg group"
                >
                  <span className="relative z-10 group-hover:text-primary transition flex items-center">
                    See details
                  </span>

                  <span className="absolute left-0 top-0 w-full h-0 bg-white transition-all duration-300 group-hover:h-full"></span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTickets;
