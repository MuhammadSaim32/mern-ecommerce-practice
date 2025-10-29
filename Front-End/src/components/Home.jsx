import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productApi } from "../backend/product.api";
import { Loader } from "./export";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [addedProductIds, setAddedProductIds] = useState([]);
  const cartDetails = useSelector((state) => state.CartSlice.cart);
  const userStatus = useSelector((state) => state.AuthSlice.status);
  const token = useSelector((state) => state.AuthSlice.userDetails);

  console.log(cartDetails);

  useEffect(() => {
    productApi.GetAllProducts().then((data) => {
      setproducts(data);
      setloading(false);
    });
  }, []);

  useEffect(() => {
    const product = cartDetails.map((val) => val.product);
    console.log(product);
    setAddedProductIds(product);
  }, [cartDetails]);

  const addCart = async (product) => {
    let obj = {
      product: product._id,
      quantity: 1,
    };

    dispatch(addToCart(obj));
    setAddedProductIds((prev) => [...prev, obj.product]);
    const response = await productApi.AddCart(token, obj);
    console.log(response);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-green-600 text-white text-center py-20">
        <h2 className="text-5xl font-bold">Discover the Best Deals</h2>
        <p className="mt-4 text-xl">
          Shop quality products at the best prices.
        </p>
        <button className="mt-6 bg-yellow-500 px-8 py-3 rounded-lg text-white hover:bg-yellow-600 transition duration-300">
          Shop Now
        </button>
      </header>

      {/* Centered Message for Not Logged In Users */}
      {!userStatus && (
        <div className="flex justify-center items-center my-8">
          <p className="text-red-500 text-center">
            You must be logged in to add items to the cart or buy.
          </p>
        </div>
      )}

      {/* Product Listing */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-3xl font-semibold text-gray-700 mb-8">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
              key={product._id}
            >
              <Link
                state={{
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                }}
                to={`/product/${product._id}`}
                className="block"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold">{product.name}</h4>
                  <p className="text-blue-600 font-semibold mt-2">
                    Rs: {product.price}
                  </p>
                </div>
              </Link>
              <div className="flex">
                {addedProductIds.includes(product._id) ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className=" hover:cursor-pointer  w-1/2 bg-black text-white py-2 px-4 rounded-bl-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition duration-300 "
                  >
                    View Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addCart(product)}
                    disabled={!userStatus || product.stock <= 0 ? true : false}
                    className={`w-1/2 bg-blue-600 text-white py-2 px-4 rounded-bl-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black transition duration-300
                    ${product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Add to Cart
                  </button>
                )}
                <div className="w-1/2 bg-gray-200 text-gray-800 py-2 px-4 rounded-br-lg flex justify-center items-center text-sm font-semibold">
                  {product.stock > 0
                    ? `Stock: ${product.stock}`
                    : "Out of Stock"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
