import { Field } from "formik"
import React from "react"

const AdminFilter = ({ name, options }) => (
  <Field className="admin-filter" as="select" id={name} name={name}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.key}
      </option>
    ))}
  </Field>
)

export default AdminFilter
