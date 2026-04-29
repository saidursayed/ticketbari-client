import { LuReceipt, LuTicketCheck } from "react-icons/lu";
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

      {tickets.length === 0 ? (
        <div className="bg-secondary rounded-2xl shadow-md p-6 border border-accent-content">
          <div className="flex items-center justify-center py-16 ">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-base-200 p-5 rounded-full">
                  <LuTicketCheck className="w-8 h-8 text-secondary-content" />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-primary-content">
                No tickets added yet  
              </h2>

              <p className="text-secondary-content mt-2">
                Start by adding your first ticket to manage your listings here.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <AddedTicketCard
              key={ticket._id}
              ticket={ticket}
              refetch={refetch}
            ></AddedTicketCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedTickets;
