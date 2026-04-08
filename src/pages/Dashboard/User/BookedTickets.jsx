import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import CountdownTimer from "../../../components/Shared/CountdownTimer/CountdownTimer";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // key = booking._id, value = true/false
  const [isExpired, setIsExpired] = useState({});

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
      return res.data;
    },
  });

  const handlePayment = (booking) =>{
    console.log(booking)
  }

  if (isLoading) return <span>Loading...</span>;

  const checkExpired = (departureDateTime) =>
    new Date() > new Date(departureDateTime);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-6">My Booked Tickets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {bookings.map((booking) => {
          const expired =
            isExpired[booking._id] || checkExpired(booking.departureDateTime);

          return (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md border p-4"
            >
              {/* Image */}
              <img
                src={booking.ticketImage}
                alt={booking.ticketTitle}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />

              {/* Title */}
              <h3 className="text-lg font-semibold">{booking.ticketTitle}</h3>

              {/* Route */}
              <p className="text-sm text-gray-500">
                {booking.from} → {booking.to}
              </p>

              {/* Quantity */}
              <p className="text-sm mt-1">Quantity: {booking.quantity}</p>

              {/* Price */}
              <p className="text-sm">Total: ৳{booking.totalPrice}</p>

              {/* Departure */}
              <p className="text-sm">
                Departure:{" "}
                {new Date(booking.departureDateTime).toLocaleString()}
              </p>

              {/* Status */}
              <p
                className={`mt-2 font-semibold ${
                  expired
                    ? "text-gray-500"
                    : booking.status === "pending"
                      ? "text-yellow-500"
                      : booking.status === "accepted"
                        ? "text-blue-500"
                        : "text-red-500"
                }`}
              >
                Status: {expired ? "expired" : booking.status}
              </p>

              {/* Countdown */}

              <p className="text-sm mt-2">
                ⏳
                <CountdownTimer
                  departureDateTime={booking.departureDateTime}
                  onExpire={() =>
                    setIsExpired((prev) => ({ ...prev, [booking._id]: true }))
                  }
                />
              </p>

              {/* Pay Button */}
              {booking.status === "accepted" && !expired && (
                <button onClick={()=>handlePayment(booking)} className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Pay Now
                </button>
              )}

              {/* Expired Message */}
              {expired && (
                <p className="text-red-500 text-sm mt-2">
                  Payment unavailable (Expired)
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookedTickets;
