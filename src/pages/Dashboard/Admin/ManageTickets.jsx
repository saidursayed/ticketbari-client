import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/tickets");
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

  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
        Manage Tickets
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                From
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                To
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Transport
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Vendor
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.ticketTitle}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.from}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.to}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.transport}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.ticketPrice}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.ticketQuantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {ticket.vendorName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        ticket.verificationStatus === "approved"
                          ? "bg-green-100 text-green-600"
                          : ticket.verificationStatus === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {ticket.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(ticket._id, "approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(ticket._id, "rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
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
    </div>
  );
};

export default ManageTickets;
