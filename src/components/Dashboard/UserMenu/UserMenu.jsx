import React from "react";
import { LuReceipt } from "react-icons/lu";
import { LuTicketCheck } from "react-icons/lu";
import MenuItem from "../MenuItem/MenuItem";

const UserMenu = () => {
  return (
    <>
      <MenuItem
        icon={LuTicketCheck}
        label="My Booked Tickets"
        address="booked-tickets"
      />
      <MenuItem
        icon={LuReceipt}
        label="Transaction History"
        address="transaction-history"
      />
    </>
  );
};

export default UserMenu;
