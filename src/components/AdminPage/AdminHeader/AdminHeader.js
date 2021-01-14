import React, { useState } from "react"
import "./AdminHeader.scss"
import Search from "../../../assets/icons/Search.svg"
import Notifications from "../../../assets/icons/Notifications.svg"
import Avatar from "../../../assets/icons/Avatar.svg"
import Dropdown from "../../../assets/icons/DropdownIcon.svg"
import Cookies from "js-cookie"

const AdminHeader = ({ setIsTokenValid }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const logOut = () => {
    Cookies.remove("access_token")
    setIsTokenValid(false)
  }
  return (
    <div className="admin-header">
      <div className="admin-header__search">
        <img className="admin-header__search-icon" src={Search} alt="search" />
        <input
          className="admin-header__search-input"
          type="search"
          placeholder="Поиск..."
        />
      </div>
      <div className="admin-header__notifications notifications">
        <img
          src={Notifications}
          alt="Notifications"
          className="notifications__icon"
        />
        <div className="notifications__number">2</div>
      </div>
      <div className="admin-header__user-details user-details">
        <img src={Avatar} alt="Avatar" className="user-details__img" />
        <div className="user-details__name">Admin</div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="user-details__dropdown-btn"
        >
          <img
            src={Dropdown}
            alt="Dropdown"
            className="user-details__dropdown-icon"
          />
        </button>
        {isDropdownOpen && (
          <div className="user-details__dropdown">
            <button
              onClick={() => logOut()}
              className="user-details__dropdown-btn"
            >
              Выйти
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminHeader
