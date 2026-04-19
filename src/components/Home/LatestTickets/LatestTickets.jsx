import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../Shared/Container/Container";
import { GoMegaphone } from "react-icons/go";
import TicketCard from "../TicketCard/TicketCard";

const LatestTickets = () => {
  const { data: latestTickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/latest-tickets");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="bg-base-200 py-16">
      <Container>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-primary/10 p-3 rounded-xl">
              <GoMegaphone className="text-primary" size={24} />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-content">
                Featured Tickets
              </h2>
              <p className="text-secondary-content font-medium">
                Handpicked deals for your next adventure
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LatestTickets;
