import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container/Container";
import TicketCard from "../../components/Home/TicketCard/TicketCard";

const AllTickets = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["allTickets"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/all-tickets");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF6E3] to-[#CEB45F]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#CEB45F] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-6 text-lg font-medium text-[#1A1A1A]">
            Loading tickets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 py-16">
      <Container>
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-content">
              All Tickets
            </h1>
            <p className="text-secondary-content mt-2">
              Browse and book from our available travel options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllTickets;
