import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { Link } from "react-router";
import Container from "../../Shared/Container/Container";
import { GoMegaphone } from "react-icons/go";

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
    <div className="bg-base-200 py-16">
      <Container>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary/10 p-3 rounded-xl">
              <GoMegaphone className="text-primary" size={24} />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-content">
                Featured Tickets
              </h2>
              <p className="text-secondary-content font-medium">
                Handpicked deals for your next adventure
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {latestTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-primary hover:shadow-lg transition flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={ticket.ticketImage}
                    alt={ticket.ticketTitle}
                    className="h-48 w-full object-cover"
                  />

                  <span className="absolute top-3 right-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {ticket.transport}
                  </span>

                  <div className="absolute bottom-3 left-3 text-white">
                    <h2 className="text-xl font-bold drop-shadow">
                      {ticket.ticketTitle}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col grow">
                  <div className="p-4 space-y-3">
                    {/* From → To */}
                    <div className="flex justify-between items-center bg-base-300 rounded-lg p-3">
                      <h3 className="font-semibold">{ticket.from}</h3>
                      <FaArrowRight className="text-primary" />
                      <h3 className="font-semibold">{ticket.to}</h3>
                    </div>

                    {/* Info */}
                    <div className="text-base text-secondary-content space-y-1">
                      <p className="flex items-center gap-2">
                        <FaRegCalendarAlt size={18} className="text-blue-500" />
                        {ticket.departureDateTime}
                      </p>

                      <p className="flex items-center gap-2">
                        <LuTicket size={18} className="text-purple-500" />
                        {ticket.ticketQuantity} tickets available
                      </p>
                    </div>

                    {/* Perks */}
                    <div className="flex flex-wrap gap-2">
                      {ticket.perks?.map((perk, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 font-medium text-sm px-2 py-1 rounded-full"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom (Always Stick to Bottom) */}
                  <div className="mt-auto bg-base-300">
                    <div className="p-4 flex justify-between items-center border-t border-t-primary">
                      <div>
                        <p className="text-sm text-secondary-content font-semibold">
                          Price per ticket
                        </p>
                        <h2 className="text-2xl font-bold text-primary">
                          ${ticket.ticketPrice}
                        </h2>
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
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LatestTickets;
