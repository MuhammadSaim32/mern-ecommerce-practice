import React, { useEffect, useState } from "react";
import { productApi } from "../../backend/product.api";
import { useSelector } from "react-redux";
import { Loader } from "../export";

function OutOfStockProducts() {
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [outOfStock, setOutOfStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.GetOutOfStockProducts(token).then((data) => {
      setOutOfStock(data?.data?.products || []);
      setLoading(false);
    });
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-950">
        Out of Stock Products
      </h2>

      {loading ? (
        <Loader />
      ) : outOfStock.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No products are currently out of stock.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {outOfStock.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 truncate">
                {product.name}
              </h3>
              <p className="text-red-600 font-bold mb-2">Out of Stock</p>
              {product.price && (
                <p className="text-gray-600 font-medium">
                  Price: Rs. {product.price}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OutOfStockProducts;
