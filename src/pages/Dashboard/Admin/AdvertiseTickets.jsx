import { useQuery } from "@tanstack/react-query";
import { GoMegaphone } from "react-icons/go";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: approvedTickets = [], refetch } = useQuery({
    queryKey: ["approvedTicket"],
    queryFn: async () => {
      const result = await axiosSecure.get("/tickets/approved");

      return result.data;
    },
  });

  const handleAdvertiseTicket = async (ticket) => {
    const advertisedCount = approvedTickets.filter(
      (t) => t.isAdvertised,
    ).length;
    if (!ticket.isAdvertised && advertisedCount >= 6) {
      toast.error("Maximum 6 tickets allowed");
      return;
    }

    const { data } = await axiosSecure.patch(
      `/tickets/advertise/${ticket._id}`,
      {
        isAdvertised: !ticket.isAdvertised,
      },
    );

    if (!ticket.isAdvertised) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    refetch();
  };

  const advertisedCount = approvedTickets.filter((t) => t.isAdvertised).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          Advertise Tickets
        </h1>
        <p className="text-primary-content/70 mt-1">
          Feature tickets on the homepage advertisement section
        </p>
      </div>

      <div className="flex items-center gap-4 px-6 py-10 bg-white rounded-2xl shadow-sm border border-accent-content mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#00bb87]/10 text-[#00bb87] text-xl font-bold">
          <GoMegaphone />
        </div>
        <div>
          <p className="text-gray-500">Currently Advertised</p>
          <h2 className="text-2xl font-bold">
            {advertisedCount} / 6{" "}
            <span className="text-gray-500 text-sm">slots used</span>
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-accent-content">
        <div className="flex items-center gap-2 mb-6">
          <GoMegaphone className="text-lg" />
          <h2 className="text-xl font-semibold">
            Approved Tickets ({approvedTickets.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table">
            {/* Head */}
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">Ticket</th>
                <th>Type</th>
                <th>Route</th>
                <th>Price</th>
                <th>Vendor</th>
                <th>Advertise</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {approvedTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.ticketTitle}</td>
                  <td>{ticket.transport}</td>
                  <td>
                    {ticket.from} to {ticket.to}
                  </td>
                  <td className="text-primary font-semibold">
                    ${ticket.ticketPrice}
                  </td>
                  <td>
                    <div>
                      <p className="font-medium">{ticket.vendorName}</p>
                      <p className="text-sm text-gray-500 max-w-45 wrap-break-word">
                        {ticket.vendorEmail}
                      </p>
                    </div>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ticket.isAdvertised || false}
                      onChange={() => handleAdvertiseTicket(ticket)}
                      defaultChecked
                      className="toggle toggle-primary"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseTickets;
