import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
import MainPage from "./components/MainPage/MainPage"
import OrderPage from "./components/OrderPage/OrderPage"
import LoginPage from "./components/LoginPage/LoginPage"
import AdminPage from "./components/AdminPage/AdminPage"

function App() {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route
          path="/order/finished/:orderId?"
          render={() => <OrderPage isFinished />}
        />
        <Route exact path="/login" component={LoginPage} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </div>
  )
}

export default App
