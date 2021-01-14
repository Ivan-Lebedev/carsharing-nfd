import React from "react"

const CarSettingsField = ({
  name,
  title,
  placeholder,
  type,
  onChange,
  value,
}) => (
  <div className="text-field">
    <div className="login-form__subtitle">{title}</div>
    <input
      id={name}
      name={name}
      className="login-form__input"
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      autoComplete="off"
      maxLength="20"
      value={value}
    />
    <div className="error-message">
      <div name={name} />
    </div>
  </div>
)

export default CarSettingsField
