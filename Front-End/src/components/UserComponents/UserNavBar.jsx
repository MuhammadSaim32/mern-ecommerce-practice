import { Link } from "react-router-dom";

const UserNavBar = () => {
  const navbar = [{ navItem: "orders", path: "/user/orders" }];

  return (
    <nav className="bg-blue-700 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold text-white">User Details</h2>
        <ul className="flex space-x-5">
          {navbar.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-white hover:text-yellow-400 transition duration-200 text-sm"
              >
                {item.navItem}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default UserNavBar;
