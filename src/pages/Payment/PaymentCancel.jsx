import { Link } from "react-router";
import { MdCancel } from "react-icons/md";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-lg text-center bg-secondary border border-accent-content rounded-2xl shadow-md p-8 relative overflow-hidden">
        <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-red-500/20 mb-5">
          <MdCancel className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-primary-content mb-2">
          Payment Cancelled
        </h1>

        <p className="text-primary-content/70 mb-6 text-sm md:text-base">
          Your payment was not completed. You can try again or return to browse
          tickets.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/all-tickets"
            className="px-4 py-2 rounded-lg bg-primary text-white border-[1.5px] border-primary font-semibold 
            hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Browse Tickets
          </Link>
          <Link
            to="/dashboard/booked-tickets"
            className="px-4 py-2 rounded-lg text-primary border-[1.5px] border-primary bg-transparent hover:bg-primary hover:text-white  font-semibold 
             transition-all duration-300 shadow-md hover:shadow-lg "
          >
            My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
