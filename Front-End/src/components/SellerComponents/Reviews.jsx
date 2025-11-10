import { productApi } from "../../backend/product.api.js";
import { useEffect, useState } from "react";
import Loader from "../Loader.jsx";
import { useSelector } from "react-redux";

function Reviews() {
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [Loading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  useEffect(() => {
    productApi.GetSellerProducts(token).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  if (Loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 md:px-12 py-12 w-full max-w-screen-lg">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-950 mb-8">
        Product Reviews
      </h1>

      <div className="flex flex-col gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-start"
          >
            {/* Product Image */}
            <div className="w-full md:w-1/4 flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 md:h-32 object-cover rounded-xl"
              />
            </div>

            {/* Product Info & Reviews */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              <h2 className="text-xl md:text-2xl font-semibold text-orange-950">
                {product.title}
              </h2>
              {product.review && product.review.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {product.review.map((r, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 p-3 rounded-xl shadow-sm text-gray-800 break-words"
                    >
                      {r.content}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Reviews;
