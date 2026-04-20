import React from "react";
import LatestTickets from "../../components/Home/LatestTickets/LatestTickets";
import Banner from "../../components/Home/Banner.jsx/Banner";
import WhyChooseTicketBari from "../../components/Home/WhyChooseTicketBari/WhyChooseTicketBari";
import PopularRoutes from "../../components/Home/PopularRoutes/PopularRoutes";
import AdvertiseTickets from "../../components/Home/AdvertiseTickets.jsx/AdvertiseTickets";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AdvertiseTickets></AdvertiseTickets>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <WhyChooseTicketBari></WhyChooseTicketBari>
    </div>
  );
};

export default Home;
