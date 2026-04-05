import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });
  console.log(users);

  const handleRoleUpdate = async (email, role) => {
    try {
      await axiosSecure.patch("/update-role", {
        email,
        role,
      });
      toast.success("Role Updated!");
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFraud = async (id) => {
    try {
      await axiosSecure.patch(`/users/fraud/${id}`);
      console.log(id);
      refetch()
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-600"
                        : user.role === "vendor"
                          ? "bg-indigo-100 text-indigo-600"
                          : user.role === "fraud"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="space-x-2">
                  <div className="space-x-3">
                    {/* If user */}
                    {user.role === "user" && (
                      <>
                        <button
                          onClick={() => handleRoleUpdate(user.email, "admin")}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Make Admin
                        </button>

                        <button
                          onClick={() => handleRoleUpdate(user.email, "vendor")}
                          className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                        >
                          Make Vendor
                        </button>
                      </>
                    )}

                    {/* If vendor */}
                    {user.role === "vendor" && !user.isFraud && (
                      <button
                        onClick={() => handleFraud(user._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
