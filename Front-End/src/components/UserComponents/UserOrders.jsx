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
      console.log(res.data.productDetails);
      const { productDetails: products } = res.data;
      for (let i = 0; i < Orders.length; i++) {
        Orders[i].productDetails = products[i];
      }
      console.log(Orders);
      SetOrders(Orders);
      SetLoading(false);
    };
    getUserOrder();
  }, []);

  if (Loading) return <Loader />;

  return (
    <div>
      {Orders &&
        Orders.map((val) => {
          return (
            <div className="bg-white h-[80px] w-[98vw] mx-auto flex items-center justify-between ">
              <img src={val.productDetails?.image} className="h-[90%]" alt="" />
              <span>{val.productDetails?.title}</span>
              <span>quantity : {val.quantity}</span>
              <span>PRice:{val.quantity * val.productDetails?.price}</span>
              <span>Status:{val.status}</span>
            </div>
          );
        })}
    </div>
  );
}

export default UserOrders;
