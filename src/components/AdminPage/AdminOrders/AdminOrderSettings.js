import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import {
  requestOrderData,
  requestCarsData,
  requestCitiesData,
} from "../../../store/admin-order-settings-reducer"
import {
  getAdminOrdersCarImg,
  getAdminOrdersAllOptions,
  getAdminOrderCurrentModel,
  getAdminOrderColors,
} from "../../common/helpers/Helpers"
import CarImg from "../../../assets/images/CoveredCar.png"
import Loader from "../../common/Loader/Loader"
import { CarSettingsFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"

const colors = [
  { key: "Тускло-серый", value: "Тускло-серый" },
  { key: "Тускло-зеленый", value: "Тускло-зеленый" },
]

const AdminOrderSettings = ({
  isOrderFetching,
  orderData,
  citiesData,
  pointsData,
  carsData,
  requestOrderData,
  requestCarsData,
  requestCitiesData,
}) => {
  const location = useLocation()
  const history = useHistory()
  const orderId = location.pathname.split("/")[3]

  const carModels = [...getAdminOrdersAllOptions(carsData)]
  const [orderSettings, setOrderSettings] = useState(orderData)
  const [carImg, setCarImg] = useState(CarImg)
  const [isDataReady, setIsDataReady] = useState(false)
  const [currentModel, setCurrentModel] = useState(null)
  const [carColors, setCarColors] = useState(null)
  const [currentColor, setCurrentColor] = useState(null)
  const [cities, setCities] = useState(null)
  const [currentCity, setCurrentCity] = useState(null)

  useEffect(() => {
    requestOrderData(orderId)
    requestCarsData()
    requestCitiesData()
  }, [requestOrderData, orderId, requestCarsData, requestCitiesData])

  useEffect(() => {
    setOrderSettings(orderData)
  }, [orderData])

  useEffect(() => {
    if (orderSettings && carsData.length && citiesData) {
      setIsDataReady(true)
      setCarImg(getAdminOrdersCarImg(orderSettings))
      setCurrentModel(getAdminOrderCurrentModel(orderSettings.carId))
      setCities(getAdminOrdersAllOptions(citiesData))
      setCurrentCity(
        getAdminOrdersAllOptions(citiesData).find(
          (item) => item.value === orderSettings.cityId.id,
        ),
      )
      setCarColors(
        getAdminOrderColors(
          orderSettings.carId.colors.length
            ? orderSettings.carId.colors
            : ["НЕТ ДАННЫХ"], // из-за того, что кто-то добавил машину без цветов пришлось написать проверки для этого случая
        ),
      )
      setCurrentColor(
        getAdminOrderColors(orderSettings.carId.colors).find(
          (item) => item.value === orderSettings.color,
        ) ?? {
          key: "НЕТ ДАННЫХ",
          value: "НЕТ ДАННЫХ",
        },
      )
    }
  }, [orderSettings, carsData.length, citiesData])

  const currentModelHandleChange = (e) => {
    const { value } = e.target
    setCurrentModel(carModels.find((item) => item.value === value))
    setOrderSettings({
      ...orderSettings,
      carId: carsData.find((item) => item.id === value),
      color:
        carsData.find((item) => item.id === value).colors[0] ?? "НЕТ ДАННЫХ",
    })
  }

  const currentColorHandleChange = (e) => {
    const { value } = e.target
    setCurrentColor(carColors.find((item) => item.value === value))
    setOrderSettings({
      ...orderSettings,
      color: carColors.find((item) => item.value === value).value,
    })
  }

  const currentCityHandleChange = (e) => {
    const { value } = e.target
    setCurrentCity(cities.find((item) => item.value === value))
    setOrderSettings({
      ...orderSettings,
      cityId: citiesData.find((item) => item.id === value),
    })
  }

  console.log(orderSettings)
  // console.log(carsData)
  // console.log(currentModel)
  // console.log(carModels)
  // console.log(currentColor)
  // console.log(carColors)
  // console.log(currentCity)
  // console.log(cities)
  // console.log(citiesData)

  return (
    <div className="admin__orders">
      {!isDataReady ? (
        <Loader admin />
      ) : (
        <>
          <div className="content__title">Заказ № {orderId}</div>
          <div className="content__card orders">
            <div className="orders__content order-settings">
              <div className="car-container__car-details">
                <div className="settings-container__title">Выбранное авто</div>
                <img
                  src={carImg}
                  alt="CarImg"
                  className="car-container__img"
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                />
                <div className="car-container__title">
                  {orderSettings.carId.name}
                </div>
                <div className="car-container__car-desc">
                  {orderSettings.carId.categoryId?.description}
                </div>
              </div>

              <div className="settings-container__form order-settings__options">
                <div className="settings-container__title">
                  Параметры заказа
                </div>
                <div className="settings-container__item">
                  <CarSettingsFilter
                    title="Модель авто"
                    name="categoryId"
                    options={carModels}
                    value={currentModel.value}
                    onChange={currentModelHandleChange}
                  />
                </div>
                <div className="settings-container__item">
                  <CarSettingsFilter
                    title="Цвет авто"
                    name="categoryId"
                    options={carColors}
                    value={currentColor.value}
                    onChange={currentColorHandleChange}
                  />
                </div>
                <div className="settings-container__item">
                  <CarSettingsFilter
                    title="Город выдачи"
                    name="categoryId"
                    options={cities}
                    value={currentCity.value}
                    onChange={currentCityHandleChange}
                  />
                </div>
                <div className="settings-container__item">
                  <CarSettingsFilter
                    title="Адрес выдачи"
                    name="categoryId"
                    options={colors}
                    // onChange={typeHandleChange}
                  />
                </div>
                <div className="settings-container__buttons">
                  <div className="settings-container__buttons-edit">
                    <Button
                      additionalStyles="button__admin"
                      // disabled={!(progress === 100)}
                      // onClick={submitCarData}
                    >
                      Сохранить
                    </Button>
                    <Button
                      additionalStyles="button__admin"
                      // disabled={progress === 0}
                      // onClick={discardChanges}
                    >
                      Отменить
                    </Button>
                  </div>
                  <div className="settings-container__buttons-delete">
                    <Button
                      additionalStyles="button__admin button__admin--cancel"
                      // disabled={!carId}
                      // onClick={deleteCar}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
const mapStateToProps = (state) => ({
  isOrderFetching: state.orderSettings.isOrderFetching,
  orderData: state.orderSettings.orderData,
  pointsData: state.orderSettings.pointsData,
  carsData: state.orderSettings.carsData,
  citiesData: state.orderSettings.citiesData,
})
export default connect(mapStateToProps, {
  requestOrderData,
  requestCarsData,
  requestCitiesData,
})(AdminOrderSettings)
