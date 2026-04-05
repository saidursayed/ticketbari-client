import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { imageUpload } from "../../../utils";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AddTicketForm = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDBUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      setDBUser(res.data);
    };

    if (user?.email) fetchUser();
  }, [user?.email, axiosSecure]);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (payload) => await axiosSecure.post(`/tickets`, payload),

    onSuccess: () => {
      toast.success("Ticket Added Successfully");
    },

    onError: () => {
      toast.error("Failed to add ticket");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (dbUser?.isFraud) {
        toast.error(
          "Your account has been restricted. You cannot add tickets.",
        );
        return;
      }

      const imageFile = data.ticketImage?.[0];
      if (!imageFile) return toast.error("Image required");

      const imageUrl = await imageUpload(imageFile);

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
        vendorName: data.vendorName,
        vendorEmail: data.vendorEmail,
      };
      console.log(ticketData);
      await mutateAsync(ticketData);
      reset();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  if (isPending) return <span>Loading...</span>;

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 px-20">
      <div>
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Add New Ticket
        </h2>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-secondary">
              Ticket Title
            </label>
            <input
              {...register("ticketTitle", { required: true })}
              placeholder="Enter ticket title"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
              <label className="text-sm font-semibold text-secondary">
                From
              </label>
              <input
                {...register("from", { required: true })}
                placeholder="Departure city"
                className="input-style"
              />
              {errors.from && (
                <p className="text-red-500 text-sm mt-1">From is required</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-secondary">To</label>
              <input
                {...register("to", { required: true })}
                placeholder="Destination city"
                className="input-style"
              />
              {errors.to && (
                <p className="text-red-500 text-sm mt-1">To is required</p>
              )}
            </div>
          </div>

          {/* Transport */}
          <div>
            <label className="text-sm font-semibold text-secondary">
              Transport
            </label>
            <select
              {...register("transport", { required: true })}
              className="input-style"
            >
              <option value="">Select Transport</option>
              <option value="Bus">🚌 Bus</option>
              <option value="Train">🚆 Train</option>
              <option value="Flight">✈️ Flight</option>
              <option value="Launch">🚢 Launch</option>
            </select>
            {errors.transport && (
              <p className="text-red-500 text-sm mt-1">Transport is required</p>
            )}
          </div>

          {/* Price & Quantity */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-secondary">
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

            <div>
              <label className="text-sm font-semibold text-secondary">
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
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-semibold text-secondary">
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

          {/* Perks */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Perks</label>

            <div className="flex flex-wrap gap-3 mt-3">
              {["AC", "Breakfast", "Wifi", "Charging"].map((perk) => (
                <label
                  key={perk}
                  className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
                >
                  <input
                    type="checkbox"
                    value={perk}
                    {...register("perks", {
                      required: "At least one perk is required",
                    })}
                    className="accent-blue-600"
                  />
                  {perk}
                </label>
              ))}
            </div>

            {/* Error */}
            {errors.perks && (
              <p className="text-red-500 text-sm mt-1">
                {errors.perks.message}
              </p>
            )}
          </div>

          {/* Image */}

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-600 uppercase">
              Ticket Thumbnail
            </p>

            <div>
              {/* File Input */}
              <input
                type="file"
                {...register("ticketImage", { required: "Image is required" })}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-white file:bg-blue-500 file:hover:bg-blue-700 file:transition-all file:cursor-pointer file:shadow-sm border border-dashed border-gray-300 p-2 bg-gray-50 rounded-xl"
              />
            </div>

            {errors.ticketImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ticketImage.message}
              </p>
            )}
          </div>

          {/* Vendor */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-secondary">
                Vendor Name
              </label>
              <input
                value={user?.displayName || ""}
                readOnly
                {...register("vendorName", { required: true })}
                className="input-style bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-secondary">
                Vendor Email
              </label>
              <input
                value={user?.email || ""}
                readOnly
                {...register("vendorEmail", { required: true })}
                className="input-style bg-gray-100"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {isPending ? (
              <TbFidgetSpinner className="animate-spin mx-auto" />
            ) : (
              "Add Ticket"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTicketForm;
