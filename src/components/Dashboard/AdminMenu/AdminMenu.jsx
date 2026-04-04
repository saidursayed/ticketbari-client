import React from "react";
import { LuTickets } from "react-icons/lu";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiTicket } from "react-icons/gi";
import MenuItem from "../MenuItem/MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={LuTickets}
        label="Manage Tickets  "
        address="manage-tickets"
      />
      <MenuItem
        icon={MdOutlineManageAccounts}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        icon={GiTicket}
        label=" Advertise Tickets"
        address="advertise-tickets"
      />
    </>
  );
};

export default AdminMenu;
