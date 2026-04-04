import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const result = await createUser(email, password);

      await updateUserProfile(name, imageURL);

      // await saveOrUpdateUser({ name, email, image: imageURL });

      console.log(result);
      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      // await saveOrUpdateUser({
      //   name: user?.displayName,
      //   email: user?.email,
      //   image: user?.photoURL,
      // });

      navigate(from, { replace: true });
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    // light - #F8FAFC dark - #002C3F
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-4 sm:py-6 lg:py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#002C3F]">Create Account</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Join TicketBari & start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CEB45F]"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Name cannot exceed 20 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-gray-600">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-[#CEB45F] file:text-black hover:file:bg-[#ffa633] cursor-pointer font-medium"
              {...register("image", {
                required: "Image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CEB45F]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#CEB45F]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message:
                    "Password must contain at least one uppercase and one lowercase letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#CEB45F]  text-black font-semibold hover:bg-[#ffa633] transition duration-300 shadow-md cursor-pointer"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-gray-400 text-sm">or continue with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white border border-[#CEB45F] shadow-sm hover:shadow-lg  transition-all duration-300 cursor-pointer"
          >
            <FcGoogle size={22} />

            <span className="text-[#002C3F] font-semibold">
              Continue with Google
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#CEB45F] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
