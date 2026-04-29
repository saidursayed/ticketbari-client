import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../Shared/Container/Container";
import { GoMegaphone } from "react-icons/go";
import TicketCard from "../TicketCard/TicketCard";
import { LuSparkles } from "react-icons/lu";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const LatestTickets = () => {
  const { data: latestTickets = [], isLoading } = useQuery({
    queryKey: ["latestTickets"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/latest-tickets`,
      );
      return res.data;
    },
  });

  return (
    <div className="bg-base-100 py-16">
      <Container>
        <div>
          <div className="flex justify-between ">
            <div className="flex items-center gap-2 md:gap-3 mb-10">
              <div className="bg-accent/10 p-4 rounded-xl">
                <LuSparkles className="text-accent" size={24} />
              </div>

              <div>
                <h2 className="text-xl md:text-3xl font-bold text-primary-content">
                  Latest Tickets
                </h2>
                <p className="text-secondary-content font-medium">
                  Recently added travel options
                </p>
              </div>
            </div>

            <div>
              <Link
                to="/all-tickets"
                className="hidden md:flex items-center gap-2 px-4 py-1.5 border border-accent-content rounded-lg hover:bg-primary hover:text-secondary shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="font-medium">View All</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          {isLoading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestTickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
              ))}
            </div>
          )}
          <div className="md:hidden mt-6 flex justify-center">
            <Link
              to="/all-tickets"
              className=" flex items-center gap-2 px-4 py-1.5 border border-accent-content rounded-lg hover:bg-primary hover:text-secondary shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span className="font-medium">View All</span>
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LatestTickets;
