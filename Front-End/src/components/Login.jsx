import React from 'react';
import { useForm } from "react-hook-form";
import userAuth from '../backend/users.Api';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/AuthSlice'; 
import { CartFromBackend } from '../store/CartSlice';

function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginUser = async (data) => {
    const response = await userAuth.loginUser(data).catch((err) => {
      console.log(err.message);
    });
    if (response?.data?.token) {
      dispatch(login(response?.data?.token));
      dispatch(CartFromBackend(response?.data?.cart));
      navigate(response?.data?.redirect);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-blue-800 p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-white mb-4">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit((data)=>LoginUser(data))} >
          {/* Email */}
          <div>
            <label className="block text-white font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 chars" },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-white hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;