import React from "react";
import { FaBars } from "react-icons/fa6";
import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "../assets/images/ticketbarilogo.png";
import UserMenu from "../components/Dashboard/UserMenu/UserMenu";
import VendorMenu from "../components/Dashboard/VendorMenu/VendorMenu";
import AdminMenu from "../components/Dashboard/AdminMenu/AdminMenu";
import { CgProfile } from "react-icons/cg";
import MenuItem from "../components/Dashboard/MenuItem/MenuItem";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* 🔝 PREMIUM NAVBAR */}
        <nav className="navbar sticky top-0 z-50 px-4 lg:px-6 backdrop-blur-md bg-base-100 border-b border-gray-200">
          {/* Left */}
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle hover:bg-[#CEB45F]/20"
            >
              <FaBars size={18} />
            </label>
          </div>

          {/* Right */}
          <div className="navbar-end">
            {user && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full border-2 border-[#CEB45F] object-cover shadow-sm"
                  />
                </div>

                {/* Dropdown */}
                <ul className="mt-3 p-3 shadow-xl menu menu-sm dropdown-content bg-white rounded-2xl w-56 text-gray-700 border border-gray-100">
                  <li className="font-semibold px-2 py-2 border-b">
                    {user?.displayName}
                  </li>

                  <li>
                    <Link className="hover:bg-[#CEB45F]/10 rounded-lg">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={logOut}
                      className="text-red-500 hover:bg-red-100 rounded-lg px-3 py-2 transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* 📦 PAGE CONTENT */}
        <div className="bg-white p-4 lg:p-6">
          <div className="bg-base-100 rounded-2xl shadow-sm  min-h-[calc(100vh-100px)]">
            <Outlet />
          </div>
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col bg-info-content border-r border-gray-200 shadow-sm is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
          {/* 🔰 LOGO */}
          <div className="flex items-center justify-center py-4">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-40 is-drawer-close:w-8 transition-all duration-300"
              />
            </Link>
          </div>

          {/* 📋 MENU */}
          <ul className="menu w-full flex-1 px-2 py-4 space-y-1">
            {/* Common */}
            <MenuItem icon={CgProfile} label="Profile" address="/dashboard/profile" />

            {/* Role based */}
            <UserMenu />
            <VendorMenu />
            <AdminMenu />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
