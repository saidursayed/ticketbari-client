import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuBus, LuPlane, LuTicket } from "react-icons/lu";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { IoBoatOutline } from "react-icons/io5";
import { PiTrain } from "react-icons/pi";
import { FiClock, FiEdit, FiEdit2, FiTrash2 } from "react-icons/fi";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateTicketModal from "../../Modal/UpdateTicketModal/UpdateTicketModal";

const AddedTicketCard = ({ ticket, refetch }) => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);

  const dateObj = new Date(ticket.departureDateTime);

  const date = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const { mutateAsync: deleteTicket, isPending } = useMutation({
    mutationFn: async (id) => {
      const result = await axiosSecure.delete(`/ticket/${id}`);
      return result.data;
    },
    onSuccess: () => {
      //refetch
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to delete ticket ❌",
        icon: "error",
      });
    },
  });

  const handleDeleteTicket = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTicket(id);

        Swal.fire({
          title: "Deleted!",
          text: "Ticket has been deleted successfully ✅",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border-[1.5px] border-accent-content hover:shadow-lg transition relative">
      {/* Ticket Image */}
      <div className="relative">
        <img
          src={ticket.ticketImage}
          alt={ticket.ticketTitle}
          className="h-48 w-full object-cover"
        />

        {ticket.isAdvertised && (
          <div className="absolute top-5 -left-9 -rotate-45 bg-red-500 text-white text-sm font-semibold px-10 py-1 shadow-lg z-20">
            Featured
          </div>
        )}

        {/* ✅ Status Badge */}
        <span
          className={`${ticket.isAdvertised && "left-18"} absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-sm font-semibold ${
            ticket.verificationStatus === "approved"
              ? "bg-green-100 text-green-700"
              : ticket.verificationStatus === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {ticket.verificationStatus}
        </span>

        {/* Transport Badge */}
        <span className="absolute top-3 right-3 z-20">
          {ticket.transport === "Bus" && (
            <div className="flex items-center gap-2 bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <LuBus size={16} />
              <span className="text-sm font-medium">Bus</span>
            </div>
          )}

          {ticket.transport === "Train" && (
            <div className="flex items-center gap-2 bg-[#00bb87]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <PiTrain size={16} />
              <span className="text-sm font-medium">Train</span>
            </div>
          )}

          {ticket.transport === "Launch" && (
            <div className="flex items-center gap-2 bg-[#ec5a00]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <IoBoatOutline size={16} />
              <span className="text-sm font-medium">Launch</span>
            </div>
          )}

          {ticket.transport === "Plane" && (
            <div className="flex items-center gap-2 bg-[#9260da]/90 backdrop-blur px-3 py-1 rounded-full text-white shadow">
              <LuPlane size={16} />
              <span className="text-sm font-medium">Plane</span>
            </div>
          )}
        </span>
      </div>

      {/* Ticket Info */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-primary-content">
          {ticket.ticketTitle}
        </h2>

        {/* Route */}
        <div className="w-full bg-base-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-secondary-content uppercase">
              From
            </p>
            <h2 className="text-base font-bold text-primary-content">
              {ticket.from}
            </h2>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 bg-white border border-accent-content rounded-full p-2 shadow-sm">
                <ArrowRight className="text-primary" size={18} />
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold text-secondary-content uppercase">
              To
            </p>
            <h2 className="text-base font-bold text-primary-content">
              {ticket.to}
            </h2>
          </div>
        </div>
        {/* Date & Time */}
        <div className="flex items-center gap-4 text-sm text-secondary-content">
          <div className="flex-1 flex items-center gap-2 bg-base-200 p-2 rounded-md">
            <FaRegCalendarAlt size={16} />
            <span className="font-semibold text-sm">{date}</span>
          </div>

          <div className="flex-1 flex items-center gap-2  bg-base-200 p-2 rounded-md">
            <FiClock size={16} />
            <span className="font-semibold text-sm">{time}</span>
          </div>
        </div>

        <div className="bg-base-200 p-2 rounded-md flex items-center gap-2">
          <LuTicket className="text-primary" size={18}></LuTicket>
          <p className="text-primary-content text-sm font-medium">
            {ticket.ticketQuantity} ticket available
          </p>
        </div>
        <div className="bg-base-200 p-2 rounded-md border border-accent-content">
          <p className="text-sm text-secondary-content font-semibold">
            Price per ticket
          </p>
          <h2 className="text-2xl font-bold text-primary">
            ${ticket.ticketPrice}
          </h2>
        </div>

        <div className="border-t border-primary">
          <div className=" flex justify-between items-center mt-3 gap-4">
            <button
              onClick={() => setIsOpen(true)}
              disabled={ticket.verificationStatus === "rejected"}
              className={`flex-1 flex  justify-center items-center gap-2 px-5 py-2 rounded-lg font-semibold border-[1.5px] border-accent-content transition ${
                ticket.verificationStatus === "rejected"
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "text-primary hover:text-white hover:bg-primary cursor-pointer"
              }`}
            >
              <FiEdit />
              Update
            </button>
            <UpdateTicketModal
              ticket={ticket}
              closeModal={() => setIsOpen(false)}
              isOpen={isOpen}
              refetch={refetch}
            ></UpdateTicketModal>

            <button
              onClick={() => handleDeleteTicket(ticket._id)}
              disabled={ticket.verificationStatus === "rejected" || isPending}
              className={`flex-1 px-5 py-2 rounded-lg  font-semibold  flex items-center justify-center gap-2 border-[1.5px] border-accent-content transition ${
                ticket.verificationStatus === "rejected"
                  ? "bg-gray-300 text-white cursor-not-allowed"
                  : "text-red-600 hover:text-white hover:bg-red-600 cursor-pointer"
              }`}
            >
              {isPending ? (
                "Deleting..."
              ) : (
                <>
                  <FiTrash2 />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedTicketCard;
