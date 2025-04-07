import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../backend/axios.api"
import { useNavigate } from 'react-router-dom';

function ManageUsers() {
  const { state } = useLocation();
  const [role, setRole] = useState(['admin', 'customer', 'seller']);
  const { username, email, role: currentRole, _id, cart } = state || {};
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username,
      email,
      role: currentRole,
    },
  });

  const onSubmit =  async (data) => {
  const response =   await api.post(`/users/save-changes?id=${_id}`,data)
  navigate('/admin/users')

 
  };

  const deleteUser = async () => {
   const response  =  await api.delete(`/users/delete/?id=${_id}`)
   navigate('/admin/users')
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage User: {username}</h2>

      {/* Redesigned Cart Section */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center bg-indigo-100 py-3 px-6 rounded-full shadow-lg">
          <FontAwesomeIcon icon={faCartShopping} className="text-indigo-600 text-3xl mr-3" />
          <span className="text-xl font-bold text-indigo-700">{cart?.length || 0}</span>
          <span className="text-indigo-600 ml-2">Items in Cart</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Username Field */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-lg font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            disabled
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className="p-3 border border-gray-300 rounded-md shadow-sm"
            disabled
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Role Field */}
        <div className="flex flex-col">
          <label htmlFor="role" className="text-lg font-medium mb-2">
            Role
          </label>
          <select
            id="role"
            {...register('role', { required: 'Role is required' })}
            className="p-3 border border-gray-300 rounded-md shadow-sm"
          >
            {role.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete User Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={deleteUser}
          className="px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}

export default ManageUsers;