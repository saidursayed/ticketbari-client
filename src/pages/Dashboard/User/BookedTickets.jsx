import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookedTicketCard from "../../../components/Dashboard/BookedTicketCard/BookedTicketCard";
import { LuTicketCheck } from "react-icons/lu";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const BookedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          My Booked Tickets
        </h1>
        <p className="text-primary-content/70 mt-1">
          View and manage your ticket bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-accent-content">
          <div className="flex items-center justify-center py-16 ">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-200 p-5 rounded-full">
                  <LuTicketCheck className="w-8 h-8 text-gray-500" />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                No bookings yet
              </h2>

              <p className="text-gray-500 mt-2">
                Start browsing tickets and make your first booking
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((bookingTicket) => (
            <BookedTicketCard
              key={bookingTicket._id}
              bookingTicket={bookingTicket}
            ></BookedTicketCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedTickets;
