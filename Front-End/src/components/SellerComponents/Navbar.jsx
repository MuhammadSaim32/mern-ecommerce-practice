import { Link } from "react-router-dom";

const SellerNavbar = () => {
  const navbar = [
    { navItem: "My Products", path: "/SellerDashborad/products" },
    { navItem: "Out of Stock", path: "/SellerDashborad/out-of-stock" },
    { navItem: "Orders", path: "/SellerDashborad/orders" },
    { navItem: "Reviews", path: "/SellerDashborad/reviews" },
  ];

  return (
    <nav className="bg-orange-950 shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Seller Panel
        </h2>

        {/* Links - Desktop */}
        <ul className="hidden md:flex flex-1 justify-center space-x-6">
          {navbar.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-white hover:text-yellow-400 transition duration-200 text-sm md:text-base"
              >
                {item.navItem}
              </Link>
            </li>
          ))}
        </ul>

        {/* Add Product Button */}
        <Link
          to="/SellerDashborad/add-product"
          className="hidden md:inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg text-sm md:text-base transition duration-200"
        >
          ➕ Add Product
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white text-2xl">
          {/* Icon will go here */}☰
        </button>
      </div>

      {/* Mobile Menu - Visible only on small screens */}
      <div className="md:hidden px-4 py-3 space-y-3">
        {navbar.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block text-white hover:text-yellow-400 transition duration-200 text-sm"
          >
            {item.navItem}
          </Link>
        ))}
        <Link
          to="/SellerDashborad/add-product"
          className="block bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-3 py-2 rounded-md text-sm text-center transition duration-200"
        >
          ➕ Add Product
        </Link>
      </div>
    </nav>
  );
};

export default SellerNavbar;
