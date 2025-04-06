import { Link } from "react-router-dom";

function AdminNavbar(){
  const navbar = [
    { navItem: "Dashboard", path: "/admin" },
    { navItem: "Users", path: "/admin/users" },
    { navItem: "Products", path: "/admin/products" },
    { navItem: "Orders", path: "/admin/orders" },
    { navItem: "Analytics", path: "/admin/analytics" },
    { navItem: "Reports", path: "/admin/reports" },
    { navItem: "Settings", path: "/admin/settings" },
  ];

  return (
    <nav className="bg-gray-800 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
        <ul className="flex space-x-5">
          {navbar.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-white hover:text-blue-400 transition duration-200 text-sm"
              >
                {item.navItem}
              </Link>
            </li>
          ))}
        </ul>
        {/* Manage Button */}
        <Link
          to="/admin/manage"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1.5 rounded-md text-sm transition duration-200"
        >
          ⚙️ Manage
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
