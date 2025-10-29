import { Outlet } from "react-router-dom";
import { UserNavBar } from "./user.export.js";
function UserProfile() {
  return (
    <div>
      <UserNavBar />
      <Outlet />
    </div>
  );
}

export default UserProfile;
