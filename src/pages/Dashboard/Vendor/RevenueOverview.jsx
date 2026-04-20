import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { LuBox, LuTicket } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: revenueData = {}, isLoading } = useQuery({
    queryKey: ["revenueData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/vendor/revenue-overview?email=${user?.email}`,
      );
      return res.data;
    },
  });

  const {
    totalRevenue = 0,
    totalTicketsSold = 0,
    totalTicketsAdded = 0,
  } = revenueData || {};

const data = [
  { name: "Revenue", value: totalRevenue },
  { name: "Tickets Sold", value: totalTicketsSold },
  { name: "Tickets Added", value: totalTicketsAdded },
];

  if (isLoading) return <span>Loading...</span>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          Revenue Overview
        </h1>
        <p className="text-primary-content/70 mt-1">
          Track your earnings and sales performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-primary/10 text-primary p-4 rounded-full text-2xl">
            <FaDollarSign />
          </div>
          <div>
            <p className="text-secondary-content">Total Revenue</p>
            <h2 className="text-3xl font-bold text-primary">${totalRevenue}</h2>
          </div>
        </div>

        {/* Tickets Sold */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-[#00bb87]/10 text-[#00bb87] p-4 rounded-full text-2xl">
            <LuBox />
          </div>
          <div>
            <p className="text-secondary-content">Tickets Sold</p>
            <h2 className="text-3xl font-bold">{totalTicketsSold}</h2>
          </div>
        </div>

        {/* Tickets Added */}
        <div className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm border border-accent-content">
          <div className="bg-[#00bb87]/10 text-[#00bb87] p-4 rounded-full text-2xl">
            <LuTicket />
          </div>
          <div>
            <p className="text-secondary-content">Tickets Added</p>
            <h2 className="text-3xl font-bold">{totalTicketsAdded}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-accent-content">
        <h2 className="text-xl font-bold mb-4 text-primary-content">
          Revenue Analytics
        </h2>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-accent-content">
      
      {/* Title */}
      <h2 className="text-xl font-bold mb-6">
        Performance Summary
      </h2>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#00bcd4"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
