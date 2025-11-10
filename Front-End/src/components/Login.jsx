import React from "react";
import { useForm } from "react-hook-form";
import userAuth from "../backend/users.Api";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import { CartFromBackend } from "../store/CartSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-orange-950 p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form
          className="space-y-6"
          onSubmit={handleSubmit((data) => LoginUser(data))}
        >
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
            {isSubmitting ? "Submitting..." : "Login"}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-white hover:underline transition"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
