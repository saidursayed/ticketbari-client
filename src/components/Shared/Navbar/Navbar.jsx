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
    <div className="fixed w-full z-50 bg-white shadow-md">
      <Container>
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-14" />
            
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative flex items-center gap-1 font-medium transition ${
                      isActive
                        ? "text-[#CEB45F]"
                        : "text-gray-700 hover:text-[#ffa633]"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#CEB45F] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="cursor-pointer"
                >
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full border-2 border-[#CEB45F] object-cover"
                  />
                </div>

                <ul className="mt-3 p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-xl w-52 text-gray-700">
                  <li className="font-semibold px-2 py-1">{user?.displayName}</li>
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
              <div className="flex items-center gap-3">

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