import { Link } from "react-router-dom";

const UserNavBar = () => {
  const navbar = [{ navItem: "orders", path: "/user/orders" }];

  return (
    <nav className="bg-orange-950 py-3 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-3">
        {/* Title */}
        <h2 className="text-xl font-semibold text-white">User Details</h2>

        {/* Navigation Links */}
        <ul className="flex flex-col sm:flex-row sm:space-x-5 space-y-2 sm:space-y-0 text-white">
          {navbar.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="hover:bg-white hover:text-orange-950 px-3 py-1 rounded-md transition duration-200 text-sm"
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
