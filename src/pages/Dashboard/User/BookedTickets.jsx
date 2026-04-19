import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookedTicketCard from "../../../components/Dashboard/BookedTicketCard/BookedTicketCard";

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

  if (isLoading) return <span>Loading...</span>;

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((bookingTicket) => (
          <BookedTicketCard
            key={bookingTicket._id}
            bookingTicket={bookingTicket}
          ></BookedTicketCard>
        ))}
      </div>
    </div>
  );
};

export default BookedTickets;
