import { Field, ErrorMessage } from "formik"
import React from "react"

const TextField = ({ name, title, placeholder, type }) => (
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

export default TextField
