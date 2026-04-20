import React from "react";
import { LuTickets, LuUsers} from "react-icons/lu";
import MenuItem from "../MenuItem/MenuItem";
import { GoMegaphone } from "react-icons/go";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={LuTickets}
        label="Manage Tickets  "
        address="manage-tickets"
      />
      <MenuItem
        icon={LuUsers}
        label="Manage Users"
        address="manage-users"
      />
      <MenuItem
        icon={GoMegaphone}
        label=" Advertise Tickets"
        address="advertise-tickets"
      />
    </>
  );
};

export default AdminMenu;
