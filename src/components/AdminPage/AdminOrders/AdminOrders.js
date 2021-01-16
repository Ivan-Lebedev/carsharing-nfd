import React, { useState, useEffect } from "react"
import "./AdminOrders.scss"
import CoveredCar from "../../../assets/images/CoveredCar.png"
import { CheckBoxes } from "../../common/AdminForms/AdminForms"
import Approve from "../../../assets/icons/ApproveIcon.svg"
import Reject from "../../../assets/icons/RejectIcon.svg"
import Edit from "../../../assets/icons/EditIcon.svg"
import Paginator from "../../common/Paginator/Paginator"
import { connect } from "react-redux"
import {
  requestOrdersPage,
  setCurrentOrdersPage,
  requestCarsTotal,
  requestCitiesTotal,
  requestStatusesTotal,
  updateOrderData,
} from "../../../store/orders-table-reducer"
import Loader from "../../common/Loader/Loader"
import {
  getAdminOrdersCarImg,
  getAdminOrdersDate,
  getAdminOrdersAllOptions,
} from "../../common/helpers/Helpers"
import AdminOrdersFilter from "./AdminOrdersFilter"
import { Button, LinkButton } from "../../common/Button/Button"

const periodOptions = [
  { key: "За все время", value: "" },
  { key: "За год", value: "year" },
  { key: "За месяц", value: "month" },
  { key: "За неделю", value: "week" },
  { key: "За день", value: "day" },
]
let modelOptions = []
let cityOptions = []
let statusOptions = []

const AdminOrders = ({
  ordersPerPage,
  isOrdersFetching,
  ordersPageSize,
  currentOrdersPage,
  ordersCount,
  carsTotal,
  citiesTotal,
  statusesTotal,
  requestOrdersPage,
  setCurrentOrdersPage,
  requestCarsTotal,
  requestCitiesTotal,
  requestStatusesTotal,
  updateOrderData,
}) => {
  const [filters, setFilters] = useState({
    period: "",
    model: "",
    city: "",
    status: "",
  })
  useEffect(() => {
    requestOrdersPage(currentOrdersPage, ordersPageSize, filters)
  }, [currentOrdersPage, ordersPageSize, requestOrdersPage, filters])
  useEffect(() => {
    requestCarsTotal()
    requestCitiesTotal()
    requestStatusesTotal()
  }, [requestCarsTotal, requestCitiesTotal, requestStatusesTotal])

  modelOptions = [
    { key: "Все модели", value: "" },
    ...getAdminOrdersAllOptions(carsTotal),
  ]
  cityOptions = [
    { key: "Все города", value: "" },
    ...getAdminOrdersAllOptions(citiesTotal),
  ]
  statusOptions = [
    { key: "Все статусы", value: "" },
    ...getAdminOrdersAllOptions(statusesTotal),
  ]

  const onFiltersSubmit = ({ period, model, city, status }) => {
    setFilters({ period, model, city, status })
    setCurrentOrdersPage(0)
  }
  const clearFilters = () => {
    setFilters({ period: "", model: "", city: "", status: "" })
    setCurrentOrdersPage(0)
  }

  const onConfirmHandler = (order) => {
    order.orderStatusId = statusesTotal[2]
    updateOrderData(order, order.id)
  }

  const onCancelHandler = (order) => {
    order.orderStatusId = statusesTotal[3]
    updateOrderData(order, order.id)
  }

  const checkBoxesHandleChange = (e, order) => {
    const { value } = e.target
    order[value] = !order[value]
    updateOrderData(order, order.id)
  }

  const getAdminOrdersContent = () => {
    if (isOrdersFetching) {
      return <Loader admin={true} />
    } else if (ordersPerPage.length) {
      return ordersPerPage.map((order) => {
        return (
          <div className="orders__order" key={order.id}>
            <div className="orders__content-container car-info-container">
              <div className="orders__car-info car-info">
                <img
                  src={order.carId ? getAdminOrdersCarImg(order) : CoveredCar}
                  alt="Car"
                  className="car-info__img"
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                />
                <div className="car-info__desc">
                  <div className="car-info__desc-item">
                    <span className="car-info__accent">
                      {order.carId?.name || "НЕТ ДАННЫХ"}
                    </span>{" "}
                    в
                    <span className="car-info__accent">
                      {" "}
                      {order.cityId?.name || "НЕТ ДАННЫХ"},
                    </span>
                    <span className="car-info__accent">
                      {" "}
                      {order.pointId?.address || "НЕТ ДАННЫХ"}
                    </span>
                  </div>
                  <div className="car-info__desc-item">
                    {getAdminOrdersDate(order.dateFrom)} -{" "}
                    {getAdminOrdersDate(order.dateTo)}
                  </div>
                  <div className="car-info__desc-item">
                    Цвет:{" "}
                    <span className="car-info__accent">
                      {order.color || "НЕТ ДАННЫХ"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="orders__content-container">
              <CheckBoxes
                onChange={(e) => checkBoxesHandleChange(e, order)}
                direction="column"
                items={[
                  {
                    label: "Полный бак, 500р",
                    value: "isFullTank",
                    checked: order.isFullTank,
                  },
                  {
                    label: "Детское кресло, 200р",
                    value: "isNeedChildChair",
                    checked: order.isNeedChildChair,
                  },
                  {
                    label: "Правый руль, 1600р",
                    value: "isRightWheel",
                    checked: order.isRightWheel,
                  },
                ]}
              />
            </div>
            <div className="orders__content-container status-price-container">
              <div className="order-status">
                {order.orderStatusId?.name || "НЕТ ДАННЫХ"}
              </div>
              <div className="order-price">{order.price || "НЕТ ДАННЫХ"} ₽</div>
            </div>
            <div className="orders__content-container">
              <Button
                additionalStyles="order__approve order-btn"
                onClick={() => onConfirmHandler(order)}
              >
                <img className="order-btn__img" src={Approve} alt="Approve" />
                <div className="order-btn__text">Готово</div>
              </Button>
              <Button
                additionalStyles="order__reject order-btn"
                onClick={() => onCancelHandler(order)}
              >
                <img src={Reject} alt="Reject" />
                <div className="order-btn__text">Отмена</div>
              </Button>
              <LinkButton
                additionalStyles="order__edit order-btn"
                to={`/admin/orders/${order.id}`}
              >
                <img src={Edit} alt="Edit" />
                <div className="order-btn__text">Изменить</div>
              </LinkButton>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div className="orders__content-container">
          <div className="no-data-found">Ничего не найдено</div>
        </div>
      )
    }
  }

  return (
    <div className="admin__orders">
      <div className="content__title">Заказы</div>
      <div className="content__card orders">
        <div className="orders__header">
          <AdminOrdersFilter
            initialValues={filters}
            onSubmit={onFiltersSubmit}
            periodOptions={periodOptions}
            modelOptions={modelOptions}
            cityOptions={cityOptions}
            statusOptions={statusOptions}
            clearFilters={clearFilters}
          />
        </div>
        <div className="orders__content">{getAdminOrdersContent()}</div>
        <div className="orders__footer">
          <Paginator
            itemsCount={ordersCount}
            pageSize={ordersPageSize}
            onPageChange={({ selected }) => setCurrentOrdersPage(selected)}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ordersPerPage: state.ordersTable.ordersPerPage,
  isOrdersFetching: state.ordersTable.isOrdersFetching,
  ordersPageSize: state.ordersTable.ordersPageSize,
  currentOrdersPage: state.ordersTable.currentOrdersPage,
  ordersCount: state.ordersTable.ordersCount,
  carsTotal: state.ordersTable.carsTotal,
  citiesTotal: state.ordersTable.citiesTotal,
  statusesTotal: state.ordersTable.statusesTotal,
})

export default connect(mapStateToProps, {
  requestOrdersPage,
  setCurrentOrdersPage,
  requestCarsTotal,
  requestCitiesTotal,
  requestStatusesTotal,
  updateOrderData,
})(AdminOrders)
