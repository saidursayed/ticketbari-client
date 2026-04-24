import { useQuery } from "@tanstack/react-query";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FiShield, FiUser } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const Profile = () => {
  // const user = {
  //   name: "Google User",
  //   email: "googleuser1776015924944@gmail.com",
  //   role: "User",
  //   status: "Active",
  //   avatar: "https://i.ibb.co/2kR5zqM/avatar.png",
  // };

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: profileUser = [],
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/${user?.email}`);
      return result.data;
    },
  });

  const dateObj = new Date(profileUser.createdAt);
  const dateTime = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">My Profile</h1>
        <p className="text-primary-content/70 mt-1">
          View and manage your account information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-base-100 rounded-2xl shadow-sm p-6 flex items-center gap-3 border border-accent-content">
        <img
          src={profileUser.image}
          alt="avatar"
          className="w-20 h-20 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold text-primary-content">
            {profileUser.name}
          </h2>
          <p className="text-primary-content/70">{profileUser.email}</p>
          <span className="inline-block mt-1 text-sm bg-primary text-white px-3 py-1 rounded-full font-medium">
            {profileUser.role}
          </span>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Account Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-accent-content">
          <h3 className="font-semibold text-primary-content mb-4 flex items-center gap-2">
            <FiUser size={18} /> Account Details
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <FiUser size={18} />
              </div>
              <div>
                <p className="text-sm text-secondary-content font-medium">
                  Full Name
                </p>
                <p className="font-semibold">{profileUser.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <HiOutlineMail size={18} />
              </div>
              <div>
                <p className="text-sm text-secondary-content font-medium">
                  Email Address
                </p>
                <p className="font-semibold">{profileUser.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Role & Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-accent-content">
          <h3 className="font-semibold text-primary-content mb-4 flex items-center gap-2">
            <FiShield /> Role & Status
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <FiShield />
              </div>
              <div>
                <p className="text-sm text-secondary-content font-medium">
                  Account Role
                </p>
                <p className="font-semibold">{profileUser.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <LuCalendar />
              </div>
              <div>
                <p className="text-sm text-secondary-content font-medium">
                  Member Since
                </p>
                <span className="text-sm font-semibold">{dateTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;













      