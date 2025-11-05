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
  let userDetails = jwtDecode(token);

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
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mt-4">
              ${product.price}
            </p>
            <p className="text-gray-700 mt-6 text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-10">
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
          </div>
        </div>
      </div>
      <div>
        {userStatus && !reviewArray.includes(userDetails.id) && (
          <>
            <input
              type="text"
              value={content}
              placeholder="Enter your review about product"
              className="h-[95px] w-[80vw] border-amber-500 focus"
              onChange={handlereview}
            />
            <button
              onClick={AddReview}
              className="bg-black text-white h-[60px] w-[90px] cursor-pointer"
            >
              Submit
            </button>
          </>
        )}
        <div className="border-black rounded-lg min-h-[60px]  max-h-auto w-[90vw] bg-gray-500">
          {product.review &&
            product.review.map((val) => {
              return (
                <div key={val._id} className="text-center">
                  <textarea
                    className="inline-block"
                    readOnly={
                      edit && val.userid == userDetails.id ? false : true
                    }
                    onChange={handleReviewChange}
                  >
                    {val.content}
                  </textarea>
                  {val.userid === userDetails.id ? (
                    <button
                      className="bg-amber-300 cursor-pointer"
                      onClick={handleEdit}
                    >
                      {submit}
                    </button>
                  ) : (
                    <></>
                  )}
                  {val.userid === userDetails.id ? (
                    <button
                      className="bg-red-600 cursor-pointer"
                      onClick={() => handledelete(val._id)}
                    >
                      Deltete
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
