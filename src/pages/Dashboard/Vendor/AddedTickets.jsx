import AddedTicketCard from "../../../components/Dashboard/AddedTicketCard/AddedTicketCard";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AddedTickets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tickets", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/tickets/vendor/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          My Added Tickets
        </h1>
        <p className="text-primary-content/70 mt-1">
          Manage your ticket listings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <AddedTicketCard
            key={ticket._id}
            ticket={ticket}
            refetch={refetch}
          ></AddedTicketCard>
        ))}
      </div>
    </div>
  );
};

export default AddedTickets;
