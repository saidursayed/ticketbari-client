import { FaRegCalendarAlt } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const AddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["tickets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tickets/vendor/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });



  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-lg transition relative"
        >
          {/* Ticket Image */}
          <div className="relative">
            <img
              src={ticket.ticketImage}
              alt={ticket.ticketTitle}
              className="h-48 w-full object-cover"
            />

            {/* ✅ Status Badge */}
            <span
              className={`absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-sm font-semibold ${
                ticket.verificationStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : ticket.verificationStatus === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {ticket.verificationStatus}
            </span>

            {/* Transport Badge */}
            <span className="absolute top-3 right-3 z-20 bg-[#CEB45F]/20 text-[#CEB45F] px-3 py-1 rounded-full text-sm font-medium">
              {ticket.transport}
            </span>
          </div>

          {/* Ticket Info */}
          <div className="p-4 space-y-3">
            {/* From → To */}
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
              <h3 className="font-semibold">{ticket.from}</h3>
              <FaArrowRight className="text-[#CEB45F]" />
              <h3 className="font-semibold">{ticket.to}</h3>
            </div>

            {/* Departure & Quantity */}
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-[#CEB45F]" />
                {ticket.departureDateTime}
              </p>
              <p className="flex items-center gap-2">
                <LuTicket className="text-[#CEB45F]" />
                {ticket.ticketQuantity} tickets available
              </p>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map((perk, i) => (
                <span
                  key={i}
                  className="text-xs bg-[#CEB45F]/20 text-[#CEB45F] px-2 py-1 rounded-full"
                >
                  {perk}
                </span>
              ))}
            </div>

            {/* Bottom: Price & Actions */}
            <div className="flex justify-between items-center pt-3 border-t border-[#CEB45F]">
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <h2 className="text-2xl font-bold">${ticket.ticketPrice}</h2>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/tickets/update/${ticket._id}`}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    ticket.verificationStatus === "rejected"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Update
                </Link>

                <button
                  disabled={ticket.verificationStatus === "rejected"}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${
                    ticket.verificationStatus === "rejected"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddedTickets;
