import { Link } from "react-router-dom";

function AdminNavbar() {
  const navbar = [
    { navItem: "Users", path: "/admin/users" },
    { navItem: "Products", path: "/admin/products" },
  ];

  return (
    <nav className="bg-orange-950 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
        <ul className="flex space-x-5">
          {navbar.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-white hover:text-yellow-500 transition duration-200 text-sm"
              >
                {item.navItem}
              </Link>
            </li>
          ))}
        </ul>
        {/* Manage Button can be added here if needed */}
      </div>
    </nav>
  );
}

export default AdminNavbar;
