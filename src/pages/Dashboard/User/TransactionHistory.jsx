import React from "react";
import { CreditCard, ReceiptText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { LuReceipt, LuTicket } from "react-icons/lu";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/payments?email=${user.email}`);
      return result.data;
    },
  });
  console.log(payments);
  const totalAmount = payments.reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

  if (isLoading) return <span>Loading...</span>;
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          Transaction History
        </h1>
        <p className="text-primary-content/70 mt-1">
          View all your payment transactions
        </p>
      </div>

      <div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Total Spent Card */}
          <div className="bg-white border border-accent-content rounded-2xl p-8 flex items-center gap-5 shadow-sm">
            <div className="bg-primary/10 p-4 rounded-xl text-primary">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <p className="text-secondary-content text-sm">Total Spent</p>
              <p className="text-3xl font-bold text-primary/90">
                ৳{totalAmount}
              </p>
            </div>
          </div>

          {/* Total Transactions Card */}
          <div className="bg-white border border-accent-content rounded-2xl p-8 flex items-center gap-5 shadow-sm">
            <div className="bg-[#00bb87]/10 p-4 rounded-xl text-[#00bb87]">
              <LuReceipt className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">
                {payments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="block lg:hidden">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-semibold text-lg">Payment History</h2>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {payments.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
                >
                  {/* Top Row */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-secondary-content font-medium">
                        Transaction ID
                      </p>
                      <p className="text-sm font-semibold text-primary-content break-all mt-1">
                        {p.transactionId}
                      </p>
                    </div>

                    <span
                      className={`text-sm px-3 py-1 rounded-lg font-semibold bg-[#00bb87]/10 text-[#00bb87] uppercase border border-[#00bb87]`}
                    >
                      {p.paymentStatus}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-2 my-3">
                    <div className="flex-1 border-t border-dashed border-primary"></div>
                    <span className="text-primary">
                      <LuTicket size={24}></LuTicket>
                    </span>
                    <div className="flex-1 border-t border-dashed border-primary"></div>
                  </div>

                  {/* Ticket Title */}
                  <div>
                    <p className="text-xs text-secondary-content font-medium">
                      Ticket
                    </p>
                    <p className="font-semibold text-primary-content">
                      {p.ticketTitle}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div className="flex justify-between  items-end">
                    {/* Amount */}
                    <div>
                      <p className="text-xs text-secondary-content font-medium">
                        Amount
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ৳{p.amount}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="text-right">
                      <p className="text-xs text-secondary-content font-medium">
                        Payment Date
                      </p>
                      <p className="text-sm text-primary-content/80 font-semibold">
                        {new Date(p.paidAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block bg-white border border-accent-content rounded-2xl shadow-sm overflow-hidden px-6">
          <div className="p-6 flex items-center gap-3">
            <CreditCard className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Payment History</h2>
          </div>

          <div className=" overflow-x-auto">
            <table className="min-w-150 w-full text-left">
              <thead>
                <tr className="text-secondary-content text-sm border-b-[1.5px] border-accent-content">
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Payment Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="text-sm border-b-[1.5px] border-accent-content last:border-b-0 hover:bg-info-content transition-colors duration-200 ease-in-out "
                  >
                    <td className="px-6 py-4 text-primary-content/90">
                      {payment.transactionId}
                    </td>

                    <td className="px-6 py-4 font-medium text-primary-content/90  ">
                      {payment.ticketTitle}
                    </td>

                    <td className="px-6 py-4 font-bold text-primary/80">
                      ৳{payment.amount}
                    </td>

                    <td className="px-6 py-4 text-primary-content/90">
                      {new Date(payment.paidAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-semibold uppercase bg-[#00bb87]/10 text-[#00bb87] border border-[#00bb87]`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
