import React, { useState, useEffect } from "react"
import "./AdminCarSettings.scss"
import CarImg from "../../../assets/images/CoveredCar.png"
import ProgressBar from "../../../assets/images/Progress Bar.png"
import { Form, Formik } from "formik"
import {
  CheckBoxes,
  CarSettingsField,
  CarSettingsFilter,
} from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"
import { connect } from "react-redux"
import {
  requestCarData,
  requestCategoryData,
} from "../../../store/car-settings-reducer"
import { useLocation } from "react-router-dom"
import Loader from "../../common/Loader/Loader"
import {
  getAdminSettingsCarImg,
  getAdminCarSettingsColorItems,
  getAdminOrdersAllOptions,
} from "../../common/helpers/Helpers"

const initialValues = {
  model: "",
  modelType: "",
  modelColors: "",
}

const AdminCarSettings = ({
  carData,
  isCarsFetching,
  requestCarData,
  categoryData,
  requestCategoryData,
}) => {
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
  const [newColor, setNewColor] = useState("")
  useEffect(() => {
    if (carId) {
      requestCarData(carId)
    }
  }, [requestCarData, carId])
  useEffect(() => {
    // if (carId) {
    setCarSettings({
      priceMax: carData.priceMax ?? "priceMax",
      priceMin: carData.priceMin ?? "priceMin",
      name: carData.name ?? "Введите модель",
      thumbnail: carData.thumbnail ?? CarImg,
      description: carData.description ?? "description",
      categoryId: carData.categoryId ?? {},
      colors: carData.colors ?? [],
    })
    // }
  }, [carData])

  useEffect(() => {
    requestCategoryData()
  }, [requestCategoryData])

  const textHandleChange = (e) => {
    const { name, value } = e.target
    setCarSettings({
      ...carSettings,
      [name]: value,
    })
  }
  const priceHandleChange = (e) => {
    const { name, value } = e.target
    setCarSettings({
      ...carSettings,
      [name]: +value,
    })
  }
  const typeHandleChange = (e) => {
    const { value } = e.target
    setCarSettings({
      ...carSettings,
      categoryId: categoryData.find((item) => item.id === value),
    })
  }
  const colorsCheckBoxesHandeChange = (e) => {
    const { value } = e.target
    carSettings.colors.splice(carSettings.colors.indexOf(value), 1)
    setCarSettings({
      ...carSettings,
      colors: carSettings.colors,
    })
  }
  const addNewColor = () => {
    if (!carSettings.colors.includes(newColor.trim()) && newColor.trim()) {
      carSettings.colors.push(newColor.trim())
      console.log("inside")
      setCarSettings({
        ...carSettings,
        colors: carSettings.colors,
      })
    }
  }
  const fileHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setCarSettings({
        ...carSettings,
        thumbnail: reader.result,
      })
    }
  }

  // console.log(carId, carData)
  console.log(carSettings)
  // console.log(categoryData)
  // console.log(newColor)

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
                            : carSettings.thumbnail
                          // getAdminSettingsCarImg(carSettings.thumbnail)
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
                          name="file"
                          accept="image/*"
                          onChange={fileHandler}
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
                      <textarea
                        name="description"
                        cols="45"
                        rows="5"
                        maxLength="200"
                        className="car-container__desc-text"
                        value={carSettings.description}
                        onChange={textHandleChange}
                      />
                    </div>
                  </div>
                  <div className="car-settings__settings-container settings-container">
                    <div className="settings-container__form">
                      <div className="settings-container__title">
                        Настройки автомобиля
                      </div>
                      <div className="settings-container__items">
                        <div className="settings-container__item">
                          <CarSettingsField
                            name="name"
                            title="Модель автомобиля"
                            placeholder="Введите модель"
                            type="text"
                            onChange={textHandleChange}
                          />
                        </div>
                        <div className="settings-container__item">
                          <CarSettingsField
                            name="priceMin"
                            title="Минимальная цена"
                            placeholder="Введите цену"
                            type="number"
                            onChange={priceHandleChange}
                          />
                        </div>
                        <div className="settings-container__item">
                          <CarSettingsField
                            name="priceMax"
                            title="Максимальная цена"
                            placeholder="Введите цену"
                            type="number"
                            onChange={priceHandleChange}
                          />
                        </div>
                        <div className="settings-container__item">
                          <CarSettingsFilter
                            title="Тип авто"
                            name="categoryId"
                            options={getAdminOrdersAllOptions(categoryData)}
                            onChange={typeHandleChange}
                          />
                        </div>
                        <div className="settings-container__item">
                          <CarSettingsField
                            name="colors"
                            title="Доступные цвета"
                            placeholder="Введите цвет"
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                          />
                          <button
                            onClick={addNewColor}
                            type="button"
                            className="settings-container__item-btn"
                          />
                        </div>
                      </div>
                      <div className="settings-container__checkboxes">
                        <CheckBoxes
                          onChange={colorsCheckBoxesHandeChange}
                          isChangeable
                          direction="column"
                          items={getAdminCarSettingsColorItems(
                            carSettings.colors,
                          )}
                        />
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
  categoryData: state.carSettings.categoryData,
})

export default connect(mapStateToProps, {
  requestCarData,
  requestCategoryData,
})(AdminCarSettings)
