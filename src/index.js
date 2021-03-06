import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store/redux-store"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
