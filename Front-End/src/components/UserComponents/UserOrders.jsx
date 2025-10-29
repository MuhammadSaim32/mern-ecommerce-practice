import { useSelector } from "react-redux";
import { productApi } from "../../backend/product.api.js";
import { useEffect, useState } from "react";
import { Loader } from "../export.js";
function UserOrders() {
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [Orders, SetOrders] = useState([]);
  const [Loading, SetLoading] = useState(true);
  useEffect(() => {
    productApi.GetSellerOders(token).then((data) => {
      const { Orders } = data.data;
      SetOrders(Orders);
      SetLoading(false);
    });
  }, []);
  if (Loading) return <Loader />;

  return (
    <div>
      {Orders &&
        Orders.map((val) => {
          return (
            <div className="bg-black h-[80px] w-[98vw] mx-auto flex "></div>
          );
        })}
    </div>
  );
}

export default UserOrders;
