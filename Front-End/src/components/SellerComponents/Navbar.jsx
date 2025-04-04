import { Link } from "react-router-dom";

const SellerNavbar = () => {
  const navbar = [
    { navItem: "Dashboard", path: "/SellerDashborad" },
    { navItem: "My Products", path: "/SellerDashborad/products" },
    { navItem: "Out of Stock", path: "/SellerDashborad/out-of-stock" },
    { navItem: "Orders", path: "/SellerDashborad/orders" },
    { navItem: "Earnings", path: "/SellerDashborad/earnings" },
    { navItem: "Reviews", path: "/SellerDashborad/reviews" },
    { navItem: "Settings", path: "/SellerDashborad/settings" },
  ];

  return (
    <nav className="bg-blue-700 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold text-white">Seller Panel</h2>
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
        {/* Add Product Button */}
        <Link
          to="/SellerDashborad/add-product"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-3 py-1.5 rounded-md text-sm transition duration-200"
        >
          ➕ Add Product
        </Link>
      </div>
    </nav>
  );
};

export default SellerNavbar;