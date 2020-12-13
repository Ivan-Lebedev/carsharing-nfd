import React from "react"
import "./AdminForms.scss"


export const TextField = ({ title, placeholder, type }) => {
    return (
      <>
        <div className="login-form__subtitle">{title}</div>
        <input
          className="login-form__input"
          placeholder={placeholder}
          type={type}
        />
      </>
    )
  }