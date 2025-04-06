import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Product() {
  const { state } = useLocation();
  const { image, title, description, price } = state;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
            <p className="text-2xl text-blue-600 font-semibold mt-4">${price}</p>
            <p className="text-gray-700 mt-6 text-base leading-relaxed">{description}</p>
          </div>

          <div className="mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300 w-full md:w-auto">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
