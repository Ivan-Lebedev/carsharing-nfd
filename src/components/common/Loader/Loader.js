import React from "react"
import "./Loader.css"
import classnames from "classnames"

const Loader = ({ admin }) => {
  const loaderClass = classnames("lds-roller", { "lds-roller--admin": admin })
  return (
    <div className={loaderClass}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader
