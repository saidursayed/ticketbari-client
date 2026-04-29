import React from "react";
import { FaBars } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import logo from "../assets/images/ticketbarilogo.png";
import UserMenu from "../components/Dashboard/UserMenu/UserMenu";
import VendorMenu from "../components/Dashboard/VendorMenu/VendorMenu";
import AdminMenu from "../components/Dashboard/AdminMenu/AdminMenu";
import { CgProfile } from "react-icons/cg";
import MenuItem from "../components/Dashboard/MenuItem/MenuItem";
import { FiMoon, FiSun, FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import useTheme from "../hooks/useTheme";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import { NavLink } from "react-router";
import { FiHome } from "react-icons/fi";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { role, isRoleLoading } = useRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logout successful 👋");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.log(error);
    }
  };

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="drawer lg:drawer-open bg-base-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar sticky top-0 z-50 px-4 lg:px-6 backdrop-blur-md bg-info-content  border-b border-accent-content">
          {/* Left */}
          <div className="navbar-start">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle hover:bg-primary/20 mr-2"
            >
              <FaBars size={18} />
            </label>

            <Link to="/" className="lg:hidden">
              <img src={logo} alt="logo" className="h-10" />
            </Link>
          </div>

          {/* Right */}
          <div className="navbar-end">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-xl border border-accent-content transition mr-4  hover:bg-primary cursor-pointer ${theme === "light" && "hover:text-secondary"}`}
            >
              {theme === "light" ? (
                <FiMoon className="text-xl " />
              ) : (
                <FiSun className="text-xl text-yellow-400" />
              )}
            </button>
            {user && (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full object-cover "
                  />
                </div>

                <ul className=" w-72  overflow-hidden dropdown-content z-50 mt-5  bg-secondary rounded-2xl shadow-lg border border-accent-content dropdown-content">
                  {/* User Info */}
                  <li className="px-3 py-2 border-b-[1.5px] border-accent-content">
                    <h3 className="text font-medium text-primary-content">
                      {user?.displayName || "User"}
                    </h3>

                    <p className="text-sm text-secondary-content mt-0.5 break-all">
                      {user?.email}
                    </p>

                    <div className="mt-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {role}
                      </span>
                    </div>
                  </li>

                  <li className="p-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-content hover:bg-primary/10 transition-all duration-200"
                    >
                      <FiUser className="text-lg" />
                      <span className="text-sm font-medium">My Profile</span>
                    </Link>
                  </li>

                  <li className="border-t-[1.5px] border-accent-content p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-[#EF4444]/10  transition-all duration-200 cursor-pointer font-semibold"
                    >
                      <MdLogout className="text-lg" />
                      <span className="text-sm ">Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* 📦 PAGE CONTENT */}
        <div className="bg-base-200  p-4 lg:p-6">
          <div className="bg-base-100 rounded-2xl shadow-sm  min-h-[calc(100vh-100px)]">
            <Outlet />
          </div>
        </div>
        
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col bg-info-content border-r border-accent-content shadow-sm is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
          {/* LOGO */}
          <div className="flex items-center justify-center py-4 ">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-40 is-drawer-close:w-8 transition-all duration-300"
              />
            </Link>
          </div>

          {/* MENU */}
          <ul className="menu w-full flex flex-col flex-1 px-2 py-4">
            {/* Top items */}
            <div className="space-y-1">
              <MenuItem icon={CgProfile} label="Profile" address="/dashboard" />

              {role === "user" && <UserMenu />}
              {role === "vendor" && <VendorMenu />}
              {role === "admin" && <AdminMenu />}
            </div>

            {/* Bottom item */}
            <div className="mt-auto">
              <MenuItem icon={FiHome} label="Back to Home" address="/" />

              <li>
                <NavLink
                  to="/"
                  onClick={handleLogout}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 px-4 py-2.5 my-1 transition-all duration-300 
                    ${
                      isActive
                        ? "text-white bg-red-600 shadow-md"
                        : "text-red-600 hover:bg-red-600/10 hover:text-red-700"
                    }`
                  }
                >
                  <div
                    className={`text-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <MdLogout />
                  </div>

                  <span className="text-sm font-semibold is-drawer-close:hidden">
                    Logout
                  </span>

                  <span
                    className={`absolute left-0 top-0 h-full w-1 rounded-r-full bg-primary transition-all duration-300 ${"opacity-0 group-[.active]:opacity-100"}`}
                  ></span>
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
