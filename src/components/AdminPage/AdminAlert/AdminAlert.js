import React from "react"
import "./AdminAlert.scss"

const AdminAlert = ({ alertData, alertOnClose }) => {
  const { isVisible, text } = alertData
  return (
    <div
      className="admin-alert"
      style={{ display: `${isVisible ? "flex" : "none"}` }}
    >
      <p className="admin-alert__text">{text}</p>
      <button className="admin-alert__close" onClick={alertOnClose}>
        ✖
      </button>
    </div>
  )
}

export default AdminAlert
