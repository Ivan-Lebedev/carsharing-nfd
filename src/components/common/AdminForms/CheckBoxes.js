import React from "react"
import classNames from "classnames"

const CheckBoxes = ({ direction, items, onChange, isChangeable }) => {
  const inputClass = classNames("admin-checkbox-input", {
    "admin-checkbox-input--column": direction === "column",
  })
  return (
    <div className={inputClass}>
      {items.map((item) => (
        <div className="admin-input__checkbox-item" key={item.value}>
          <input
            className="admin-checkbox-item__input"
            type="checkbox"
            name={item.value}
            id={item.value}
            checked={item.checked}
            value={item.value}
            readOnly={!isChangeable}
            onChange={onChange}
          />
          <label className="admin-checkbox-item__label" htmlFor={item.value}>
            {item.label ? item.label : item.value}
          </label>
        </div>
      ))}
    </div>
  )
}

export default CheckBoxes
