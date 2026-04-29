import React from "react";
import { LuTicket } from "react-icons/lu";
import { GoMegaphone } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AdminInfoCard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["manageTickets"],
    queryFn: async () => {
      const result = await axiosSecure.get("/manage-tickets");
      return result.data;
    },
  });

  const approvedTickets = tickets.filter(
    (ticket) => ticket.verificationStatus === "approved",
  );
  const pendingTickets = tickets.filter(
    (ticket) => ticket.verificationStatus === "pending",
  );
  const advertisedTickets = tickets.filter(
    (ticket) => ticket.isAdvertised === true,
  );

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-secondary rounded-2xl px-6 py-10 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-primary/10 text-primary p-4 rounded-full text-2xl">
            <LuTicket />
          </div>
          <div>
            <p className="text-secondary-content">Total Tickets</p>
            <h2 className="text-3xl font-bold text-primary">
              {tickets.length}
            </h2>
          </div>
        </div>

        <div className="bg-secondary rounded-2xl px-6 py-10 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-accent/10 text-accent p-4 rounded-full text-2xl">
            <LuTicket />
          </div>
          <div>
            <p className="text-secondary-content">Approved </p>
            <h2 className="text-3xl font-bold">{approvedTickets.length}</h2>
          </div>
        </div>

        <div className="bg-secondary rounded-2xl px-6 py-10 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-[#ca8a04]/10 text-[#ca8a04] p-4 rounded-full text-2xl">
            <LuTicket />
          </div>
          <div>
            <p className="text-secondary-content">Pending</p>
            <h2 className="text-3xl font-bold">{pendingTickets.length}</h2>
          </div>
        </div>

        <div className="bg-secondary rounded-2xl px-6 py-10 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-accent/10 text-accent p-4 rounded-full text-2xl">
            <GoMegaphone />
          </div>
          <div>
            <p className="text-secondary-content">Advertised</p>
            <h2 className="text-3xl font-bold">{advertisedTickets.length}/6</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoCard;
