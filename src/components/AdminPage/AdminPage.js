import React from "react"
import AdminNavBar from "./AdminNavBar/AdminNavBar"
import AdminOrders from "./AdminOrders/AdminOrders"
import AdminHeader from "./AdminHeader/AdminHeader"
import { Route, Switch, Redirect } from "react-router-dom"
import "./AdminPage.scss"
import AdminFooter from "./AdminFooter/AdminFooter"
import AdminError from "./AdminError/AdminError"
import AdminCarSettings from "./AdminCarSettings/AdminCarSettings"
import AdminCarList from "./AdminCarList/AdminCarList"
import Cookies from "js-cookie"
import { useState } from "react"
import AdminOrderSettings from "./AdminOrders/AdminOrderSettings"

const AdminPage = () => {
  const [isTokenValid, setIsTokenValid] = useState(Cookies.get("access_token"))
  if (!isTokenValid) {
    return <Redirect to="/login" />
  }

  return (
    <div className="admin">
      <AdminNavBar />
      <div className="admin__container">
        <AdminHeader setIsTokenValid={setIsTokenValid} />
        <div className="admin__content content">
          <Switch>
            <Route exact path="/admin/orders" component={AdminOrders} />
            <Route
              path="/admin/orders/:orderId?"
              component={AdminOrderSettings}
            />
            <Route exact path="/admin/car-list" component={AdminCarList} />
            <Route exact path="/admin/car-card" component={AdminCarSettings} />
            <Route
              path="/admin/car-card/:carId?"
              component={AdminCarSettings}
            />
            <Route path="*" component={AdminError} />
          </Switch>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminPage
