import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import {
  requestOrderData,
  requestCarsData,
  requestCitiesData,
  requestPointsData,
  updateOrderData,
  deleteOrderData,
} from "../../../store/admin-order-settings-reducer"
import {
  getAdminOrdersCarImg,
  getAdminOrdersAllOptions,
  getAdminOrderCurrentModel,
  getAdminOrderColors,
  getAdminOrderSettingsPoints,
} from "../../common/helpers/Helpers"
import CarImg from "../../../assets/images/CoveredCar.png"
import Loader from "../../common/Loader/Loader"
import { CarSettingsFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"

const AdminOrderSettings = ({
  isOrderFetching,
  orderData,
  citiesData,
  pointsData,
  carsData,
  requestOrderData,
  requestCarsData,
  requestCitiesData,
  requestPointsData,
  updateOrderData,
  deleteOrderData,
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
  const [points, setPoints] = useState(null)
  const [currentPoint, setCurrentPoint] = useState(null)

  useEffect(() => {
    requestOrderData(orderId)
    requestCarsData()
    requestCitiesData()
    requestPointsData()
  }, [
    requestOrderData,
    orderId,
    requestCarsData,
    requestCitiesData,
    requestPointsData,
  ])

  useEffect(() => {
    setOrderSettings(orderData)
  }, [orderData])

  useEffect(() => {
    if (orderSettings && carsData.length && citiesData && pointsData) {
      if (!orderSettings.carId) {
        setCarImg(CarImg)
        setCurrentModel({
          key: "НЕТ ДАННЫХ",
          value: "НЕТ ДАННЫХ",
        })
        setCarColors(["НЕТ ДАННЫХ"])
        setCurrentColor({
          key: "НЕТ ДАННЫХ",
          value: "НЕТ ДАННЫХ",
        })
      }
      if (orderSettings.carId) {
        setCarImg(getAdminOrdersCarImg(orderSettings))
        setCurrentModel(getAdminOrderCurrentModel(orderSettings.carId))
        setCarColors(
          getAdminOrderColors(
            orderSettings.carId.colors.length
              ? orderSettings.carId.colors
              : ["НЕТ ДАННЫХ"],
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
      setIsDataReady(true)
      setCities(getAdminOrdersAllOptions(citiesData))
      setCurrentCity(
        getAdminOrdersAllOptions(citiesData).find(
          (item) => item.value === orderSettings.cityId.id,
        ),
      )
      const currentPoints = getAdminOrderSettingsPoints(
        pointsData.filter(
          (item) =>
            item.cityId.id ===
            getAdminOrdersAllOptions(citiesData).find(
              (item) => item.value === orderSettings.cityId.id,
            ).value,
        ),
      )
      setPoints(currentPoints)
      setCurrentPoint(
        currentPoints.find((item) => item.value === orderSettings.pointId.id) ??
          currentPoints[0] ?? {
            key: "НЕТ ДАННЫХ",
            value: "НЕТ ДАННЫХ",
          },
      )
    }
  }, [orderSettings, carsData.length, citiesData, pointsData])

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

  const currentPointHandleChange = (e) => {
    const { value } = e.target
    const currentPointData = pointsData.find((item) => item.id === value)
    const copyCurrentPointData = { ...currentPointData }
    delete copyCurrentPointData.cityId
    setCurrentPoint(points.find((item) => item.value === value))
    setOrderSettings({
      ...orderSettings,
      pointId: copyCurrentPointData,
    })
  }

  const discardChanges = () => {
    requestOrderData(orderId)
  }

  const submitOrderData = () => {
    updateOrderData(orderSettings, orderId)
  }

  const deleteOrder = () => {
    deleteOrderData(orderId)
    discardChanges()
    history.push(`/admin/orders/`)
  }

  return (
    <div className="admin__orders">
      {!isDataReady || isOrderFetching ? (
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
                  {orderSettings.carId?.name || "НЕТ ДАННЫХ"}
                </div>
                <div className="car-container__car-desc">
                  {orderSettings.carId?.categoryId?.description || "НЕТ ДАННЫХ"}
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
                    options={points}
                    value={currentPoint.value}
                    onChange={currentPointHandleChange}
                  />
                </div>
                <div className="settings-container__buttons">
                  <div className="settings-container__buttons-edit">
                    <Button
                      additionalStyles="button__admin"
                      onClick={submitOrderData}
                    >
                      Сохранить
                    </Button>
                    <Button
                      additionalStyles="button__admin"
                      onClick={discardChanges}
                    >
                      Отменить
                    </Button>
                  </div>
                  <div className="settings-container__buttons-delete">
                    <Button
                      additionalStyles="button__admin button__admin--cancel"
                      onClick={deleteOrder}
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
  requestPointsData,
  updateOrderData,
  deleteOrderData,
})(AdminOrderSettings)
