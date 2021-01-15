import React from "react"

const CarSettingsFilter = ({ title, name, options, onChange, value }) => (
  <div className="car-settings-filter">
    <div className="login-form__subtitle">{title}</div>
    <select
      className="admin-filter car-settings-category"
      id={name}
      name={name}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.key}
        </option>
      ))}
    </select>
  </div>
)

export default CarSettingsFilter
