import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
import MainPage from "./components/MainPage/MainPage"
import OrderPage from "./components/OrderPage/OrderPage"
import LoginPage from "./components/LoginPage/LoginPage"

function App() {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route exact path="/order" render={() => <OrderPage />} />
        <Route
          path="/order/finished/:orderId?"
          render={() => <OrderPage isFinished />}
        />
        <Route exact path="/login" render={() => <LoginPage />} />
      </Switch>
    </div>
  )
}

export default App
