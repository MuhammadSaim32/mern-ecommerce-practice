import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AdminAuth({ children }) {
  const Auth = useSelector((state) => state.AuthSlice.status);
  const decode = useSelector((state) => state.AuthSlice.userDetails);
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth == false || userDetails.role != "admin") {
      navigate("/");
    }
  });
  let userDetails;
  if (decode) {
    userDetails = jwtDecode(decode);
  }

  return <div>{children}</div>;
}

export default AdminAuth;
