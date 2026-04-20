import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Container from "../../Shared/Container/Container";
import TicketCard from "../TicketCard/TicketCard";
import { GoMegaphone } from "react-icons/go";

const AdvertiseTickets = () => {
  const { data: advertiseTickets = [], isLoading } = useQuery({
    queryKey: ["advertiseTickets"],
    queryFn: async () => {
      const result = await axios.get(`http://localhost:3000/advertiseTickets`);
      return result.data;
    },
  });

  if (isLoading) return <span>Loading...</span>;
  return (
    <div className="bg-info-content py-16">
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
            {advertiseTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdvertiseTickets;
