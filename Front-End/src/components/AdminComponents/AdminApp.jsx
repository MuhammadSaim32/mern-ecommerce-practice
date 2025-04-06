import {AdminNavbar} from "./admin.export"
import {Outlet} from "react-router-dom"

function AdminApp() {
  return (
    <>
    <AdminNavbar/>
    <Outlet/>
    </>

  )
}

export default AdminApp