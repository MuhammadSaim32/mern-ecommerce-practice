import { useSelector } from "react-redux";
import { productApi } from "../../backend/product.api.js";
import { useEffect, useState } from "react";
import { Loader } from "../export.js";
function Orders() {
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [Orders, SetOrders] = useState([]);
  const [Loading, SetLoading] = useState(true);

  const handleOnChange = async (data, s) => {
    data.updaterequest = s.target.value;

    const response = await productApi.changeOrderStatus(data, token);
  };

  useEffect(() => {
    const SellerOrderSetup = async () => {
      const data = await productApi.GetSellerOders(token);
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
    SellerOrderSetup();
  }, []);
  if (Loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {Orders && Orders.length ? (
        <div className="space-y-4">
          {Orders.map((val) => (
            <div
              key={val._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow hover:shadow-lg transition gap-4"
            >
              {/* Product Image */}
              <img
                src={val.productDetails?.image}
                alt={val.productDetails?.title}
                className="w-full sm:w-24 h-24 object-cover rounded-lg"
              />

              {/* Product Info */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                <span className="text-orange-950 font-semibold text-sm sm:text-base">
                  {val.productDetails?.title}
                </span>
                <span className="text-gray-700 text-sm">
                  Qty: {val.quantity}
                </span>
                <span className="text-orange-600 font-semibold text-sm">
                  Price: ₨.{val.quantity * val.productDetails?.price}
                </span>
                <span className="text-gray-600 text-sm">
                  Status: {val.status}
                </span>
              </div>

              {/* Change Status */}
              <div className="flex flex-col items-center gap-2">
                <label className="text-sm text-gray-700">Change Status</label>
                <select
                  onChange={(s) => handleOnChange(val, s)}
                  className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-950"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>
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

export default Orders;
