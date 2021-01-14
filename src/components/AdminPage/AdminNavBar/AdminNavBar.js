import React from "react"
import "./AdminNavBar.scss"
import LogoIcon from "../../../assets/icons/LogoIcon.svg"
import { NavLink } from "react-router-dom"
import CarCard from "../../common/icons/CarCardIcon"
import CarList from "../../common/icons/CarListIcon"
import CarOrders from "../../common/icons/CarOrdersIcon"

const AdminNavBar = () => {
  return (
    <div className="admin__nav-bar nav-bar">
      <div className="nav-bar__logo nb-logo">
        <img src={LogoIcon} alt="Logo" className="nb-logo__img" />
        <div className="nb-logo__title">Need for drive</div>
      </div>
      <div className="nav-bar__menu menu">
        <NavLink
          to="/admin/car-card"
          className="menu__item"
          activeClassName="menu__item--active"
        >
          <div className="menu__item-icon">
            <CarCard />
          </div>
          <span className="menu__item-title">Карточка автомобиля</span>
        </NavLink>
        <NavLink
          to="/admin/car-list"
          className="menu__item"
          activeClassName="menu__item--active"
        >
          <div className="menu__item-icon">
            <CarList />
          </div>
          <span className="menu__item-title">Список авто</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className="menu__item"
          activeClassName="menu__item--active"
        >
          <div className="menu__item-icon">
            <CarOrders />
          </div>
          <span className="menu__item-title">Зказы</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminNavBar
