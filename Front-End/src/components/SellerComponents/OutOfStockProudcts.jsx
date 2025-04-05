import React, { useEffect, useState } from "react";
import { productApi } from "../../backend/product.api";
import { useSelector } from "react-redux";
import {Loader} from "../export"


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
      <h2 className="text-2xl font-semibold mb-4">Out of Stock Products</h2>

      {loading ? (
        <Loader/>
      ) : outOfStock.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No products are currently out of stock.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {outOfStock.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-red-500 font-semibold">Out of Stock</p>
              {product.price && (
                <p className="text-gray-600 mt-1">Price: Rs. {product.price}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OutOfStockProducts;
