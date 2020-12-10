import React from "react"
import "./Addition.css"
import { connect } from "react-redux"
import { getCars } from "../../../store/order-selectors"
import {
  RadioBtns,
  CheckBoxes,
  DateFrom,
  DateTo,
} from "../../common/Forms/Forms"
import { getColorItems } from "../../common/helpers/Helpers"

const Addition = ({ formik, cars }) => {
  const modelData = cars.find((car) => car.name === formik.values.model)
  const carColors = ["любой", ...modelData.colors]

  const сolorItems = getColorItems(formik, carColors)

  const RadioBtnsItems = [
    {
      label: `Поминутно, ${Math.ceil(
        (1.5 * modelData.priceMin) / (60 * 24)
      )} ₽/мин`,
      value: "minute",
      checked: formik.values.rate === "minute",
    },
    {
      label: `На сутки, ${Math.ceil(modelData.priceMin)} ₽/сутки`,
      value: "day",
      checked: formik.values.rate === "day",
    },
  ]

  const CheckBoxesItems = [
    {
      label: "Полный бак, 500р",
      value: "isFullTank",
      checked: formik.values.isFullTank === true,
    },
    {
      label: "Детское кресло, 200р",
      value: "isNeedChildChair",
      checked: formik.values.isNeedChildChair === true,
    },
    {
      label: "Правый руль, 1600р",
      value: "isRightWheel",
      checked: formik.values.isRightWheel === true,
    },
  ]

  return (
    <div className="addition">
      <div className="addition__option">
        <div className="addition__title">Цвет</div>
        <RadioBtns
          name="color"
          items={сolorItems}
          onChange={formik.handleChange}
        />
      </div>

      <div className="addition__option">
        <div className="addition__title">Дата аренды</div>
        <DateFrom formik={formik} />
        <DateTo formik={formik} />
      </div>

      <div className="addition__option">
        <div className="addition__title">Тариф</div>
        <RadioBtns
          name="rate"
          direction="column"
          items={RadioBtnsItems}
          onChange={formik.handleChange}
        />
      </div>

      <div className="addition__option">
        <div className="addition__title">Доп услуги</div>
        <CheckBoxes
          direction="column"
          items={CheckBoxesItems}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cars: getCars(state),
})

export default connect(mapStateToProps)(Addition)
