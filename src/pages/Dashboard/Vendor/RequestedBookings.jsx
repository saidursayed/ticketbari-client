import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { ClipboardList } from "lucide-react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const RequestedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: bookingsTickets = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["bookingsTickets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/bookings/vendor/${user?.email}`);
      return result.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/bookings/status/${id}`, { status });
      return res.data;
    },

    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  const handleStatusUpdate = async (id, status) => {
    await mutateAsync({ id, status });
    refetch();
  };

  const isExpired = (departureDateTime) => {
    return new Date(departureDateTime) < new Date();
  };

  if (isPending) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          Requested Bookings
        </h1>
        <p className="text-primary-content/70 mt-1">
          Manage booking requests from customers
        </p>
      </div>

      <div className=" bg-white rounded-2xl shadow-md p-6 border border-accent-content">
        {bookingsTickets.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-5 rounded-full">
                  <ClipboardList className="w-8 h-8 text-gray-500" />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                No booking requests
              </h2>

              <p className="text-gray-500 mt-2">
                Booking requests from customers will appear here
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FaClipboardList className="text-lg" />
              <h2 className="text-xl font-semibold">
                All Booking Requests ({bookingsTickets.length})
              </h2>
            </div>

            <div>
              {/* card */}
              <div className="block lg:hidden space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookingsTickets.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3"
                    >
                      {/* Top Row */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-primary-content">
                            {booking.customer_Name} Hode Johone
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.userEmail}
                          </p>
                        </div>

                        {/* Status */}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            isExpired(booking.departureDateTime)
                              ? "bg-gray-50 text-gray-600 border border-gray-200"
                              : booking.status === "pending"
                                ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                : booking.status === "accepted"
                                  ? "bg-green-50 text-green-600 border border-green-200"
                                  : booking.status === "paid"
                                    ? "bg-green-50 text-green-600 border border-green-200"
                                    : "bg-red-50 text-red-600 border border-red-200"
                          }`}
                        >
                          {isExpired(booking.departureDateTime)
                            ? "expired"
                            : booking.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 my-3">
                        <div className="flex-1 border-t border-dashed border-primary"></div>
                        <span className="text-primary">
                          <LuTicket size={24}></LuTicket>
                        </span>
                        <div className="flex-1 border-t border-dashed border-primary"></div>
                      </div>

                      {/* Ticket */}
                      <div>
                        <p className="text-xs text-gray-500">Ticket</p>
                        <p className="font-medium">{booking.ticketTitle}</p>
                      </div>

                      {/* Quantity + Price */}
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="font-semibold">{booking.quantity}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total Price</p>
                          <p className="font-bold text-primary">
                            ${booking.totalPrice}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-dashed border-primary text-center">
                        {isExpired(booking.departureDateTime) ? (
                          <span className="text-sm">Booking Expired</span>
                        ) : booking.status === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(booking._id, "accepted")
                              }
                              className="flex-1 flex justify-center items-center gap-1 px-3 py-1 rounded-full border border-green-500 text-green-600 hover:bg-green-50 transition"
                            >
                              <FaCheckCircle /> Accept
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(booking._id, "rejected")
                              }
                              className="flex-1  flex justify-center items-center gap-2 px-3 py-1 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition"
                            >
                              <FaTimesCircle /> Reject
                            </button>
                          </div>
                        ) : booking.status === "accepted" ? (
                          <span className="text-sm">Waiting for payment</span>
                        ) : booking.status === "paid" ? (
                          <span className="text-sm">Payment received</span>
                        ) : booking.status === "rejected" ? (
                          <span className="text-sm">Booking Rejected</span>
                        ) : (
                          <span className="text-sm">{booking.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="table w-full">
                  <thead className=" text-secondary-content text-sm ">
                    <tr>
                      <th>Customer</th>
                      <th>Ticket</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookingsTickets.map((booking) => (
                      <tr
                        key={booking._id}
                        className="text-sm border-b border-accent-content last:border-b-0 hover:bg-info-content transition-colors duration-200 ease-in-out "
                      >
                        <td className="text-sm">
                          <div>
                            <p className="font-medium">
                              {booking.customer_Name} Hode Jhone
                            </p>
                            <p className="text-sm text-gray-500">
                              {booking.userEmail}
                            </p>
                          </div>
                        </td>

                        <td className="font-medium">{booking.ticketTitle}</td>

                        <td>{booking.quantity}</td>

                        <td className="text-primary font-semibold">
                          ${booking.totalPrice}
                        </td>

                        {/* Status */}
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              isExpired(booking.departureDateTime)
                                ? "bg-gray-50 text-gray-600 border border-gray-200"
                                : booking.status === "pending"
                                  ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                                  : booking.status === "accepted"
                                    ? "bg-green-50 text-green-600 border border-green-200"
                                    : booking.status === "paid"
                                      ? "bg-green-50 text-green-600 border border-green-200"
                                      : "bg-red-50 text-red-600 border border-red-200"
                            }`}
                          >
                            {isExpired(booking.departureDateTime)
                              ? "expired"
                              : booking.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="space-x-2">
                          {isExpired(booking.departureDateTime) ? (
                            <span>Booking Expired</span>
                          ) : booking.status === "pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleStatusUpdate(booking._id, "accepted")
                                }
                                className="flex items-center gap-1 px-3 py-1 rounded-full border border-green-500 text-green-600 hover:bg-green-50 transition cursor-pointer"
                              >
                                <FaCheckCircle /> Accept
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusUpdate(booking._id, "rejected")
                                }
                                className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500 text-red-600 hover:bg-red-50 transition cursor-pointer"
                              >
                                <FaTimesCircle /> Reject
                              </button>
                            </div>
                          ) : booking.status === "accepted" ? (
                            <span>Waiting for payment</span>
                          ) : booking.status === "paid" ? (
                            <span>Payment received</span>
                          ) : booking.status === "rejected" ? (
                            <span>Booking Rejected</span>
                          ) : (
                            <span>{booking.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestedBookings;
