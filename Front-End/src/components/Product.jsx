import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/CartSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { productApi } from "../backend/product.api";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import Loader from "./Loader.jsx";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, Setproduct] = useState("");
  const [addedProductIds, setAddedProductIds] = useState([]);
  const cartDetails = useSelector((state) => state.CartSlice.cart);
  const userStatus = useSelector((state) => state.AuthSlice.status);
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [content, SetContent] = useState("");
  const [edit, setEdit] = useState(false);
  const [CuR, SetCuR] = useState("");
  const [submit, setSubmit] = useState("edit");
  let userDetails;
  if (token) {
    try {
      userDetails = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err);
      userDetails = null;
    }
  } else {
    userDetails = false;
  }
  const AddReview = async () => {
    const data = await productApi.AddReview(content, token, product?._id);
  };

  let reviewArray = [];
  reviewArray = product?.review?.map((val) => val.userid);
  const handledelete = async () => {
    const data = await productApi.deleteReview(token, product._id);
  };

  useEffect(() => {
    const call = async () => {
      const data = await productApi.getproductByproductid(id);
      Setproduct(data.data.product);
    };
    call();
  }, [AddReview, handledelete]);

  useEffect(() => {
    const product = cartDetails.map((val) => val.product);
    setAddedProductIds((prev) => [...prev, ...product]);
  }, [cartDetails]);

  const handlereview = (evt) => {
    SetContent(evt.target.value);
  };

  const handleEdit = async () => {
    setEdit((prev) => !prev);
    if (submit == "edit") {
      setSubmit("submit");
    } else {
      const data = await productApi.AddReview(CuR, token, product?._id);
      setSubmit("edit");
    }
  };

  const handleReviewChange = (evt) => {
    SetCuR(evt.target.value);
  };
  const addCart = async (product) => {
    let obj = {
      product: product._id,
      quantity: 1,
    };

    dispatch(addToCart(obj));
    setAddedProductIds((prev) => [...prev, obj.product]);
    const response = await productApi.AddCart(token, obj);
  };

  if (!product) return <Loader />;

  return (
    <div className="relative w-screen overflow-x-hidden bg-white text-orange-950 min-h-screen">
      <div className="container mx-auto px-4 md:px-12 py-12 w-full max-w-screen-lg">
        {/* Grid: Image + Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="w-full flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between w-full max-w-full">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold break-words text-wrap">
                {product.title}
              </h1>
              <p className="text-2xl text-orange-600 font-semibold mt-4">
                ${product.price}
              </p>
              <p className="text-gray-700 mt-6 text-base min-h-auto   text-wrap inline-block">
                {product.description}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Add to Cart / View Cart */}
            <div className="mt-8 flex gap-4 w-full">
              {addedProductIds.includes(product._id) ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-1/2 bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition duration-300"
                >
                  View Cart
                </button>
              ) : (
                <button
                  onClick={() => addCart(product)}
                  disabled={!userStatus || product.stock <= 0}
                  className={`w-1/2 py-3 rounded-lg text-white transition duration-300 ${
                    product.stock <= 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-950 hover:bg-black"
                  }`}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Review Input Section */}
        {userStatus && !reviewArray.includes(userDetails?.id) && (
          <div className="mt-12 flex flex-col md:flex-row gap-4 w-full max-w-full">
            <textarea
              value={content}
              onChange={handlereview}
              placeholder="Write your review..."
              className="flex-1 p-4 border border-orange-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-950 min-h-[100px] w-full max-w-full"
            />
            <button
              onClick={AddReview}
              className="bg-orange-950 text-white px-6 py-4 rounded-lg hover:bg-black transition duration-300"
            >
              Submit
            </button>
          </div>
        )}

        {/* Existing Reviews */}
        <div className="mt-12 flex flex-col gap-4 w-full max-w-full">
          {product.review?.map((val) => (
            <div
              key={val._id}
              className="bg-gray-100 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full max-w-full"
            >
              <textarea
                readOnly={!(edit && val.userid === userDetails?.id)}
                onChange={handleReviewChange}
                className="flex-1 p-2 bg-white border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-950 w-full max-w-full"
                key={val.userid}
              >
                {val.content}
              </textarea>

              <div className="flex gap-2">
                {val.userid === userDetails?.id && (
                  <>
                    <button
                      className="bg-amber-400 px-4 py-2 rounded-lg hover:bg-amber-500 transition duration-300"
                      onClick={handleEdit}
                    >
                      {submit}
                    </button>
                    <button
                      className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 text-white"
                      onClick={() => handledelete(val._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
