import React, { useState } from "react";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../utils";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateTicketModal = ({ ticket, isOpen, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(ticket?.ticketImage);

  const {
    register,
    handleSubmit,

    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      ticketTitle: ticket?.ticketTitle || "",
      from: ticket?.from || "",
      to: ticket?.to || "",
      transport: ticket?.transport || "",
      ticketPrice: ticket?.ticketPrice || "",
      ticketQuantity: ticket?.ticketQuantity || "",
      departureDateTime: ticket?.departureDateTime || "",
      ticketImage: ticket?.ticketImage || "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (ticketData) =>
      await axiosSecure.patch(`/ticket/${ticket._id}`, ticketData),

    onSuccess: () => {
      toast.success("Ticket updated Successfully");
      closeModal();
      reset();
    },

    onError: () => {
      toast.error("Failed to update ticket");
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("ticketImage", file);
    }
  };

  const onSubmit = async (data) => {
    let imageUrl = ticket?.ticketImage;

    if (data.ticketImage instanceof File) {
      imageUrl = await imageUpload(data.ticketImage);
    }

    const ticketData = {
      ticketTitle: data.ticketTitle,
      from: data.from,
      to: data.to,
      transport: data.transport,
      ticketPrice: Number(data.ticketPrice),
      ticketQuantity: Number(data.ticketQuantity),
      departureDateTime: data.departureDateTime,
      perks: data.perks || [],
      ticketImage: imageUrl,
    };
    console.log(ticketData);
    await mutateAsync(ticketData);
    // reset();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Center */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Update Ticket
              </DialogTitle>
              <p className="text-sm text-gray-500">
                Make changes to your ticket listing
              </p>
            </div>

            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-black"
            >
              <RxCross1 />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <div className="mt-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="text-sm font-semibold text-primary-content">
                    Ticket Title
                  </label>
                  <input
                    {...register("ticketTitle", { required: true })}
                    placeholder="Enter ticket title"
                    className="input-style"
                  />
                  {errors.ticketTitle && (
                    <p className="text-red-500 text-sm mt-1">
                      Ticket title is required
                    </p>
                  )}
                </div>

                {/* From - To */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-primary-content">
                      From
                    </label>
                    <input
                      {...register("from", { required: true })}
                      placeholder="Departure city"
                      className="input-style"
                    />
                    {errors.from && (
                      <p className="text-red-500 text-sm mt-1">
                        From is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-primary-content">
                      To
                    </label>
                    <input
                      {...register("to", { required: true })}
                      placeholder="Destination city"
                      className="input-style"
                    />
                    {errors.to && (
                      <p className="text-red-500 text-sm mt-1">
                        To is required
                      </p>
                    )}
                  </div>
                </div>

                {/* Transport + Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">
                      Transport Type
                    </label>
                    <select
                      {...register("transport", { required: true })}
                      className="input-style"
                    >
                      <option value="">Select Transport</option>{" "}
                      <option value="Bus">🚌 Bus</option>
                      <option value="Train">🚆 Train</option>
                      <option value="Flight">✈️ Flight</option>
                      <option value="Launch">🚢 Launch</option>
                    </select>
                    {errors.transport && (
                      <p className="text-red-500 text-sm mt-1">
                        Transport is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-primary-content">
                      Ticket Price
                    </label>
                    <input
                      type="number"
                      {...register("ticketPrice", { required: true })}
                      placeholder="Enter price"
                      className="input-style"
                    />
                    {errors.ticketPrice && (
                      <p className="text-red-500 text-sm mt-1">
                        Ticket price is required
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity + Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-primary-content">
                      Ticket Quantity
                    </label>
                    <input
                      type="number"
                      {...register("ticketQuantity", { required: true })}
                      placeholder="Available ticket"
                      className="input-style"
                    />
                    {errors.ticketQuantity && (
                      <p className="text-red-500 text-sm mt-1">
                        Ticket quantity is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-primary-content">
                      Departure date & time
                    </label>
                    <input
                      type="datetime-local"
                      {...register("departureDateTime", { required: true })}
                      className="input-style"
                    />
                    {errors.departureDateTime && (
                      <p className="text-red-500 text-sm mt-1">
                        Departure date & time is required
                      </p>
                    )}
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase mb-2">
                    Ticket Thumbnail
                  </p>

                  <label className="block border-[1.5px] border-dashed border-primary p-4 rounded-xl cursor-pointer text-center">
                    {/* Hidden input */}
                    <input
                      type="file"
                      className="hidden"
                      {...register("ticketImage")}
                      onChange={(e) => {
                        handleImageChange(e);
                      }}
                    />

                    {/* Preview */}
                    {preview ? (
                      <img
                        src={preview}
                        className="border border-accent-content h-40 w-1/2 object-cover rounded-lg mx-auto"
                      />
                    ) : (
                      <p className="text-gray-500">Click to upload image</p>
                    )}

                    <p className="mt-2 text-blue-600 font-medium">
                      Click to change image
                    </p>
                  </label>

                  {errors.ticketImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ticketImage.message}
                    </p>
                  )}
                </div>

                {/* Perks */}
                <div>
                  <label className="text-sm font-medium">Perks</label>

                  <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                    {[
                      "AC",
                      "WiFi",
                      "Snacks",
                      "Breakfast",
                      "Lunch",
                      "Dinner",
                      "Meal Included",
                      "Reclining Seats",
                      "Sleeper",
                      "Blanket",
                      "Pillow",
                      "Entertainment",
                      "Baggage",
                      "Cabin",
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={item}
                          {...register("perks")}
                          defaultChecked={ticket?.perks?.includes(item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    onClick={closeModal}
                    className="btn  rounded-lg bg-base-200 text-primary-content hover:bg-accent-content transition font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit "
                    disabled={isPending}
                    className={`btn rounded-lg text-white transition ${
                      isPending
                        ? "bg-primary/50"
                        : "bg-primary/90 hover:bg-primary"
                    }`}
                  >
                    {isPending ? "Updating..." : "Update Ticket"}
                  </button>

                  
                </div>
              </div>
            </fieldset>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateTicketModal;
