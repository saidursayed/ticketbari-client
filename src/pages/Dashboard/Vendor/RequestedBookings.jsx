import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { LuTicket } from "react-icons/lu";
import { ClipboardList } from "lucide-react";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

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
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status} this ticket?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "accepted" ? "#16a34a" : "#dc2626",
      cancelButtonColor: "#6c757d",
      confirmButtonText: `Yes, ${status}`,
    });

    if (confirm.isConfirmed) {
      await mutateAsync({ id, status });
      refetch();
    }
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

      <div className=" bg-secondary rounded-2xl shadow-md p-6 border border-accent-content">
        {bookingsTickets.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-base-200 p-5 rounded-full">
                  <ClipboardList className="w-8 h-8 text-secondary-content" />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-primary-content">
                No booking requests
              </h2>

              <p className="text-secondary-content mt-2">
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
                      className="bg-secondary border border-accent-content rounded-2xl p-4 shadow-sm space-y-3"
                    >
                      {/* Top Row */}
                      <div className="flex flex-wrap gap-2 justify-between items-start">
                        <div>
                          <p className="font-semibold text-primary-content">
                            {booking.customer_Name} Hode Johone
                          </p>
                          <p className="text-xs text-secondary-content">
                            {booking.userEmail}
                          </p>
                        </div>

                        {/* Status */}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            isExpired(booking.departureDateTime)
                              ? "bg-[#4b5563]/10 text-secondary-content border border-[#4b5563]/40"
                              : booking.status === "pending"
                                ? "bg-[#ca8a04]/10 text-yellow-600 border border-[#ca8a04]/40"
                                : booking.status === "accepted"
                                  ? "bg-[#16A34A]/10 text-green-600 border border-[#16A34A]/40"
                                  : booking.status === "paid"
                                    ? "bg-[#16A34A]/10 text-green-600 border border-[#16A34A]/40"
                                    : "bg-[#dc2626]/10 text-red-600 border border-[#dc2626]/40"
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
                        <p className="text-xs text-secondary-content">Ticket</p>
                        <p className="font-medium">{booking.ticketTitle}</p>
                      </div>

                      {/* Quantity + Price */}
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-secondary-content">
                            Quantity
                          </p>
                          <p className="font-semibold">{booking.quantity}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-secondary-content">
                            Total Price
                          </p>
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
                              className="flex-1 flex justify-center items-center gap-1 px-3 py-1 rounded-full border border-green-500 text-green-600 hover:bg-[#16A34A]/20 transition cursor-pointer"
                            >
                              <FaCheckCircle /> Accept
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(booking._id, "rejected")
                              }
                              className="flex-1  flex justify-center items-center gap-2 px-3 py-1 rounded-full border border-red-500 text-red-600 hover:bg-[#dc2626]/20 transition cursor-pointer"
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
                      <th>Vendor</th>
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
                        className="text-sm border-b border-accent-content last:border-b-0 "
                      >
                        <td className="text-sm">
                          <div>
                            <p className="font-medium">
                              {booking.userName}
                            </p>
                            <p className="text-sm text-secondary-content">
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
                                ? "bg-[#4b5563]/10 text-secondary-content border border-[#4b5563]/40"
                                : booking.status === "pending"
                                  ? "bg-[#ca8a04]/10 text-[#ca8a04] border border-[#ca8a04]/40"
                                  : booking.status === "accepted"
                                    ? "bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/40"
                                    : booking.status === "paid"
                                      ? "bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/40"
                                      : "bg-[#dc2626]/10 text-[#dc2626] border border-[#dc2626]/40"
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
                                className="flex items-center gap-1 px-3 py-1 rounded-full border border-green-500 text-green-600 hover:bg-[#16A34A]/20 transition cursor-pointer"
                              >
                                <FaCheckCircle /> Accept
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusUpdate(booking._id, "rejected")
                                }
                                className="flex items-center gap-2 px-3 py-1 rounded-full border border-red-500 text-red-600 hover:bg-[#dc2626]/20 transition cursor-pointer"
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
