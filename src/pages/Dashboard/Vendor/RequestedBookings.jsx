import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

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

  if (isPending) return <span>Loadinges....</span>;
  return (
    <div className="p-5 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Requested Bookings ({bookingsTickets.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Ticket</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookingsTickets.map((booking, index) => (
              <tr key={booking._id} className="hover">
                <td>{index + 1}</td>

                <td className="text-sm">{booking.userEmail}</td>

                <td className="font-medium">{booking.ticketTitle}</td>

                <td>{booking.quantity}</td>

                <td className="text-green-600 font-semibold">
                  ${booking.totalPrice}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isExpired(booking.departureDateTime)
                        ? "bg-gray-200 text-gray-600"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isExpired(booking.departureDateTime)
                      ? "expired"
                      : booking.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(booking._id, "accepted")}
                    disabled={
                      booking.status === "accepted" ||
                      booking.status === "cancelled_by_admin" ||
                      booking.status === "paid" ||
                      isExpired(booking.departureDateTime)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      booking.status === "accepted" ||
                      booking.status === "cancelled_by_admin" ||
                      booking.status === "paid"  ||
                      isExpired(booking.departureDateTime)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(booking._id, "rejected")}
                    disabled={
                      booking.status === "rejected" ||
                      booking.status === "cancelled_by_admin" ||
                      booking.status === "paid" ||
                      isExpired(booking.departureDateTime)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      booking.status === "rejected" ||
                      booking.status === "cancelled_by_admin" ||
                      booking.status === "paid" ||
                      isExpired(booking.departureDateTime)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
