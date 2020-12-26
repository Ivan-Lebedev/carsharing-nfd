import React, { useEffect } from "react"
import "./AdminCarList.scss"
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
} from "../../common/helpers/Helpers"
import AdminCarListFilter from "./AdminCarListFilter"
import { useState } from "react"

let firstOption = []

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
  const [filters, setFilters] = useState({ model: "", categoryId: "" })
  useEffect(() => {
    requestCarsPage(currentPage, pageSize, filters)
    requestCarsTotal()
  }, [currentPage, pageSize, requestCarsPage, requestCarsTotal, filters])

  firstOption = [{ key: "Все модели", value: "" }].concat(
    getAdminCarNames(carsTotal),
  )
  secondOption = [{ key: "Все типы", value: "" }].concat(
    getAdminCarTypes(carsTotal),
  )
  const onFiltersSubmit = ({ field1, field2 }) => {
    setFilters({ model: field1, categoryId: field2 })
    setCurrentPage(0)
  }
  const clearFilters = () => {
    setFilters({ model: "", categoryId: "" })
  }
  console.log(carsPerPage)

  return (
    <div className="admin__car-list car-list">
      <div className="content__title">Список авто</div>
      <div className="car-list__content-wrapper">
        <div className="car-list__content">
          <AdminCarListFilter
            firstOption={firstOption}
            onSubmit={onFiltersSubmit}
            clearFilters={clearFilters}
          />
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
                  {carsPerPage.length ? (
                    carsPerPage.map((car) => (
                      <tr key={car.id}>
                        <td data-label="Модель">{car.name}</td>
                        <td data-label="Тип">{car.categoryId.name}</td>
                        <td data-label="Цена">{`${car.priceMin} - ${car.priceMax} ₽`}</td>
                        <td data-label="Цвета">
                          {getAdminTableColors(car.colors)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Ничего не найдено</td>
                    </tr>
                  )}
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
