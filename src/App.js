import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
import MainPage from "./components/MainPage/MainPage"
import OrderPage from "./components/OrderPage/OrderPage"
import SideBar from "./components/SideBar/SideBar"

function App() {
  return (
    <div className="app-wrapper">
      <SideBar />
      <Switch>
        <Route exact path="/carsharing-nfd" render={() => <MainPage />} />
        <Route exact path="/order" render={() => <OrderPage />} />
        <Route
          path="/order/finished/:orderId?"
          render={() => <OrderPage isFinished />}
        />
      </Switch>
    </div>
  )
}

export default App
