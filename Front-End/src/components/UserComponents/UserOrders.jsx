import { useSelector } from "react-redux";
import { productApi } from "../../backend/product.api.js";
import { useEffect, useState } from "react";
import { Loader } from "../export.js";
function UserOrders() {
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [Orders, SetOrders] = useState([]);
  const [Loading, SetLoading] = useState(true);
  useEffect(() => {
    const getUserOrder = async () => {
      const data = await productApi.fetchUserOrder(token);
      const { Orders } = data.data;
      const productid = Orders.map((val) => val.productid);
      const res = await productApi.FetchUserOrder(productid);
      const { productDetails: products } = res.data;
      for (let i = 0; i < Orders.length; i++) {
        Orders[i].productDetails = products[i];
      }
      SetOrders(Orders);
      SetLoading(false);
    };
    getUserOrder();
  }, []);

  if (Loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {Orders && Orders.length ? (
        <div className="space-y-4">
          {Orders.map((val) => (
            <div
              key={val._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-lg transition gap-3 w-full sm:w-[98%] mx-auto"
            >
              {/* Product Image */}
              <img
                src={val.productDetails?.image}
                alt={val.productDetails?.title}
                className="w-full sm:w-20 h-20 object-cover rounded-lg"
              />

              {/* Product Info */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full text-sm">
                <span className="text-orange-950 font-semibold">
                  {val.productDetails?.title}
                </span>
                <span className="text-gray-700">Qty: {val.quantity}</span>
                <span className="text-orange-600 font-semibold">
                  Price: ₨.{val.quantity * val.productDetails?.price}
                </span>
                <span className="text-gray-600">Status: {val.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>No orders found.</p>
        </div>
      )}
    </div>
  );
}

export default UserOrders;
