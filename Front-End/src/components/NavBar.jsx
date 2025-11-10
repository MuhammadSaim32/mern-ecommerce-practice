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

  const changeicon = () => {
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
  }
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
    <nav className="bg-white shadow-md font-serif sticky top-0 z-50 w-full">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-12 h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-950">MyShop</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center text-black font-medium">
          {navbar.map((item) =>
            item.Auth ? (
              <li key={item.navItem}>
                <Link
                  to={item.path}
                  className="hover:text-orange-600 transition-colors duration-300"
                >
                  {item.navItem}
                </Link>
              </li>
            ) : null,
          )}
        </ul>

        {/* Auth Buttons */}
        {Auth && (
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={logoutHandler}
              className="bg-orange-950 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
            <button className="relative bg-orange-950 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300">
              <FontAwesomeIcon icon={faCartShopping} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs font-bold text-white rounded-full px-2">
                {data}
              </span>
            </button>
            <Link
              to="/user"
              className="bg-orange-950 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        )}

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={clicked}
            className="text-2xl cursor-pointer text-orange-950"
            onClick={changeicon}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${display} fixed inset-0 bg-orange-950 z-40 px-6 py-10 md:hidden flex flex-col`}
      >
        <h1 className="text-2xl font-bold text-white mb-6">MyShop</h1>
        <ul className="flex flex-col space-y-4">
          {navbar.map(
            (item) =>
              item.Auth && (
                <li key={item.navItem}>
                  <Link
                    to={item.path}
                    onClick={changeicon}
                    className="block text-white bg-black rounded-lg px-4 py-2 hover:bg-orange-600 transition duration-300"
                  >
                    {item.navItem}
                  </Link>
                </li>
              ),
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
