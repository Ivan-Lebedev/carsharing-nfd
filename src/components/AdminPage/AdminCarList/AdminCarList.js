import React, { useEffect } from "react"
import "./AdminCarList.scss"
import { Form, Formik } from "formik"
import { AdminFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"
import Paginator from "../../common/Paginator/Paginator"
import { connect } from "react-redux"
import {
  requestCarsPage,
  setCurrentPage,
  requestCarsTotal,
} from "../../../store/cars-table-reducer"
import Loader from "../../common/Loader/Loader"
import {
  getAdminTableColors,
  getAdminCarNames,
  getAdminCarTypes,
} from "../../common/helpers/Helpers"

let firstOption = []
let secondOption = []

const initialValues = {
  field1: "1",
  field2: "2",
}

const AdminCarList = ({
  carsTotal,
  carsPerPage,
  isFetching,
  pageSize,
  currentPage,
  carsCount,
  requestCarsPage,
  setCurrentPage,
  requestCarsTotal,
}) => {
  useEffect(() => {
    requestCarsPage(currentPage, pageSize)
    requestCarsTotal()
  }, [currentPage, pageSize, requestCarsPage, requestCarsTotal])

  firstOption = getAdminCarNames(carsTotal)
  secondOption = getAdminCarTypes(carsTotal)

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="admin__car-list car-list">
      <div className="content__title">Список авто</div>
      <div className="car-list__content-wrapper">
        <div className="car-list__content">
          <Formik initialValues={initialValues}>
            <Form className="car-list__filter">
              <div className="car-list__filter-items">
                <AdminFilter
                  name="field1"
                  options={firstOption}
                  // onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleChange(e)}
                />
                <AdminFilter
                  name="field2"
                  options={secondOption}
                  // onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleChange(e)}
                />
              </div>
              <div className="car-list__filter-btns">
                <div className="car-list__filter-btn">
                  <Button additionalStyles="button__admin button__admin--cancel">
                    Сбросить
                  </Button>
                </div>
                <div className="car-list__filter-btn">
                  <Button additionalStyles="button__admin">Применить</Button>
                </div>
              </div>
            </Form>
          </Formik>
          <div className="car-list__table">
            {isFetching ? (
              <Loader admin={true} />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th scope="col">Модель</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Цвета</th>
                  </tr>
                </thead>
                <tbody>
                  {carsPerPage.map((car) => (
                    <tr key={car.id}>
                      <td data-label="Модель">{car.name}</td>
                      <td data-label="Тип">{car.categoryId.name}</td>
                      <td data-label="Цена">{`${car.priceMin} - ${car.priceMax} ₽`}</td>
                      <td data-label="Цвета">
                        {getAdminTableColors(car.colors)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="car-list__footer">
            <Paginator
              itemsCount={carsCount}
              pageSize={pageSize}
              onPageChange={({ selected }) => setCurrentPage(selected)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  carsTotal: state.carsTable.carsTotal,
  carsPerPage: state.carsTable.carsPerPage,
  isFetching: state.carsTable.isFetching,
  pageSize: state.carsTable.pageSize,
  currentPage: state.carsTable.currentPage,
  carsCount: state.carsTable.carsCount,
})
export default connect(mapStateToProps, {
  requestCarsPage,
  setCurrentPage,
  requestCarsTotal,
})(AdminCarList)
