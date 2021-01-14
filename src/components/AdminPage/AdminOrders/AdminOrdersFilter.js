import { Form, Formik } from "formik"
import React from "react"
import { AdminFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"

const AdminOrdersFilter = ({
  initialValues,
  onSubmit,
  periodOptions,
  modelOptions,
  cityOptions,
  statusOptions,
  clearFilters,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="orders__filter">
        <div className="orders__filter-items">
          <div className="items-container">
            <AdminFilter name="period" options={periodOptions} />
            <AdminFilter name="model" options={modelOptions} />
          </div>
          <div className="items-container">
            <AdminFilter name="city" options={cityOptions} />
            <AdminFilter name="status" options={statusOptions} />
          </div>
        </div>

        <div className="orders__filter-button">
          <Button
            additionalStyles="button__admin button__admin--cancel orders__filter-btns"
            onClick={clearFilters}
          >
            Сбросить
          </Button>

          <Button
            additionalStyles="button__admin orders__filter-btns"
            type="submit"
          >
            Применить
          </Button>
        </div>
      </Form>
    </Formik>
  )
}

export default AdminOrdersFilter
