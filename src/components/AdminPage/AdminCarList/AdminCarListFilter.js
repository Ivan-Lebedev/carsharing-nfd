import React from "react"
import { Form, Formik } from "formik"
import { AdminFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"

const initialValues = {
  field1: "Все модели",
  field2: "Все типы",
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
          <AdminFilter name="field1" options={firstOption} />
          <AdminFilter name="field2" options={secondOption} />
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
