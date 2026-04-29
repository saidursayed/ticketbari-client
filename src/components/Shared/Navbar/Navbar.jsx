import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/ticketbarilogo.png";
import { FaBars, FaRegUser } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { LuTickets } from "react-icons/lu";
import { MdLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import Container from "../Container/Container";
import { FiSun, FiMoon, FiUser, FiGrid } from "react-icons/fi";
import useTheme from "../../../hooks/useTheme";
import { FiHome } from "react-icons/fi";
import toast from "react-hot-toast";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "All Tickets", path: "/all-tickets", icon: LuTickets },
    ...(user
      ? [
          {
            name: "Dashboard",
            path: "/dashboard",
            icon: MdOutlineSpaceDashboard,
          },
        ]
      : []),
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logout successful!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed!");
      console.log(error);
    }
  };

  return (
    <div className=" fixed w-full backdrop-blur-md bg-transparent z-100 shadow-sm border-b border-accent-content">
      <Container>
        <div className="navbar m-0 p-0 py-3">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden btn-circle hover:bg-primary/20"
              >
                <FaBars size={18} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="text-sm font-semibold">
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                          ` flex items-center gap-1 ${
                            isActive
                              ? "text-primary bg-primary/10 "
                              : "hover:bg-primary/10 hover:text-primary"
                          }`
                        }
                      >
                        <Icon size={18} />
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link className="ml-1 md:ml-2" to="/">
              <img src={logo} alt="logo" className="h-8 md:h-12" />
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="text-sm font-semibold">
                    <NavLink
                      to={item.path}
                      end
                      className={({ isActive }) =>
                        ` flex items-center gap-1 ${
                          isActive
                            ? "text-primary bg-primary/10 "
                            : "hover:bg-primary/10 hover:text-primary"
                        }`
                      }
                    >
                      <Icon size={18} />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="navbar-end">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-xl border border-accent-content transition mr-2 md:mr-4  hover:bg-primary cursor-pointer ${theme === "light" && "hover:text-secondary"}`}
            >
              {theme === "light" ? (
                <FiMoon className="text-xl " />
              ) : (
                <FiSun className="text-xl text-yellow-400" />
              )}
            </button>

            {user ? (
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

                    <p className="text-sm text-secondary-content mt-0.5">
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
            ) : (
              <div className="flex gap-1 md:gap-2">
                {/* Sign In */}
                <Link
                  to="/login"
                  className="group flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg border border-primary/30 text-[#ffffff] sm:text-primary-content text-sm font-semibold bg-primary sm:bg-transparent hover:bg-primary hover:text-[#ffffff] transition-all duration-300"
                >
                  <FaRegUser className="text-base" />
                  <span>Sign In</span>
                </Link>

                {/* Sign Up */}
                <Link
                  to="/register"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-[#ffffff] text-sm font-semibold shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200"
                >
                  <BiLock className="text-base" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
