import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/ticketbarilogo.png";
import { FaRegUser } from "react-icons/fa";
import { BiLock } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { LuTickets } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import Container from "../Container/Container";

const Navbar = () => {
  const { user, logOut } = useAuth();
  

  const navItems = [
    { name: "Home", path: "/", icon: GoHome },
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

  return (
    <div className=" fixed w-full backdrop-blur-md bg-white/20 border-b border-white/30 z-100 shadow-sm">
      <Container>
        <div className="navbar m-0 p-0 py-4">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
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
                        <Icon  size={18}/>
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Link to="">
              <img src={logo} alt="logo" className="h-10" />
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
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="cursor-pointer">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                <ul className="mt-3 p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-xl w-52 text-gray-700">
                  <li className="font-semibold px-2 py-1">
                    {user?.displayName}
                  </li>
                  <li>
                    <Link className="hover:text-[#ffa633]">Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="text-red-500 hover:bg-red-100 w-full text-left px-3 py-2 rounded-md transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-1 md:gap-2">
                {/* Sign In */}
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:border-[#CEB45F] hover:text-[#CEB45F] transition flex items-center gap-2"
                >
                  <FaRegUser />
                  Sign In
                </Link>

                {/* Sign Up */}
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-[#CEB45F] text-white font-semibold hover:bg-[#ffa633] transition flex items-center gap-2 shadow-md"
                >
                  <BiLock />
                  Sign Up
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
