import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { LuTicket } from "react-icons/lu";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manageTickets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/manage-tickets");
      return result.data;
    },
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      await axiosSecure.patch(`/tickets/status/${id}`, { status });
      toast.success(`Ticket ${status}`);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isExpired = (departureDateTime) => {
    return new Date(departureDateTime) < new Date();
  };

  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          Manage Tickets
        </h1>
        <p className="text-primary-content/70 mt-1">
          Review and approve vendor ticket listings
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <LuTicket className="text-lg" />
          <h2 className="text-xl font-semibold">
            All Tickets ({tickets.length})
          </h2>
        </div>
        
        <div className="block lg:hidden space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3"
              >
                {/* Title + Status */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-primary-content">
                      {ticket.ticketTitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {ticket.from} → {ticket.to}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 text-xs rounded-full border font-medium ${
                      isExpired(ticket.departureDateTime)
                        ? "bg-gray-50 text-gray-600 border-gray-200"
                        : ticket.verificationStatus === "approved"
                          ? "bg-[#00bb87]/10 text-[#00bb87] border-[#00bb87]/50"
                          : ticket.verificationStatus === "rejected"
                            ? "bg-red-50 text-red-500 border-red-400"
                            : "bg-yellow-50 text-yellow-500 border-yellow-400"
                    }`}
                  >
                    {isExpired(ticket.departureDateTime)
                      ? "expired"
                      : ticket.verificationStatus}
                  </span>
                </div>

                {/* Transport + Price */}
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Transport</p>
                    <p className="font-medium">{ticket.transport}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="font-semibold text-primary">
                      ৳{ticket.ticketPrice}
                    </p>
                  </div>
                </div>

                {/* Vendor */}
                <div>
                  <p className="text-xs text-gray-500">Vendor</p>
                  <p className="font-medium">{ticket.vendorName}</p>
                  <p className="text-xs text-gray-400">{ticket.vendorEmail}</p>
                </div>

                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 border-t border-dashed border-primary"></div>
                  <span className="text-primary">
                    <LuTicket size={24}></LuTicket>
                  </span>
                  <div className="flex-1 border-t border-dashed border-primary"></div>
                </div>

                {/* Actions */}
                <div className=" flex justify-center items-center gap-2">
                  {isExpired(ticket.departureDateTime) ? (
                    <span className="text-sm text-gray-500">
                      Booking Expired
                    </span>
                  ) : ticket.verificationStatus === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(ticket._id, "approved")
                        }
                        className="flex justify-center items-center gap-1 px-3 py-1 rounded-2xl border border-accent-content text-green-600 hover:bg-green-50 transition cursor-pointer font-medium"
                      >
                        <FiCheckCircle />
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(ticket._id, "rejected")
                        }
                        className="flex justify-center items-center gap-1 px-3 py-1 rounded-2xl border border-accent-content text-red-600 hover:bg-red-50 transition cursor-pointer font-medium"
                      >
                        <FiXCircle />
                        Reject
                      </button>
                    </>
                  ) : ticket.verificationStatus === "approved" ? (
                    <span className="text-sm text-green-600 font-medium">
                      Approved
                    </span>
                  ) : ticket.verificationStatus === "rejected" ? (
                    <span className="text-sm text-red-500 font-medium">
                      Rejected
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      {ticket.verificationStatus}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto hidden lg:block">
          <table className="w-full table  ">
            <thead className=" text-secondary-content text-sm ">
              <tr className="text-sm font-semibold">
                <th>Title</th>
                <th>Route</th>

                <th>Transport</th>
                <th>Price</th>

                <th>Vendor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td>{ticket.ticketTitle}</td>
                    <td>
                      {ticket.from} to {ticket.to}
                    </td>

                    <td>{ticket.transport}</td>
                    <td className="text-primary font-semibold">
                      {ticket.ticketPrice}
                    </td>

                    <td>
                      <div>
                        <p className="font-medium">{ticket.vendorName}</p>
                        <p className="text-sm text-gray-500 max-w-45 wrap-break-word">
                          {ticket.vendorEmail}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full font-medium border text-sm capitalize ${
                          isExpired(ticket.departureDateTime)
                            ? "bg-gray-50 text-gray-600 border-gray-200"
                            : ticket.verificationStatus === "approved"
                              ? "bg-[#00bb87]/10 text-[#00bb87] border-[#00bb87]/50"
                              : ticket.verificationStatus === "rejected"
                                ? "bg-red-50 text-red-500 border-red-400"
                                : "bg-yellow-50 text-yellow-500 border-yellow-400"
                        }`}
                      >
                        {isExpired(ticket.departureDateTime)
                          ? "expired"
                          : ticket.verificationStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {isExpired(ticket.departureDateTime) ? (
                          <span className="text-sm text-gray-500">
                            Booking Expired
                          </span>
                        ) : ticket.verificationStatus === "pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(ticket._id, "approved")
                              }
                              className=" flex justify-center items-center gap-1 px-3 py-1 rounded-2xl border border-accent-content text-green-600 hover:bg-green-50 transition cursor-pointer font-medium"
                            >
                              <FiCheckCircle />
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(ticket._id, "rejected")
                              }
                              className=" flex justify-center items-center gap-1 px-3 py-1 rounded-2xl border border-accent-content text-red-600 hover:bg-red-50 transition cursor-pointer font-medium"
                            >
                              <FiXCircle />
                              Reject
                            </button>
                          </>
                        ) : ticket.verificationStatus === "approved" ? (
                          <span className="text-sm text-green-600 font-medium">
                            Approved
                          </span>
                        ) : ticket.verificationStatus === "rejected" ? (
                          <span className="text-sm text-red-500 font-medium">
                            Rejected
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {ticket.verificationStatus}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-6 text-center text-gray-500">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ManageTickets;
