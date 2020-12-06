import React from "react"
import "./Button.css"
import { withRouter } from "react-router-dom"

export const Button = ({
  additionalStyles,
  children,
  history,
  to,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={`button ${additionalStyles}`}
      disabled={disabled}
      onClick={(event) => {
        if (onClick) {
          onClick(event)
        }
        if (history) {
          history.push(to)
        }
      }}
    >
      {children}
    </button>
  )
}

export const LinkButton = withRouter(Button)
