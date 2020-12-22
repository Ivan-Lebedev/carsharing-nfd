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
} from "../../../store/cars-table-reducer"
import Loader from "../../common/Loader/Loader"
import { getAdminTableColors } from "../../common/helpers/Helpers"

const firstOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]
const secondOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]
const thirdOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]
const fourthOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]

const initialValues = {
  field1: "1",
  field2: "2",
  field3: "2",
  field4: "1",
}

const AdminCarList = ({
  cars,
  isFetching,
  pageSize,
  currentPage,
  carsCount,
  requestCarsPage,
  setCurrentPage,
}) => {
  useEffect(() => {
    requestCarsPage(currentPage, pageSize)
  }, [currentPage, pageSize, requestCarsPage])

  return (
    <div className="admin__car-list car-list">
      <div className="content__title">Список авто</div>
      <div className="car-list__content-wrapper">
        <div className="car-list__content">
          <Formik initialValues={initialValues}>
            <Form className="car-list__filter">
              <div className="car-list__filter-items">
                <AdminFilter name="field1" options={firstOption} />
                <AdminFilter name="field2" options={secondOption} />
                <AdminFilter name="field3" options={thirdOption} />
                <AdminFilter name="field4" options={fourthOption} />
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
                  {cars.map((car) => (
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
  cars: state.carsTable.cars,
  isFetching: state.carsTable.isFetching,
  pageSize: state.carsTable.pageSize,
  currentPage: state.carsTable.currentPage,
  carsCount: state.carsTable.carsCount,
})
export default connect(mapStateToProps, { requestCarsPage, setCurrentPage })(
  AdminCarList,
)
