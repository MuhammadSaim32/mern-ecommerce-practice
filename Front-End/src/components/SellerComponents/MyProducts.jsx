import React, { useEffect, useState } from "react";
import { productApi } from "../../backend/product.api";
import { useSelector } from "react-redux";
import { Loader } from "../export";
import { Link } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.AuthSlice.userDetails);

  const DeleteProduct = (product) => {
    productApi.DeleteProduct(product._id, token).then(() => {
      GetAllproducts(token);
    });
  };

  const GetAllproducts = (token) => {
    productApi.GetSellerProducts(token).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetAllproducts(token);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 md:px-12 py-10 w-full max-w-screen-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-950 mb-10">
        My Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No products found. Add new products!
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="w-full h-56 md:h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-orange-950 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-orange-600 mt-2">
                    ${product.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-between items-center">
                    <Link
                      state={product}
                      to="/SellerDashborad/add-product"
                      className="bg-orange-950 text-white px-4 py-2 rounded-lg hover:bg-black transition text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => DeleteProduct(product)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
