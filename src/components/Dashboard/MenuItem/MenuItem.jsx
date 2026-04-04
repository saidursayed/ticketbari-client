import React from "react";
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <li>
      <NavLink
        to={address}
        end
        className={({ isActive }) =>
          `group relative flex items-center gap-3 px-4 py-2.5 my-1 transition-all duration-300 
          
          ${
            isActive
              ? "text-[#EFF3F4] bg-[#CEB45F] shadow-sm"
              : "text-[#EFF3F4] hover:bg-[#CEB45F]/20 hover:text-[#CEB45F]"
          }
          `
        }
      >
        {/* Icon */}
        <div
          className={`text-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon />
        </div>

        {/* Label */}
        <span className="text-base font-semibold is-drawer-close:hidden">
          {label}
        </span>

        {/* Active indicator */}
        <span
          className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-[#CEB45F] transition-all duration-300 ${"opacity-0 group-[.active]:opacity-100"}`}
        ></span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
