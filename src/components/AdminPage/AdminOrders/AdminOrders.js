import { Form, Formik } from "formik"
import React, { useEffect } from "react"
import { AdminFilter } from "../../common/AdminForms/AdminForms"
import "./AdminOrders.scss"
import { Button } from "../../common/Button/Button"
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
} from "../../../store/orders-table-reducer"
import Loader from "../../common/Loader/Loader"
import {
  getAdminCarImg,
  getAdminOrdersDate,
} from "../../common/helpers/Helpers"

const periodOptions = [
  { key: "За год", value: "year" },
  { key: "За месяц", value: "month" },
  { key: "За неделю", value: "week" },
  { key: "За день", value: "day" },
]
const modelOptions = [
  { key: "Все модели", value: "all" },
  { key: "Elantra", value: "Elantra" },
  { key: "Tucson", value: "Tucson" },
  { key: "Solaris", value: "Solaris" },
]
const cityOptions = [
  { key: "Ульяновск", value: "Ульяновск" },
  { key: "Саранск", value: "Саранск" },
  { key: "Самара", value: "Самара" },
  { key: "Краснодар", value: "Краснодар" },
]
const statusOptions = [
  { key: "В процессе", value: "process" },
  { key: "Завершенные", value: "finished" },
]
const initialValues = {
  period: "week",
  model: "all",
  city: "Ульяновск",
  status: "process",
}

const AdminOrders = ({
  ordersPerPage,
  isOrdersFetching,
  ordersPageSize,
  currentOrdersPage,
  ordersCount,
  requestOrdersPage,
  setCurrentOrdersPage,
}) => {
  useEffect(() => {
    requestOrdersPage(currentOrdersPage, ordersPageSize)
  }, [currentOrdersPage, ordersPageSize, requestOrdersPage])
  console.log(ordersPerPage)

  return (
    <div className="admin__orders">
      <div className="content__title">Заказы</div>
      <div className="content__card orders">
        <div className="orders__header">
          <Formik initialValues={initialValues}>
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
                <Button additionalStyles="button__admin">Применить</Button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="orders__content">
          {isOrdersFetching ? (
            <Loader admin={true} />
          ) : (
            ordersPerPage.map((order) => {
              return (
                <div className="orders__order" key={order.id}>
                  <div className="orders__content-container car-info-container">
                    <div className="orders__car-info car-info">
                      <img
                        src={order.carId ? getAdminCarImg(order) : CoveredCar}
                        alt="Car"
                        className="car-info__img"
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
                      isChangeable={false}
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
                  <div className="orders__content-container">
                    <div className="order-price">
                      {order.price || "НЕТ ДАННЫХ"} ₽
                    </div>
                  </div>
                  <div className="orders__content-container">
                    <button className="order__approve order-btn">
                      <img
                        className="order-btn__img"
                        src={Approve}
                        alt="Approve"
                      />
                      <div className="order-btn__text">Готово</div>
                    </button>
                    <button className="order__reject order-btn">
                      <img src={Reject} alt="Reject" />
                      <div className="order-btn__text">Отмена</div>
                    </button>
                    <button className="order__edit order-btn">
                      <img src={Edit} alt="Edit" />
                      <div className="order-btn__text">Изменить</div>
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
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
})

export default connect(mapStateToProps, {
  requestOrdersPage,
  setCurrentOrdersPage,
})(AdminOrders)
