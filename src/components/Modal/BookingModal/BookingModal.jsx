import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";

const BookingModal = ({ ticket, closeModal, isOpen }) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const {
    _id,
    ticketTitle,
    ticketPrice,
    ticketQuantity,
    vendorEmail,
    ticketImage,
    from,
    to,
    departureDateTime,
  } = ticket;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (bookingData) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ticket-bookings`,
        bookingData,
      );
      if (res.data?.message) {
        throw new Error(res.data.message);
      }
      return res.data;
    },

    onSuccess: () => {
      toast.success("Booking Successful 🎉");
      closeModal();
    },

    onError: (error) => {
      toast.error(error.message || "Booking failed");
    },
  });

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    if (new Date(departureDateTime) < new Date()) {
      toast.error("Ticket expired");
      return;
    }
    if (quantity <= 0) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (quantity > ticketQuantity) {
      toast.error("Not enough tickets available");
      return;
    }

    const bookingData = {
      ticketId: _id,
      userEmail: user.email,
      userName: user.displayName,
      vendorEmail,

      ticketTitle,
      ticketImage,
      from,
      to,
      departureDateTime,
      transport: ticket.transport,
      perks: ticket.perks,

      quantity,
    };

    await mutateAsync(bookingData);
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-100">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-semibold">
              Book Ticket
            </DialogTitle>
            <button
              onClick={closeModal}
              className="text-secondary-content/80 hover:text-secondary-content cursor-pointer"
            >
              <RxCross1></RxCross1>
            </button>
          </div>

          <p className="text-sm text-secondary-content mb-3">
            Enter the number of tickets you want to book
          </p>

          {/* Ticket Info Card */}
          <div className="border border-accent-content rounded-xl p-4 bg-base-200 mb-4">
            <h3 className="font-medium text-primary-content">{ticketTitle}</h3>
            <p className="text-sm text-secondary-content flex items-center  gap-2">
              <span>{from}</span>
              <FaArrowRightLong className="text-xs" />
              <span>{to}</span>
            </p>
            <p className="text-sm text-secondary-content mt-1">
              {new Date(departureDateTime).toLocaleString()}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-1">
            <label className="text-sm font-medium">Number of Tickets</label>
            <input
              type="number"
              min="1"
              max={ticketQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full mt-1 px-3 py-2 border border-accent-content rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <p className="text-xs text-secondary-content mb-4">
            Maximum available: {ticketQuantity}
          </p>

          {/* Price Summary */}
          <div className="border border-accent-content text-primary-content rounded-xl p-4 mb-5">
            <div className="flex justify-between font-semibold text-sm mb-1">
              <span>Unit Price</span>
              <span>৳{ticketPrice}</span>
            </div>
            <div className="flex justify-between font-semibold text-sm mb-3">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>

            <hr className="text-primary" />

            <div className="flex justify-between font-semibold mt-3">
              <span>Total</span>
              <span className="text-primary">
                Total: ${ticketPrice * quantity}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={closeModal}
              className="w-full py-2 rounded-lg bg-base-200 text-primary-content hover:bg-accent-content transition cursor-pointer font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handleBooking}
              disabled={isPending}
              className={`w-full py-2 rounded-lg text-white transition cursor-pointer ${
                isPending ? "bg-primary/50" : "bg-primary/90 hover:bg-primary"
              }`}
            >
              {isPending ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookingModal;
