import React from "react"
import Total from "./Total"
import { connect } from "react-redux"
import { getCars } from "../../../store/order-selectors"

const TotalContainer = ({ orderData, formData, cars }) => {
  let carName
  let carNumber
  let carFuel
  let dateFrom
  let carImg

  const getCarImg = (car) => {
    return car?.thumbnail?.path.includes("base64")
      ? car?.thumbnail?.path
      : `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${car?.thumbnail?.path}`
  }

  if (orderData) {
    carName = orderData.carId.name
    carNumber = orderData.carId.number || "K 761 HA 73"
    carFuel = `${orderData.carId.tank}  %`
    const date = new Date(orderData.dateFrom)
    dateFrom = date.toLocaleDateString()
    carImg = getCarImg(orderData.carId)
  } else {
    const carData = cars.find((car) => car?.name === formData?.model)
    carName = carData?.name
    carNumber = carData?.number || "K 761 HA 73"
    carFuel = formData?.isFullTank ? "100%" : `${carData?.tank || "50"} %`
    const date = new Date(formData?.dateFrom)
    dateFrom = date?.toLocaleDateString()
    carImg = getCarImg(carData)
  }

  return (
    <Total
      carName={carName}
      carNumber={carNumber}
      carFuel={carFuel}
      dateFrom={dateFrom}
      carImg={carImg}
    />
  )
}

const mapStateToProps = (state) => ({
  cars: getCars(state),
})

export default connect(mapStateToProps)(TotalContainer)
