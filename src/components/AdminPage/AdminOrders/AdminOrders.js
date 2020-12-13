import { Form, Formik } from "formik"
import React from "react"
import { OrdersFilter } from "../../common/AdminForms/AdminForms"
import "./AdminOrders.scss"
import { Button } from "../../common/Button/Button"
import Car from "../../../assets/images/image 2.png"
import { CheckBoxes } from "../../common/AdminForms/AdminForms"
import Approve from "../../../assets/icons/ApproveIcon.svg"
import Reject from "../../../assets/icons/RejectIcon.svg"
import Edit from "../../../assets/icons/EditIcon.svg"

const AdminOrders = () => {
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

  const CheckBoxesItems = [
    {
      label: "Полный бак, 500р",
      value: "isFullTank",
    },
    {
      label: "Детское кресло, 200р",
      value: "isNeedChildChair",
    },
    {
      label: "Правый руль, 1600р",
      value: "isRightWheel",
    },
  ]

  return (
    <div className="admin__orders">
      <div className="content__title">Заказы</div>
      <div className="content__card orders">
        <div className="orders__header">
          <Formik initialValues={initialValues}>
            <Form className="orders__filter">
              <div className="orders__filter-items">
                <div className="items-container">
                  <OrdersFilter name="period" options={periodOptions} />
                  <OrdersFilter name="model" options={modelOptions} />
                </div>
                <div className="items-container">
                  <OrdersFilter name="city" options={cityOptions} />
                  <OrdersFilter name="status" options={statusOptions} />
                </div>
              </div>
              <div className="orders__filter-button">
                <Button additionalStyles="button__admin">Применить</Button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="orders__content">
          <div className="orders__order">
            <div className="orders__content-container">
              <div className="orders__car-info car-info">
                <img src={Car} alt="Car" className="car-info__img" />
                <div className="car-info__desc">
                  <div className="car-info__desc-item">
                    <span className="car-info__accent">ELRANTA</span> в
                    <span className="car-info__accent"> Ульяновск,</span>
                    <span className="car-info__accent"> Нариманова 42</span>
                  </div>
                  <div className="car-info__desc-item">
                    12.06.2019 12:00 — 13.06.2019 12:00
                  </div>
                  <div className="car-info__desc-item">
                    Цвет: <span className="car-info__accent">Голубой</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="orders__content-container">
              <CheckBoxes direction="column" items={CheckBoxesItems} />
            </div>
            <div className="orders__content-container">
              <div className="order-price">4 300 ₽</div>
            </div>
            <div className="orders__content-container">
              <button className="order__approve order-btn">
                <img className="order-btn__img" src={Approve} alt="Approve" />
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
        </div>
        <div className="orders__footer">
          <div className="paginator">
            <div className="paginator__item">{"<<"}</div>
            <div className="paginator__item ">1</div>
            <div className="paginator__item">...</div>
            <div className="paginator__item">4</div>
            <div className="paginator__item paginator__item--active">5</div>
            <div className="paginator__item">6</div>
            <div className="paginator__item">...</div>
            <div className="paginator__item">31</div>
            <div className="paginator__item">{">>"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
