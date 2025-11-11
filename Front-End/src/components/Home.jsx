import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productApi } from "../backend/product.api";
import { Loader } from "./export";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import hero0 from "./../assets/hero0.jpg";
import bh from "./../assets/b-h.jpg";
import sh from "./../assets/sh.jpg";
import ci from "./../assets/ci.jpg";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [addedProductIds, setAddedProductIds] = useState([]);
  const cartDetails = useSelector((state) => state.CartSlice.cart);
  const userStatus = useSelector((state) => state.AuthSlice.status);
  const token = useSelector((state) => state.AuthSlice.userDetails);

  useEffect(() => {
    productApi.GetAllProducts().then((data) => {
      setproducts(data);
      setloading(false);
    });
  }, []);

  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    gsap.set(".shop", { xPercent: 15 });

    gsap.to(".shop", {
      xPercent: -20,
      duration: 2,
      scrollTrigger: {
        trigger: ".p",
        start: "top 20%",
        end: "+=2000",
        scrub: 1,
        pin: true,
      },
    });
  });

  useEffect(() => {
    const product = cartDetails.map((val) => val.product);
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
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen overflow-x-hidden bg-white text-orange-950 font-serif">
      {/* Hero Section */}

      <header className="flex flex-col md:flex-row h-[80vh] w-full px-6 py-4 gap-3">
        {/* Large Hero Image */}
        <div
          className="flex-1 rounded-2xl shadow-md relative overflow-hidden"
          style={{
            backgroundImage: `url(${hero0})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay Text */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-md text-xl font-bold">
            Ultimate Tech Deals
          </div>
        </div>

        {/* Smaller Side Images */}
        <div className="flex flex-col flex-[0.4] gap-3">
          <div
            className="flex-1 rounded-2xl shadow-md relative overflow-hidden"
            style={{
              backgroundImage: `url(${sh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-lg font-semibold">
              New Arrivals
            </div>
          </div>
          <div
            className="flex-1 rounded-2xl shadow-md relative overflow-hidden"
            style={{
              backgroundImage: `url(${bh})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-lg font-semibold">
              Trending Products
            </div>
          </div>
        </div>
      </header>
      {/* About Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 py-20 gap-10 bg-orange-50">
        <div className="flex flex-col gap-5 md:w-1/2">
          <h3 className="text-3xl font-bold text-orange-950 uppercase tracking-wide">
            About Us
          </h3>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Computer Internals Online Shop
          </h1>
          <p className="text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold">Computer Internals</span>{" "}
            – your 24/7 destination for tech and computer products. Explore
            high-quality components, accessories, and gadgets for all your
            computing needs.
          </p>
          <button className="w-fit px-6 py-3 bg-orange-950 text-white rounded-full hover:bg-black transition duration-300">
            Explore More
          </button>
        </div>

        <div
          className="w-full md:w-[40%] h-[50vh] rounded-2xl shadow-md"
          style={{
            backgroundImage: `url(${ci})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </section>

      {/* Not Logged In Message */}
      {!userStatus && (
        <div className="flex items-center justify-center py-8">
          <p className="text-red-800 font-bold bg-red-50 px-6 py-3 rounded-lg shadow-sm">
            You must be logged in to add items to the cart or buy.
          </p>
        </div>
      )}

      {/* Products Section */}
      <section className="container mx-auto py-16 px-6 md:px-12">
        <h3 className="text-3xl md:text-4xl font-bold text-orange-950 mb-10 text-center">
          Featured Products
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <Link to={`/product/${product._id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold text-gray-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-orange-950 font-semibold mt-2">
                    Rs: {product.price}
                  </p>
                </div>
              </Link>

              <div className="flex mt-auto">
                {addedProductIds.includes(product._id) ? (
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-1/2 bg-black text-white py-3 hover:bg-gray-900 transition duration-300 rounded-bl-2xl"
                  >
                    View Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addCart(product)}
                    disabled={!userStatus || product.stock <= 0}
                    className={`w-1/2 py-3 rounded-bl-2xl text-white transition duration-300 ${
                      product.stock <= 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-orange-950 hover:bg-black"
                    }`}
                  >
                    Add to Cart
                  </button>
                )}
                <div className="w-1/2 bg-orange-100 text-orange-950 py-3 flex justify-center items-center font-medium rounded-br-2xl">
                  {product.stock > 0
                    ? `Stock: ${product.stock}`
                    : "Out of Stock"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Section */}
      </section>
      <div className="p bg-orange-950 mt-20 w-[100vw] flex justify-center items-center overflow-hidden">
        <h1 className="text-[25vh] md:text-[40vh] text-white font-extrabold shop  text-nowrap">
          SHOP NOW
        </h1>
      </div>
    </div>
  );
}
