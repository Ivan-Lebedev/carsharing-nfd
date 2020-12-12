import React from "react"
import { Link } from "react-router-dom"
import "./AdminFooter.scss"

const AdminFooter = () => {
  return (
    <div className="admin__footer">
      <div className="admin__footer-links">
        <Link to="/" className="admin__footer-link">
          Главная страница
        </Link>
        <div className="admin__footer-link">Ссылка</div>
      </div>

      <div className="admin__footer-copyright">Copyright © 2020 Simbirsoft</div>
    </div>
  )
}

export default AdminFooter
