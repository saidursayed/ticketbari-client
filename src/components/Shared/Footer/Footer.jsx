import { FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/images/ticketbarilogo.png";
import { Link } from "react-router";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="bg-[#0B1C2C] text-gray-300">
      <Container>
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="inline-block">
              <img src={logo} alt="logo" className="h-9 md:h-12" />
            </Link>
            <p className="text-sm mt-4 leading-relaxed text-gray-400">
              Book bus, train, launch & flight tickets easily with secure
              payment and real-time availability across Bangladesh.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-tickets"
                  className="hover:text-white hover:translate-x-1 transition duration-300 inline-block"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-1 transition duration-300 inline-block">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-1 transition duration-300 inline-block">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 hover:text-white transition">
                <FaEnvelope className="text-primary" />
                info@ticketbari.com
              </li>
              <li className="flex items-center gap-3 hover:text-white transition">
                <FaPhoneAlt className="text-primary" />
                +880 1234-567890
              </li>
              <li className="flex items-center gap-3 hover:text-white transition">
                <FaFacebookF className="text-primary" />
                facebook.com/ticketbari
              </li>
            </ul>
          </div>

          {/* Column 4 - Payment */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Payment Methods
            </h3>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="bg-white p-2 rounded-lg shadow hover:scale-105 transition">
                <img
                  src={`https://cdn.worldvectorlogo.com/logos/stripe-4.svg`}
                  alt="payment"
                  className="h-5"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400 ">
          <p>© 2025 TicketBari. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
