import React, { useState } from 'react';
import userAuth from "../backend/users.Api";
import { useForm } from 'react-hook-form';

function ForgetPassword() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("Reset email submitted", data.email);
    userAuth.ForgotPassword(data)
      .then((response) => {
        setMessage(response.data.message);
      })
      
  };

  return  !message ?(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-800 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Reset Password
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  ):(
    <p className="text-back text-center mb-4">{message}</p>

  )
}

export default ForgetPassword;