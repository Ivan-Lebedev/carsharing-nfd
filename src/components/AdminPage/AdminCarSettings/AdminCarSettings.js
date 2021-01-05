import React, { useState, useEffect } from "react"
import "./AdminCarSettings.scss"
import CarImg from "../../../assets/images/CoveredCar.png"
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
import { useLocation, useHistory } from "react-router-dom"
import Loader from "../../common/Loader/Loader"
import {
  getAdminSettingsCarImg,
  getAdminCarSettingsColorItems,
  getAdminOrdersAllOptions,
} from "../../common/helpers/Helpers"
import AdminAlert from "../AdminAlert/AdminAlert"

let categoryOptions = []

const AdminCarSettings = ({
  carData,
  isCarsFetching,
  requestCarData,
  categoryData,
  newCarId,
  requestCategoryData,
  sendNewCarData,
  updateCarData,
  deleteCarData,
  clearCarData,
}) => {
  const location = useLocation()
  const history = useHistory()
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
    name: carData.name ?? "",
    thumbnail: carData.thumbnail ?? CarImg,
    description: carData.description ?? "",
    categoryId: carData.categoryId ?? {},
    colors: carData.colors ?? [],
    tank: carData.tank ?? 100,
  }

  const initialCompletedFields = {
    priceMax: !!initialSettings.priceMax,
    priceMin: !!initialSettings.priceMin,
    name: !!initialSettings.name,
    thumbnail: initialSettings.thumbnail !== CarImg,
    description: !!initialSettings.description,
    categoryId: !!initialSettings.categoryId.id,
    colors: !!initialSettings.colors.length,
  }

  useEffect(() => {
    setCarSettings(initialSettings)
    setCompletedFields(initialCompletedFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData])

  useEffect(() => {
    requestCategoryData()
  }, [requestCategoryData])

  const [completedFields, setCompletedFields] = useState(initialCompletedFields)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let currentProgress = 0
    const fields = Object.values(completedFields)
    fields.forEach((field) => {
      if (field) {
        currentProgress += 100 / fields.length
      }
    })
    setProgress(Math.trunc(currentProgress))
  }, [completedFields])

  useEffect(() => {
    if (newCarId) {
      history.push(`/admin/car-card/${newCarId}`)
    }
  }, [newCarId, history])

  const [alertData, setAlertData] = useState({
    isVisible: false,
    text: "",
  })
  const alertOnClose = () => {
    setAlertData({ isVisible: false, text: "" })
  }

  const discardChanges = () => {
    setCarSettings(initialSettings)
    setCompletedFields(initialCompletedFields)
    setNewColor("")
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
    if (value) {
      setCompletedFields({
        ...completedFields,
        [name]: true,
      })
    }
    if (!value) {
      setCompletedFields({
        ...completedFields,
        [name]: false,
      })
    }
  }
  const typeHandleChange = (e) => {
    const { value } = e.target
    setCarSettings({
      ...carSettings,
      categoryId: categoryData.find((item) => item.id === value),
    })
    if (value) {
      setCompletedFields({
        ...completedFields,
        categoryId: true,
      })
    }
    if (!value) {
      setCompletedFields({
        ...completedFields,
        categoryId: false,
      })
    }
  }
  const colorsCheckBoxesHandleChange = (e) => {
    const { value } = e.target
    carSettings.colors.splice(carSettings.colors.indexOf(value), 1)
    setCarSettings({
      ...carSettings,
      colors: carSettings.colors,
    })
    if (!carSettings.colors.length) {
      setCompletedFields({
        ...completedFields,
        colors: false,
      })
    }
  }
  const addNewColor = () => {
    if (!carSettings.colors.includes(newColor.trim()) && newColor.trim()) {
      carSettings.colors.push(newColor.trim())
      setCarSettings({
        ...carSettings,
        colors: carSettings.colors,
      })
      setCompletedFields({
        ...completedFields,
        colors: true,
      })
      setNewColor("")
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
    setCompletedFields({
      ...completedFields,
      thumbnail: true,
    })
  }
  const submitCarData = () => {
    if (!carId) {
      sendNewCarData(carSettings)
      setAlertData({ isVisible: true, text: "Успех! Машина сохранена" })
    }
    if (carId) {
      updateCarData(carSettings, carId)
      setAlertData({ isVisible: true, text: "Успех! Параметры обновлены" })
    }
  }
  const deleteCar = () => {
    if (carId) {
      deleteCarData(carId)
      discardChanges()
      history.push(`/admin/car-card/`)
      setAlertData({ isVisible: true, text: "Успех! Машина удалена" })
    }
  }

  // console.log("carId:", carId, carData)
  // console.log(carSettings)
  // console.log(progress)
  // console.log(completedFields)
  // console.log(history)
  // console.log(newCarId)
  // console.log(alertOnClose)

  return (
    <div className="admin__car-settings car-settings">
      <AdminAlert alertData={alertData} alertOnClose={alertOnClose} />
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
                  <span className="progress-bar__progress">{progress} %</span>
                </div>
                <div className="progress-bar__loader">
                  <div
                    className="progress-bar__loader-line"
                    style={{
                      opacity: `${progress ? 1 : 0}`,
                      width: `${progress}%`,
                    }}
                  />
                </div>
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
                      value={carSettings.name}
                      onChange={inputHandleChange}
                    />
                  </div>
                  <div className="settings-container__item">
                    <CarSettingsField
                      name="priceMin"
                      title="Минимальная цена"
                      placeholder="Введите цену"
                      type="number"
                      value={carSettings.priceMin}
                      onChange={inputHandleChange}
                    />
                  </div>
                  <div className="settings-container__item">
                    <CarSettingsField
                      name="priceMax"
                      title="Максимальная цена"
                      placeholder="Введите цену"
                      type="number"
                      value={carSettings.priceMax}
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
                      disabled={!(progress === 100)}
                      onClick={submitCarData}
                    >
                      Сохранить
                    </Button>
                    <Button
                      additionalStyles="button__admin"
                      disabled={progress === 0}
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
  newCarId: state.carSettings.newCarId,
})

export default connect(mapStateToProps, {
  requestCarData,
  requestCategoryData,
  sendNewCarData,
  updateCarData,
  deleteCarData,
  clearCarData,
})(AdminCarSettings)
