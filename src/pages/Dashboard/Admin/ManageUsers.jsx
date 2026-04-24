import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { LuShieldAlert, LuTicket, LuUsers } from "react-icons/lu";
import { FiShield, FiUser, FiUserCheck } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: allUsers = [],
    isLoading: isAllUsersLoading,
    refetch: refetchAllUsers,
  } = useQuery({
    queryKey: ["allusers", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/all-users");
      return result.data;
    },
  });

  const {
    data: users = [],
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/manage-users");
      return result.data;
    },
  });

  const handleRoleUpdate = async (email, role) => {
    try {
      await axiosSecure.patch("/update-role", {
        email,
        role,
      });
      toast.success("Role Updated!");
      refetchAllUsers();
      refetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFraud = async (user) => {
    try {
      const result = await axiosSecure.patch(`/users/fraud/${user._id}`, {
        isFraud: false,
      });

      toast.success(result.data.message);
      refetchAllUsers();
      refetchUsers();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isAllUsersLoading || isUsersLoading)
    return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-content">
          Manage Users
        </h1>
        <p className="text-primary-content/70 mt-1">
          View and manage all platform users
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Users */}
        <div className="flex items-center gap-4 px-6 py-10 bg-white rounded-2xl shadow-sm border border-accent-content">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl">
            <LuUsers />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Users</p>
            <h2 className="text-2xl font-bold">
              {allUsers.filter((u) => u.role === "user").length}
            </h2>
          </div>
        </div>

        {/* Vendors */}
        <div className="flex items-center gap-4 px-6 py-10 bg-white rounded-2xl shadow-sm border border-accent-content">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
            <FiShield />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Vendors</p>
            <h2 className="text-2xl font-bold">
              {allUsers.filter((u) => u.role === "vendor").length}
            </h2>
          </div>
        </div>

        {/* Admins */}
        <div className="flex items-center gap-4 px-6 py-10 bg-white rounded-2xl shadow-sm border border-accent-content">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xl">
            <LuShieldAlert />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Admins</p>
            <h2 className="text-2xl font-bold">
              {allUsers.filter((u) => u.role === "admin").length}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 border border-accent-content">
        <div className="flex items-center gap-2 mb-6">
          <LuUsers className="text-lg" />
          <h2 className="text-xl font-semibold">All Users ({users.length})</h2>
        </div>

        <div className="lg:hidden space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-accent-content rounded-2xl p-4 shadow-sm space-y-3"
              >
                {/* Top Row */}

                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-primary-content">
                      {user.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Divider (same style as booking card) */}
                <div className="flex items-center gap-2 my-0">
                  <div className="flex-1 border-t border-dashed border-primary"></div>
                  <span className="text-primary">
                    <LuTicket size={24}></LuTicket>
                  </span>
                  <div className="flex-1 border-t border-dashed border-primary"></div>
                </div>

                {/* Info Section */}
                <div className="flex items-center justify-between text-sm">
                  <p className=" text-secondary-content">Role</p>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold border rounded-2xl ${
                      user.isFraud
                        ? "bg-red-100 text-red-600 border-red-200"
                        : user.role === "admin"
                          ? "bg-[#9260da]/10 text-[#9260da] border-[#9260da]/30"
                          : user.role === "vendor"
                            ? "bg-[#00bb87]/10 text-[#00bb87] border-[#00bb87]/30"
                            : "bg-primary/10 text-primary border-primary/30"
                    }`}
                  >
                    {user.isFraud ? (
                      <>
                        <IoWarningOutline className="text-base" />
                        <span>Fraud Vendor</span>
                      </>
                    ) : user.role === "admin" ? (
                      "Admin"
                    ) : user.role === "vendor" ? (
                      "Vendor"
                    ) : (
                      "User"
                    )}
                  </span>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-dashed border-primary">
                  <div
                    className={`flex flex-wrap justify-center ${user.role === "user" && "justify-between"} items-center gap-2`}
                  >
                    {user.role === "user" ? (
                      <>
                        <button
                          onClick={() => handleRoleUpdate(user.email, "admin")}
                          className="flex-1 px-3 py-1 font-medium bg-[#9260da] text-white rounded hover:bg-[#7c4cc4] transition cursor-pointer"
                        >
                          Make Admin
                        </button>

                        <button
                          onClick={() => handleRoleUpdate(user.email, "vendor")}
                          className="flex-1 px-3 py-1 font-medium bg-[#00bb87] text-white rounded hover:bg-[#009f73] transition cursor-pointer"
                        >
                          Make Vendor
                        </button>
                      </>
                    ) : user.role === "admin" ? (
                      <span>Admin Account</span>
                    ) : (
                      <></>
                    )}

                    {/* If vendor */}
                    {user.isFraud ? (
                      <span className=" text-sm font-medium text-red-600 ">
                        Account Suspended
                      </span>
                    ) : user.role === "vendor" ? (
                      <button
                        onClick={() => handleFraud(user)}
                        className="flex items-center gap-1 px-3 py-1 font-medium bg-red-50 text-red-600 rounded border border-accent-content hover:bg-red-100 transition cursor-pointer"
                      >
                        <IoWarningOutline />
                        Mark as Fraud
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="font-medium">{user.name || "N/A"}</p>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold border rounded-2xl ${
                        user.isFraud
                          ? "bg-red-100 text-red-600 border-red-200"
                          : user.role === "admin"
                            ? "bg-[#9260da]/10 text-[#9260da] border-[#9260da]/30"
                            : user.role === "vendor"
                              ? "bg-[#00bb87]/10 text-[#00bb87] border-[#00bb87]/30"
                              : "bg-primary/10 text-primary border-primary/30"
                      }`}
                    >
                      {user.isFraud ? (
                        <>
                          <IoWarningOutline className="text-base" />
                          <span>Fraud Vendor</span>
                        </>
                      ) : user.role === "admin" ? (
                        "Admin"
                      ) : user.role === "vendor" ? (
                        "Vendor"
                      ) : (
                        "User"
                      )}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <div className="space-x-3">
                      {/* If user */}

                      {user.role === "user" ? (
                        <>
                          <button
                            onClick={() =>
                              handleRoleUpdate(user.email, "admin")
                            }
                            className="px-3 py-1 font-medium bg-[#9260da] text-white rounded hover:bg-[#7c4cc4] transition cursor-pointer"
                          >
                            Make Admin
                          </button>

                          <button
                            onClick={() =>
                              handleRoleUpdate(user.email, "vendor")
                            }
                            className="px-3 py-1 font-medium bg-[#00bb87] text-white rounded hover:bg-[#009f73] transition cursor-pointer"
                          >
                            Make Vendor
                          </button>
                        </>
                      ) : user.role === "admin" ? (
                        <span>Admin Account</span>
                      ) : (
                        <></>
                      )}

                      {/* If vendor */}

                      {user.isFraud ? (
                        <span className=" text-sm font-medium text-red-600 ">
                          Account Suspended
                        </span>
                      ) : user.role === "vendor" ? (
                        <button
                          onClick={() => handleFraud(user)}
                          className="flex items-center gap-1 px-3 py-1 font-medium bg-red-50 text-red-600 rounded border border-accent-content hover:bg-red-100 transition cursor-pointer"
                        >
                          <IoWarningOutline />
                          Mark as Fraud
                        </button>
                      ) : (
                        <></>
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
