import {
  IncreseItem,
  decreseItem,
  RemoveItem,
  ClearCart,
} from "../store/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { productApi } from "../backend/product.api";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const navigate = useNavigate();
  const [cart, setcart] = useState([]);
  const [total, settotal] = useState(0);

  const cartDetails = useSelector((state) => state.CartSlice.cart);

  const increasecart = useCallback(
    async (data) => {
      let obj = { product: data._id, quantity: 1 };
      dispatch(IncreseItem(obj));
      await productApi.AddCart(token, obj);
    },
    [dispatch],
  );

  const Decrease = useCallback(
    async (data) => {
      let obj = { product: data._id, quantity: 1 };
      dispatch(decreseItem(obj));
      await productApi.DecreaseItem(token, obj);
    },
    [dispatch],
  );

  useEffect(() => {
    const fetchData = async () => {
      const productId = cartDetails.map((val) => val.product);
      const data = await productApi.FetchProductById(productId);

      for (let i = 0; i < cartDetails.length; i++) {
        data.data.products[i].quantity = cartDetails[i].quantity;
      }
      setcart(data.data.products);

      const totalamount = data.data.products.reduce(
        (acc, curr) => acc + curr.quantity * curr.price,
        0,
      );
      settotal(totalamount);
    };

    fetchData();
  }, [cartDetails]);

  const EmptyCart = async () => {
    dispatch(ClearCart());
    await productApi.ClearCartFromBackend(token);
  };

  async function remove(data) {
    let obj = { product: data._id, quantity: 1 };
    dispatch(RemoveItem(obj));
    await productApi.RemoveItem(token, obj);
  }

  const paymentProcess = async () => {
    const stripe = await loadStripe(
      "pk_test_51SKyvSQRAYiywOojl5OMbGGfnizWVYmFB6XmghtuF3Tal8ltgYSDnndAk5czfQKVxe6q3RIkV0p8zfnpOz9LiEM200oML0fZPv",
    );
    const body = { products: cartDetails };

    const response = await productApi.handlepayment(body, token);
    const stripeResponse = await stripe.redirectToCheckout({
      sessionId: response.data.session.id,
    });

    console.log(stripeResponse);
  };

  if (cart.length) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">
          Shopping Cart
        </h2>
        <div className="cart-items space-y-4">
          {cart.map((val) => {
            return (
              <div
                key={val._id}
                className="flex justify-between items-center bg-white p-4 shadow rounded-lg"
              >
                <div className="flex items-center gap-6">
                  <span className="text-lg font-semibold text-gray-800">
                    {val.title.length > 11
                      ? val.title.slice(0, 11) + "..."
                      : val.title}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    ₨.{val.price}
                  </span>

                  {/* 🛒 Stock Display (Styled) */}
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                    Stock: {val.stock}
                  </span>

                  <div className="flex items-center bg-gray-200 p-1 rounded-lg shadow">
                    <button
                      onClick={() => Decrease(val)}
                      className="px-3 py-1 text-lg text-gray-700 bg-yellow-500 hover:bg-yellow-600 rounded-l"
                    >
                      -
                    </button>
                    <span className="mx-3 font-semibold text-gray-900">
                      {cartDetails.map((data) => {
                        if (data.product === val._id) {
                          return data.quantity;
                        }
                        return null;
                      })}
                    </span>
                    <button
                      onClick={() => increasecart(val)}
                      disabled={val.quantity >= val.stock ? true : false}
                      className={`px-3 py-1 text-lg text-gray-700 bg-yellow-500 hover:bg-yellow-600 rounded-r ${
                        val.quantity >= val.stock
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => remove(val)}
                  className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        {/* Total Amount Section */}
        <div className="mt-6 p-4 bg-white shadow rounded-lg flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-semibold text-blue-600">
            ₨.{total}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={paymentProcess}
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-black transition duration-300"
          >
            Checkout
          </button>
          <button
            onClick={EmptyCart}
            className="w-full bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-700 transition duration-300"
          >
            Clear Cart
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-green-600">
          Your Cart is Empty
        </h2>
        <p className="text-gray-700 mt-2">
          Looks like you haven't added anything yet.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-black transition duration-300">
          Continue Shopping
        </button>
      </div>
    );
  }
}

export default CartPage;
