import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/Shared/Container/Container";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      setIsSubmitting(true);
      const imageURL = await imageUpload(imageFile);

      const result = await createUser(email, password);

      await updateUserProfile(name, imageURL);

      await saveOrUpdateUser({ name, email, image: imageURL });

      console.log(result);

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <div className="min-h-screen flex items-center justify-center bg-base-100 pb-10 md:pb-16 md:pt-30 pt-26 ">
          <div className="w-full max-w-md bg-secondary rounded-2xl shadow-xl p-4 md:p-8 border border-accent-content">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-primary-content">
                Create Account
              </h1>
              <p className="text-secondary-content mt-2 font-medium">
                Join TicketBari and start booking
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm text-secondary-content">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input-style"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Name cannot exceed 20 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label className="text-sm text-secondary-content">
                  Profile Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full mt-1 text-sm text-secondary-content file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-primary/90 bg-base-100 px-4 py-3 rounded-lg border border-accent-content  file:text-primary-content hover:file:bg-primary cursor-pointer font-medium"
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
                <label className="text-sm text-secondary-content">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input-style"
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
                <label className="text-sm text-secondary-content">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="input-style"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-primary text-secondary font-semibold hover:bg-primary/90 transition duration-300 shadow-md cursor-pointer"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-accent-content"></div>
              <p className="px-3 text-secondary-content text-sm">
                or continue with
              </p>
              <div className="flex-1 h-px bg-accent-content"></div>
            </div>

            {/* Google */}
            <div className="flex justify-center w-full">
              <button
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="group w-full flex items-center justify-center gap-3 py-3 rounded-xl border-[1.5px] border-accent-content bg-secondary text-primary-content font-semibold text-sm shadow-sm hover:shadow-md hover:bg-base-200 transition-all duration-200 disabled:opacity-80 cursor-pointer disabled:cursor-not-allowed"
              >
                {/* Icon */}
                <FcGoogle className="text-xl transition-transform duration-200 group-hover:scale-110" />

                {/* Text */}
                <span className="text-primary-content font-semibold">
                  {googleLoading ? "Signing in..." : "Continue with Google"}
                </span>
              </button>
            </div>

            <p className="text-center text-secondary-content mt-6 text-sm">
              Already have an account ?&nbsp;
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
