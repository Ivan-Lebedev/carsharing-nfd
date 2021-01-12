import React, { useEffect, useState } from "react"
import "./Model.css"
import classNames from "classnames"
import { connect } from "react-redux"
import { getCars, isCarsFetching } from "../../../store/order-selectors"
import { requestCars } from "../../../store/order-reducer"
import { RadioBtns } from "../../common/Forms/Forms"
import Loader from "../../common/Loader/Loader"
import { thumbnailURL } from "../../../constants/urls"

const Model = ({ formik, listOfCars, requestCars, isCarsFetching }) => {
  const [listOfFilteredCars, setListOfFilteredCars] = useState(listOfCars)

  useEffect(() => requestCars(), [requestCars])

  useEffect(() => {
    const filterCars = () => {
      if (formik.values.modelFilter === "Все модели") {
        return setListOfFilteredCars(listOfCars)
      } else {
        return setListOfFilteredCars(
          listOfCars.filter(
            (car) => car.categoryId.name === formik.values.modelFilter,
          ),
        )
      }
    }
    filterCars()
  }, [listOfCars, formik.values.modelFilter])

  const cardClass = (carName) =>
    classNames("catalog__car", {
      "catalog__car--active": carName === formik.values.model,
    })

  const getCarImg = (car) => {
    return car.thumbnail.path.includes("base64")
      ? car.thumbnail.path
      : `${thumbnailURL}${car.thumbnail.path}`
  }

  const setValue = (car) => {
    formik.setValues({ ...formik.values, model: car.name })
  }

  const radioBtnsItems = [
    {
      value: "Все модели",
      checked: formik.values.modelFilter === "Все модели",
    },
    {
      value: "Эконом",
      checked: formik.values.modelFilter === "Эконом",
    },
    {
      value: "Премиум",
      checked: formik.values.modelFilter === "Премиум",
    },
  ]

  return (
    <div className="model">
      {isCarsFetching ? (
        <Loader />
      ) : (
        <>
          <RadioBtns
            onChange={formik.handleChange}
            name="modelFilter"
            items={radioBtnsItems}
          />
          <div className="catalog">
            {listOfFilteredCars.map((car) => (
              <div
                className={cardClass(car.name)}
                key={car.id}
                onClick={() => setValue(car)}
              >
                <div className="catalog__car-title">
                  <div className="catalog__car-name">{car.name}</div>
                  <div className="catalog__car-price">{`${car.priceMin} - ${car.priceMax} ₽`}</div>
                </div>
                <img
                  className="catalog__car-img"
                  src={getCarImg(car)}
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                  alt="car-img"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  listOfCars: getCars(state),
  isCarsFetching: isCarsFetching(state),
})

export default connect(mapStateToProps, { requestCars })(Model)
