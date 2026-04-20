import { useQuery } from "@tanstack/react-query";
import { GoMegaphone } from "react-icons/go";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { LuTicket } from "react-icons/lu";

const AdvertiseTicketsAdmin = () => {
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
            {advertisedCount} / 6
            <span className="text-gray-500 text-sm"> slots used</span>
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

        <div className="block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedTickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-2xl shadow-sm border border-accent-content p-4 flex flex-col gap-2"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    {ticket.isAdvertised && (
                      <span className="bg-[#00bb87]/10 text-[#00bb87] px-2 py-0.5 rounded-2xl font-semibold border border-[#00bb87]/30 text-xs">
                        Featured
                      </span>
                    )}
                    {!ticket.isAdvertised && advertisedCount >= 6 && (
                      <span className="text-red-500 text-sm font-medium">
                        Max 6 reached
                      </span>
                    )}
                    <h2 className="font-semibold text-lg mt-1 text-primary-content">
                      {ticket.ticketTitle}
                    </h2>
                  </div>

                  <input
                    type="checkbox"
                    checked={ticket.isAdvertised || false}
                    onChange={() => handleAdvertiseTicket(ticket)}
                    disabled={advertisedCount >= 6 && !ticket.isAdvertised}
                    className="toggle toggle-primary"
                  />
                </div>

                {/* Info */}
                <div className="text-sm text-secondary-content space-y-1">
                  <p>
                    <span className="font-medium text-primary-content">
                      Type:{" "}
                    </span>
                    {ticket.transport}
                  </p>
                  <p>
                    <span className="font-medium text-primary-content">
                      Route:{" "}
                    </span>
                    {ticket.from} → {ticket.to}
                  </p>
                  <p>
                    <span className="font-medium text-primary-content">
                      Price:{" "}
                    </span>
                    <span className="text-primary font-semibold">
                      ${ticket.ticketPrice}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 my-0">
                  <div className="flex-1 border-t border-dashed border-primary"></div>
                  <span className="text-primary">
                    <LuTicket size={24}></LuTicket>
                  </span>
                  <div className="flex-1 border-t border-dashed border-primary"></div>
                </div>

                {/* Vendor */}
                <div className="flex justify-between items-start gap-3">
                  <span className=" font-medium text-gray-500">Vendor</span>

                  <div className="text-right">
                    <p className="font-medium">{ticket.vendorName}</p>
                    <p className="text-sm text-secondary-content wrap-break-word">
                      {ticket.vendorEmail}
                    </p>
                  </div>
                </div>

                {/* Warning */}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto hidden lg:block">
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
                  <td className="flex items-center gap-2">
                    <div>
                      {ticket.isAdvertised && (
                        <span className="bg-[#00bb87]/10 text-[#00bb87] px-2 py-0.5 rounded-2xl font-semibold border border-[#00bb87]/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <span> {ticket.ticketTitle}</span>
                  </td>
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
                  <td className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={ticket.isAdvertised || false}
                      onChange={() => handleAdvertiseTicket(ticket)}
                      disabled={advertisedCount >= 6 && !ticket.isAdvertised}
                      className="toggle toggle-primary"
                    />

                    <div>
                      {!ticket.isAdvertised && advertisedCount >= 6 && (
                        <span className="text-red-500 font-medium text-sm">
                          Max 6 reached
                        </span>
                      )}
                    </div>
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

export default AdvertiseTicketsAdmin;
