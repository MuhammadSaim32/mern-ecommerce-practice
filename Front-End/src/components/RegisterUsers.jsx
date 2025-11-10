import React, { useState } from "react";
import { useForm } from "react-hook-form";
import userAuth from "../backend/users.Api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function RegisterUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    is,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const Register = async (data) => {
    const response = await userAuth
      .registerUser(data, pathname)
      .catch((err) => {
        console.log(err.message);
      });
    if (response) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-orange-950 p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Register
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => Register(data))}
        >
          {/* Username */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 chars" },
              })}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;

