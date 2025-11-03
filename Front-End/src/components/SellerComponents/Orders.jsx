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
    console.log(data);

    const response = await productApi.changeOrderStatus(data, token);
    console.log(response.data);
  };

  useEffect(() => {
    const SellerOrderSetup = async () => {
      const data = await productApi.GetSellerOders(token);
      console.log(data);
      const { Orders } = data.data;
      const productid = Orders.map((val) => val.productid);
      const res = await productApi.FetchUserOrder(productid);
      console.log(res.data.productDetails);
      const { productDetails: products } = res.data;
      for (let i = 0; i < Orders.length; i++) {
        Orders[i].productDetails = products[i];
      }
      console.log(Orders);
      SetOrders(Orders);
      SetLoading(false);
    };
    SellerOrderSetup();
  }, []);
  if (Loading) return <Loader />;

  return (
    <div>
      {Orders &&
        Orders.map((val) => {
          return (
            <div className="bg-white h-[80px] w-[99vw] mx-auto flex items-center justify-between ">
              <img src={val.productDetails?.image} className="h-[90%]" alt="" />
              <span>{val.productDetails?.title}</span>
              <span>quantity : {val.quantity}</span>
              <span>PRice:{val.quantity * val.productDetails?.price}</span>
              <span>current status:{val.status}</span>
              chnage status
              <select onChange={(s) => handleOnChange(val, s)}>
                <option value="pending">peding</option>
                <option value="processing">processing</option>
                <option value="completed">completed</option>
              </select>
            </div>
          );
        })}
    </div>
  );
}

export default Orders;
