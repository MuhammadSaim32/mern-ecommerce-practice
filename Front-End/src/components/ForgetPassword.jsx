import React, { useState } from "react";
import userAuth from "../backend/users.Api";
import { useForm } from "react-hook-form";

function ForgetPassword() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    userAuth.ForgotPassword(data).then((response) => {
      setMessage(response.data.message);
    });
  };

  return !message ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-orange-950 p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Reset Password
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : (
    <p className="text-black text-center mt-10 text-lg">{message}</p>
  );
}

export default ForgetPassword;
