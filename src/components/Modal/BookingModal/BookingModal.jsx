import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

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
    console.log(bookingData);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle className="text-lg font-semibold text-center">
              Review & Book Ticket
            </DialogTitle>

            {/* Ticket Info */}
            <div className="mt-3 space-y-2">
              <p className="text-sm">🎫 {ticketTitle}</p>
              <p className="text-sm">👤 {user?.displayName}</p>
              <p className="text-sm">💰 ${ticketPrice} / ticket</p>
              <p className="text-sm text-green-600">
                Available: {ticketQuantity}
              </p>
            </div>

            {/* 🔢 Quantity Input */}
            <div className="mt-4">
              <label className="text-sm font-medium">Select Quantity</label>
              <input
                type="number"
                min="1"
                max={ticketQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none"
              />
            </div>

            {/* 💰 Total */}
            <div className="mt-3 text-sm font-semibold">
              Total: ${ticketPrice * quantity}
            </div>

            {/* Buttons */}
            <div className="flex mt-5 justify-between gap-3">
              <button
                onClick={handleBooking}
                disabled={
                  isPending || quantity <= 0 || quantity > ticketQuantity
                }
                className={`w-full py-2 rounded-lg text-white ${
                  isPending || quantity <= 0 || quantity > ticketQuantity
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isPending ? "Processing..." : "Confirm Booking"}
              </button> 

              {/* <button onClick={handleBooking} className="btn btn-lg">
                Confirm Booking
              </button> */}

              <button
                onClick={closeModal}
                className="w-full py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;
