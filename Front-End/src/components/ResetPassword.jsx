import React from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from "react-router-dom";
import userAuth from '../backend/users.Api';
import { useState } from 'react';

function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken"); 
  const [message,setmessage]= useState("")
  const password = watch("password", "");

  const onSubmit = (data) => {
    console.log("New password set", data);
    if(resetToken){
    userAuth.ResetPassword(data,resetToken).then((data)=>{
      console.log(data.data.message)
      setmessage(data.data.message)
    })
  }
  };

  return !message ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-800 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <div>
            <label className="block text-white font-medium">New Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must have at least 6 characters" },
                maxLength:{value:8,message:"Password maximum length must be 8"}
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter new password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm New Password Field */}
          <div>
            <label className="block text-white font-medium">Confirm New Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  ):(
    <h1>{message}</h1>
  )
}

export default ResetPassword;