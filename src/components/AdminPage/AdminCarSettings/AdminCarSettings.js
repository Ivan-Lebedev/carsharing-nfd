import React, { useState, useEffect } from "react"
import "./AdminCarSettings.scss"
import CarImg from "../../../assets/images/CoveredCar.png"
import ProgressBar from "../../../assets/images/Progress Bar.png"
import { Form, Formik } from "formik"
import { CheckBoxes, TextField } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"
import { connect } from "react-redux"
import { requestCarData } from "../../../store/car-settings-reducer"
import { useLocation } from "react-router-dom"
import Loader from "../../common/Loader/Loader"
import { getAdminSettingsCarImg } from "../../common/helpers/Helpers"

const initialValues = {
  model: "",
  modelType: "",
  modelColors: "",
}
const colorOptions = [
  { label: "Красный", value: "Красный" },
  { label: "Белый", value: "Белый" },
  { label: "Черный", value: "Черный" },
]

const AdminCarSettings = ({ carData, isCarsFetching, requestCarData }) => {
  const location = useLocation()
  const carId = location.pathname.split("/")[3]
  const [carSettings, setCarSettings] = useState({
    priceMax: "priceMax",
    priceMin: "priceMin",
    name: "name",
    thumbnail: CarImg,
    description: "description",
    categoryId: {},
    colors: [],
  })

  useEffect(() => {
    if (carId) {
      requestCarData(carId)
    }
  }, [requestCarData, carId])
  useEffect(() => {
    setCarSettings({
      priceMax: carData.priceMax,
      priceMin: carData.priceMin,
      name: carData.name,
      thumbnail: carData.thumbnail,
      description: carData.description,
      categoryId: carData.categoryId,
      colors: carData.colors,
    })
  }, [carData, carId])

  // console.log(carId, carData)
  console.log(carSettings)

  return (
    <div className="admin__car-settings car-settings">
      <div className="content__title">Карточка автомобиля</div>
      <Formik initialValues={initialValues}>
        {(formik) => {
          return (
            <Form className="car-settings__content">
              {isCarsFetching ? (
                <Loader admin />
              ) : (
                <>
                  <div className="car-settings__car-container car-container">
                    <div className="car-container__car-details">
                      <img
                        src={
                          carData.thumbnail
                            ? getAdminSettingsCarImg(carData.thumbnail)
                            : CarImg
                        }
                        alt="CarImg"
                        className="car-container__img"
                        crossOrigin="anonymous"
                        referrerPolicy="origin"
                      />
                      <div className="car-container__title">
                        {carSettings.name}
                      </div>
                      <div className="car-container__car-desc">
                        {carSettings.categoryId?.description}
                      </div>
                      <label className="car-container__file">
                        <input
                          className="car-container__file-input"
                          type="file"
                          id="file"
                        />
                        <span className="car-container__file-custom" />
                      </label>
                    </div>
                    <div className="car-container__progress-bar progress-bar">
                      <div className="progress-bar__desc">
                        <div className="progress-bar__title">Заполнено</div>
                        <span className="progress-bar__progress">74 %</span>
                      </div>
                      <img
                        src={ProgressBar}
                        alt="loader"
                        className="progress-bar__loader"
                      />
                    </div>
                    <div className="car-container__desc">
                      <div className="car-container__desc-title">Описание</div>
                      <div className="car-container__desc-text">
                        {carSettings.description}
                      </div>
                    </div>
                  </div>
                  <div className="car-settings__settings-container settings-container">
                    <div className="settings-container__form">
                      <div className="settings-container__title">
                        Настройки автомобиля
                      </div>
                      <div className="settings-container__items">
                        <div className="settings-container__item">
                          <TextField
                            name="model"
                            title="Модель автомобиля"
                            placeholder="Введите модель"
                            type="text"
                          />
                        </div>
                        <div className="settings-container__item">
                          <TextField
                            name="modelType"
                            title="Тип автомобиля"
                            placeholder="Введите тип"
                            type="text"
                          />
                        </div>
                        <div className="settings-container__item">
                          <TextField
                            name="modelColors"
                            title="Доступные цвета"
                            placeholder="Введите цвет"
                            type="text"
                          />
                          <button
                            type="button"
                            className="settings-container__item-btn"
                          />
                        </div>
                      </div>
                      <div className="settings-container__checkboxes">
                        <CheckBoxes direction="column" items={colorOptions} />
                      </div>
                      <div className="settings-container__buttons">
                        <div className="settings-container__buttons-edit">
                          <Button additionalStyles="button__admin">
                            Сохранить
                          </Button>
                          <Button
                            additionalStyles="button__admin"
                            disabled={true}
                          >
                            Отменить
                          </Button>
                        </div>
                        <div className="settings-container__buttons-delete">
                          <Button additionalStyles="button__admin button__admin--cancel">
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

const mapStateToProps = (state) => ({
  carsTotal: state.carSettings.carsTotal,
  isCarsFetching: state.carSettings.isCarsFetching,
  carData: state.carSettings.carData,
})

export default connect(mapStateToProps, { requestCarData })(AdminCarSettings)
