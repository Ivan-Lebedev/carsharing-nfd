import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import OrderPage from './components/OrderPage/OrderPage'

function App() {
  return (
    <Router>
      <Route path='/carsharing-nfd' component={MainPage} />
      <Route path='/order' component={OrderPage} />
    </Router>
  )
}

export default App
