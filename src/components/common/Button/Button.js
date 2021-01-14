import React from "react"
import "./Button.scss"
import { withRouter } from "react-router-dom"
import loader from "../../../assets/icons/buttonLoader.svg"

export const Button = ({
  type = "button",
  additionalStyles,
  children,
  history,
  to,
  onClick,
  disabled,
  isLoading,
}) => {
  const onClickHandler = (event) => {
    if (onClick) {
      onClick(event)
    }
    if (history) {
      history.push(to)
    }
  }
  const buttonFilling = () => {
    return isLoading ? (
      <img className="button__loader" src={loader} alt="loader" />
    ) : (
      children
    )
  }

  return (
    <button
      type={type}
      className={`button ${additionalStyles}`}
      disabled={disabled}
      onClick={(event) => onClickHandler(event)}
    >
      {buttonFilling()}
    </button>
  )
}

export const LinkButton = withRouter(Button)
