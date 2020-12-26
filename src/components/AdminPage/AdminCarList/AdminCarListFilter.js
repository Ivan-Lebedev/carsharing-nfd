import React from "react"
import { Form, Formik } from "formik"
import { AdminFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"

const initialValues = {
  model: "",
  type: "",
}

const AdminCarListFilter = ({
  firstOption,
  secondOption,
  onSubmit,
  clearFilters,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="car-list__filter">
        <div className="car-list__filter-items">
          <AdminFilter name="model" options={firstOption} />
          <AdminFilter name="type" options={secondOption} />
        </div>
        <div className="car-list__filter-btns">
          <div className="car-list__filter-btn">
            <Button
              additionalStyles="button__admin button__admin--cancel"
              onClick={clearFilters}
            >
              Сбросить
            </Button>
          </div>
          <div className="car-list__filter-btn">
            <Button additionalStyles="button__admin" type="submit">
              Применить
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default AdminCarListFilter
