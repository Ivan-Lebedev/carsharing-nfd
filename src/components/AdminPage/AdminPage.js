import React from "react"
import AdminNavBar from "./AdminNavBar/AdminNavBar"
import AdminOrders from "./AdminOrders/AdminOrders"
import AdminHeader from "./AdminHeader/AdminHeader"
import { Route, Switch } from "react-router-dom"
import "./AdminPage.scss"
import AdminFooter from "./AdminFooter/AdminFooter"
import AdminError from "./AdminError/AdminError"
import AdminCarSettings from "./AdminCarSettings/AdminCarSettings"

const AdminPage = () => {
  return (
    <div className="admin">
      <AdminNavBar />
      <div className="admin__container">
        <AdminHeader />
        <div className="admin__content content">
          <Switch>
            <Route exact path="/admin/orders" render={() => <AdminOrders />} />
            <Route
              exact
              path="/admin/car-card"
              render={() => <AdminCarSettings />}
            />
            <Route path="*" render={() => <AdminError />} />
          </Switch>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminPage
