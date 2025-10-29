import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import { ClearCart } from "../store/CartSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clicked, setclicked] = useState(faBars);
  const [display, setdisplay] = useState("hidden");
  const count = useSelector((state) => state.CartSlice.count);
  const [data, setData] = useState(0);
  const Auth = useSelector((state) => state.AuthSlice.status);
  const decode = useSelector((state) => state.AuthSlice.userDetails);

  console.log(clicked);

  const changeicon = () => {
    console.log(clicked);
    if (clicked == faBars) {
      setclicked(faTimes);
      setdisplay("block");
    } else {
      setclicked(faBars);
      setdisplay("hidden");
    }
  };

  useEffect(() => {
    setData(count);
  }, [count]);

  let userDetails;
  if (decode) {
    userDetails = jwtDecode(decode);
    console.log(userDetails);
  }
  console.log(userDetails);
  const navbar = [
    { navItem: "Home", path: "/", Auth: true },
    { navItem: "Login", path: "/login", Auth: !Auth },
    { navItem: "Register", path: "/register", Auth: !Auth },
    { navItem: "SellerSignup", path: "/register/seller", Auth: !Auth },
    {
      navItem: "AdminPanel",
      path: "/admin",
      Auth: Auth && userDetails?.role === "admin" ? true : false,
    },
    {
      navItem: "SellerDesk",
      path: "/SellerDashborad",
      Auth: Auth && userDetails?.role === "seller" ? true : false,
    },
  ];

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(ClearCart());
    navigate("/");
  };

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyShop</h1>
        <ul className=" space-x-2 items-center hidden md:flex">
          {navbar.map((item) => (
            <li key={item.navItem}>
              {item.Auth && (
                <Link to={item.path} className="cursor-pointer">
                  {item.navItem}
                </Link>
              )}
            </li>
          ))}

          {/* {Auth && ( 
  <li>
    <button 
    className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-600">
 <FontAwesomeIcon icon={faCartShopping}  className='text-2xl' />   
        <p className='inline-block text-black font-bold pl-1 '>{data}</p>
  </button>
  </li>
)} */}
        </ul>

        {Auth && (
          <li className="flex items-center space-x-1 mr-10 ">
            <button
              onClick={logoutHandler}
              className="cursor-pointer bg-red-500 px-3 mx-2 py-2 rounded-md transition-all  h-11 duration-300 hover:bg-red-600"
            >
              Logout
            </button>
            <button className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md transition-all duration-300  hover:bg-blue-600">
              <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
              <p className="inline-block text-black font-bold pl-1 ">{data}</p>
            </button>

            <Link
              to="/user"
              className="cursor-pointer bg-blue-500 px-4 py-2 rounded-lg transition-all duration-300  hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
            </Link>
          </li>
        )}
        {/* Mobile Menu Toggle Icon - Always Visible */}
        <div className="fixed top-4 right-4 z-50 md:hidden">
          <FontAwesomeIcon
            icon={clicked}
            className="text-2xl cursor-pointer text-white"
            onClick={changeicon}
          />
        </div>

        {/* Mobile Menu - Appears on Click */}
        <div className={`${display} inset-0 fixed bg-blue-700 md:hidden z-40`}>
          <h1 className="text-2xl font-bold">MyShop</h1>
          <div>
            {navbar.map((item) => (
              <li key={item.navItem} className="flex items-start">
                {item.Auth && (
                  <Link
                    to={item.path}
                    onClick={() => {
                      changeicon();
                    }}
                    className="cursor-pointer bg-black rounded-2xl pl-5 text-1xl w-full mt-2"
                  >
                    {item.navItem}
                  </Link>
                )}
              </li>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
