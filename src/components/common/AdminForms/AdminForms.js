import { Field, ErrorMessage } from "formik"
import React from "react"
import "./AdminForms.scss"
import classNames from "classnames"

export const TextField = ({ name, title, placeholder, type }) => {
  return (
    <div className="text-field">
      <div className="login-form__subtitle">{title}</div>
      <Field
        as="input"
        id={name}
        name={name}
        className="login-form__input"
        placeholder={placeholder}
        type={type}
      />
      <div className="error-message">
        <ErrorMessage name={name} />
      </div>
    </div>
  )
}

export const AdminFilter = ({ name, options }) => {
  return (
    <Field className="admin-filter" as="select" id={name} name={name}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        )
      })}
    </Field>
  )
}

export const CheckBoxes = ({ direction, items, onChange, isChangeable }) => {
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

export const CarSettingsField = ({
  name,
  title,
  placeholder,
  type,
  onChange,
}) => {
  return (
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
      />
      <div className="error-message">
        <div name={name} />
      </div>
    </div>
  )
}

export const CarSettingsFilter = ({ title, name, options, onChange }) => {
  return (
    <div className="car-settings-filter">
      <div className="login-form__subtitle">{title}</div>
      <select
        className="admin-filter car-settings-category"
        id={name}
        name={name}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </select>
    </div>
  )
}
