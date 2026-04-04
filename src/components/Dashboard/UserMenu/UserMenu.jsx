import React from "react";
import { MdAttachMoney } from "react-icons/md";
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
        icon={MdAttachMoney}
        label="Transaction History"
        address="transaction-history"
      />
    </>
  );
};

export default UserMenu;
