import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import CountdownTimer from "../../../components/Shared/CountdownTimer/CountdownTimer";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Container from "../../../components/Shared/Container/Container";

const BookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isExpired, setIsExpired] = useState({});

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
      return res.data;
    },
  });

  const handlePayment = async (booking) => {
    const paymentInfo = {
      bookingId: booking._id,
      ticketId: booking.ticketId,
      ticketTitle: booking.ticketTitle,
      ticketImage: booking.ticketImage,
      userEmail: booking.userEmail,
      vendorEmail: booking.vendorEmail,
      quantity: booking.quantity,
      unitPrice: booking.unitPrice,
      totalPrice: booking.totalPrice,
      from: booking.from,
      to: booking.to,
      departureDateTime: booking.departureDateTime,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo,
    );
    // window.location.href = res.data.url;
    window.location.assign(res.data.url);
  };

  if (isLoading) return <span>Loading...</span>;

  const checkExpired = (departureDateTime) =>
    new Date() > new Date(departureDateTime);

  return (
    <div className=" bg-[#F1F6F5] rounded-xl">
      <Container>
        <div className="py-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#002C3F]">
              My Booked Tickets
            </h2>
            <p className="text-[#002C3F]/80 font-medium mt-2">
              Track your bookings, payment status, and departure schedules
              easily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookings.map((booking) => {
              const expired =
                isExpired[booking._id] ||
                checkExpired(booking.departureDateTime);

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-md border p-4"
                >
                  {/* Image */}
                  <img src={booking.ticketImage || "/placeholder.png"} />

                  {/* Title */}
                  <h3 className="text-lg font-semibold">
                    {booking.ticketTitle}
                  </h3>

                  {/* Route */}
                  <p className="text-sm text-gray-500">
                    {booking.from} → {booking.to}
                  </p>

                  {/* Quantity */}
                  <p className="text-sm mt-1">
                    Quantity: {booking.quantity ?? 0}
                  </p>

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
                        setIsExpired((prev) => ({
                          ...prev,
                          [booking._id]: true,
                        }))
                      }
                    />
                  </p>

                  {/* Pay Button */}
                  {booking.status === "accepted" && !expired && (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
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
      </Container>
    </div>
  );
};

export default BookedTickets;
