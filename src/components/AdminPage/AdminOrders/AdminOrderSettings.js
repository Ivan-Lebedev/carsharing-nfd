import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useLocation, useHistory } from "react-router-dom"
import { requestOrderData } from "../../../store/admin-order-settings-reducer"
import { getAdminOrdersCarImg } from "../../common/helpers/Helpers"
import CarImg from "../../../assets/images/CoveredCar.png"
import Loader from "../../common/Loader/Loader"

const AdminOrderSettings = ({
  isOrderFetching,
  orderData,
  pointsData,
  carsData,
  requestOrderData,
}) => {
  const location = useLocation()
  const history = useHistory()
  const orderId = location.pathname.split("/")[3]

  const [orderSettings, setOrderSettings] = useState(orderData)
  const [carImg, setCarImg] = useState(CarImg)
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    requestOrderData(orderId)
  }, [requestOrderData, orderId])

  useEffect(() => {
    setOrderSettings(orderData)
  }, [orderData])

  useEffect(() => {
    if (orderSettings) {
      setCarImg(getAdminOrdersCarImg(orderSettings))
      setIsDataReady(true)
    }
  }, [orderSettings])

  console.log(orderSettings) //log
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

              <div className="settings-container__form"></div>
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
})
export default connect(mapStateToProps, { requestOrderData })(
  AdminOrderSettings,
)
