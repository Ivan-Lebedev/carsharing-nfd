import React, { useEffect } from "react"
import "./Location.css"
import Map from "./Map"
import { connect } from "react-redux"
import { requestCities, requestPoints } from "../../../store/order-reducer"
import {
  getListOfCities,
  getPoints,
  getCities,
} from "../../../store/order-selectors"
import { SearchCity, SearchPoint } from "../../common/Forms/Forms"

const Location = ({
  formik,
  listOfCities,
  points,
  cities,
  requestCities,
  requestPoints,
}) => {
  useEffect(() => {
    if (points.length === 0) {
      requestCities()
      requestPoints()
    }
  }, [points, requestCities, requestPoints])

  const listOfPoints = points.reduce((result, point) => {
    if (formik.values.locationCity === point.cityId.name) {
      result.push(point.address)
    }
    return result
  }, [])

  return (
    <div className="location">
      <SearchCity
        item={{
          name: "locationCity",
          label: "Город",
          placeholder: "Начните вводить город...",
          value: formik.values.locationCity,
          options: listOfCities,
        }}
        onChange={formik.handleChange}
        formik={formik}
      />
      <SearchPoint
        item={{
          name: "locationPoint",
          label: "Пункт выдачи",
          placeholder: "Начните вводить пункт...",
          value: formik.values.locationPoint,
          options: listOfPoints,
        }}
        onChange={formik.handleChange}
        formik={formik}
      />
      <div className="location__map">
        <div className="location__map-header">Выбрать на карте:</div>
        <div className="location__map-img">
          <Map formik={formik} points={points} cities={cities} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  listOfCities: getListOfCities(state),
  points: getPoints(state),
  cities: getCities(state),
})

export default connect(mapStateToProps, { requestCities, requestPoints })(
  Location
)
