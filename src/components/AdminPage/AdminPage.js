import React from "react"
import AdminNavBar from "./AdminNavBar/AdminNavBar"
import AdminOrders from "./AdminOrders/AdminOrders"
import AdminHeader from "./AdminHeader/AdminHeader"
import { withRouter } from "react-router-dom"
import "./AdminPage.scss"
import AdminFooter from "./AdminFooter/AdminFooter"

const AdminPage = ({ location }) => {
  return (
    <div className="admin">
      <AdminNavBar />
      <div className="admin__container">
        <AdminHeader />
        <div className="admin__content content">
          {location.pathname === "/admin/orders" && <AdminOrders />}
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default withRouter(AdminPage)
