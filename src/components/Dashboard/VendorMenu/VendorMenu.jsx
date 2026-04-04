import React from "react";
import { LuTicketPlus, LuTicketCheck } from "react-icons/lu";
import { MdHourglassEmpty, MdBarChart } from "react-icons/md";
import MenuItem from "../MenuItem/MenuItem";

const VendorMenu = () => {
  return (
    <>
      <MenuItem icon={LuTicketPlus} label="Add Ticket" address="add-ticket" />
      <MenuItem
        icon={LuTicketCheck}
        label="My Added Tickets"
        address="added-tickets"
      />
      <MenuItem
        icon={MdHourglassEmpty}
        label="Requested Bookings"
        address="booking-requests"
      />

      <MenuItem
        icon={MdBarChart}
        label="Revenue Overview"
        address="revenue-overview"
      />
    </>
  );
};

export default VendorMenu;
