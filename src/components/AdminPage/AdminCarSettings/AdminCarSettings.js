import React, { useState, useEffect } from "react"
import "./AdminCarSettings.scss"
import CarImg from "../../../assets/images/CoveredCar.png"
import ProgressBar from "../../../assets/images/Progress Bar.png"
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
  sendNewCarData,
  updateCarData,
  deleteCarData,
  clearCarData,
} from "../../../store/car-settings-reducer"
import { useLocation } from "react-router-dom"
import Loader from "../../common/Loader/Loader"
import {
  getAdminSettingsCarImg,
  getAdminCarSettingsColorItems,
  getAdminOrdersAllOptions,
} from "../../common/helpers/Helpers"

let categoryOptions = []

const AdminCarSettings = ({
  carData,
  isCarsFetching,
  requestCarData,
  categoryData,
  requestCategoryData,
  sendNewCarData,
  updateCarData,
  deleteCarData,
  clearCarData,
}) => {
  const location = useLocation()
  const carId = location.pathname.split("/")[3]
  categoryOptions = [
    { key: "Выберите категорию", value: "" },
    ...getAdminOrdersAllOptions(categoryData),
  ]
  const [newColor, setNewColor] = useState("")
  const [carSettings, setCarSettings] = useState({
    priceMax: "",
    priceMin: "",
    name: "",
    thumbnail: CarImg,
    description: "",
    categoryId: {},
    colors: [],
    tank: 100,
  })

  useEffect(() => {
    if (carId) {
      requestCarData(carId)
    }
    if (!carId) {
      clearCarData()
    }
  }, [requestCarData, carId, clearCarData])

  const initialSettings = {
    priceMax: carData.priceMax ?? "",
    priceMin: carData.priceMin ?? "",
    name: carData.name ?? "Введите модель",
    thumbnail: carData.thumbnail ?? CarImg,
    description: carData.description ?? "",
    categoryId: carData.categoryId ?? {},
    colors: carData.colors ?? [],
    tank: carData.tank ?? 100,
  }

  useEffect(() => {
    setCarSettings(initialSettings)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData])

  useEffect(() => {
    requestCategoryData()
  }, [requestCategoryData])

  const discardChanges = () => {
    setCarSettings(initialSettings)
  }
  const inputHandleChange = (e) => {
    const { name, value } = e.target
    if (name.includes("price")) {
      setCarSettings({
        ...carSettings,
        [name]: +value,
      })
    } else {
      setCarSettings({
        ...carSettings,
        [name]: value,
      })
    }
  }
  const typeHandleChange = (e) => {
    const { value } = e.target
    setCarSettings({
      ...carSettings,
      categoryId: categoryData.find((item) => item.id === value),
    })
  }
  const colorsCheckBoxesHandleChange = (e) => {
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
        thumbnail: {
          originalname: file.name,
          mimetype: file.type,
          size: file.size,
          path: reader.result,
        },
      })
    }
  }
  const submitCarData = () => {
    if (!carId) {
      sendNewCarData(carSettings)
    }
    if (carId) {
      updateCarData(carSettings, carId)
    }
  }
  const deleteCar = () => {
    if (carId) {
      deleteCarData(carId)
    }
  }

  // console.log("carId:", carId, carData)
  console.log(carSettings)

  return (
    <div className="admin__car-settings car-settings">
      <div className="content__title">Карточка автомобиля</div>
      <div className="car-settings__content">
        {isCarsFetching ? (
          <Loader admin />
        ) : (
          <>
            <div className="car-settings__car-container car-container">
              <div className="car-container__car-details">
                <img
                  src={getAdminSettingsCarImg(carSettings.thumbnail)}
                  alt="CarImg"
                  className="car-container__img"
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                />
                <div className="car-container__title">{carSettings.name}</div>
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
                  placeholder="Введите описание"
                  name="description"
                  maxLength="200"
                  className="car-container__desc-text"
                  value={carSettings.description}
                  onChange={inputHandleChange}
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
                      onChange={inputHandleChange}
                    />
                  </div>
                  <div className="settings-container__item">
                    <CarSettingsField
                      name="priceMin"
                      title="Минимальная цена"
                      placeholder="Введите цену"
                      type="number"
                      onChange={inputHandleChange}
                    />
                  </div>
                  <div className="settings-container__item">
                    <CarSettingsField
                      name="priceMax"
                      title="Максимальная цена"
                      placeholder="Введите цену"
                      type="number"
                      onChange={inputHandleChange}
                    />
                  </div>
                  <div className="settings-container__item">
                    <CarSettingsFilter
                      title="Тип авто"
                      name="categoryId"
                      options={categoryOptions}
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
                    onChange={colorsCheckBoxesHandleChange}
                    isChangeable
                    direction="column"
                    items={getAdminCarSettingsColorItems(carSettings.colors)}
                  />
                </div>
                <div className="settings-container__buttons">
                  <div className="settings-container__buttons-edit">
                    <Button
                      additionalStyles="button__admin"
                      onClick={submitCarData}
                    >
                      Сохранить
                    </Button>
                    <Button
                      additionalStyles="button__admin"
                      // disabled={true}
                      onClick={discardChanges}
                    >
                      Отменить
                    </Button>
                  </div>
                  <div className="settings-container__buttons-delete">
                    <Button
                      additionalStyles="button__admin button__admin--cancel"
                      disabled={!carId}
                      onClick={deleteCar}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
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
  sendNewCarData,
  updateCarData,
  deleteCarData,
  clearCarData,
})(AdminCarSettings)
