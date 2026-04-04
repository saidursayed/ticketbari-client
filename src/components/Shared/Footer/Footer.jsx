import { FaFacebookF, FaPhoneAlt, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-[#0B1E2D] text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1 */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">TicketBari</h2>
          <p className="text-sm leading-relaxed">
            Book bus, train, launch & flight tickets easily with secure payment
            and real-time availability.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                All Tickets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@ticketbari.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <FaFacebookF /> facebook.com/ticketbari
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Payment Methods
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <img
              src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg"
              alt="Stripe"
              className="h-6 bg-white p-1 rounded"
            />
            <img
              src="https://cdn.worldvectorlogo.com/logos/visa.svg"
              alt="Visa"
              className="h-6 bg-white p-1 rounded"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6 bg-white p-1 rounded"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © 2025 TicketBari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
