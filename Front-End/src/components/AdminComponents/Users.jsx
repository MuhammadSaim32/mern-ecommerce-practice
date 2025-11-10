import { useEffect, useState } from "react";
import userAuth from "../../backend/users.Api";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { Link } from "react-router-dom";

function Users() {
  const token = useSelector((state) => state.AuthSlice.userDetails);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userAuth.GetAllUser(token).then((data) => {
      setUsers(data?.data?.users || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-950">
        All Users
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-orange-950 text-white text-sm">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Manage</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.username}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4">
                    <Link
                      to="/admin/manage/users"
                      state={user}
                      className="bg-orange-950 hover:bg-orange-800 text-white font-medium px-3 py-1.5 rounded-md text-sm transition duration-200"
                    >
                      ⚙️ Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
