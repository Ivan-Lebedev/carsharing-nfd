import React from "react"
import "./Total.css"

const Total = ({ carName, carNumber, carFuel, dateFrom, carImg }) => {
  return (
    <div className="total">
      <div className="total__info">
        <p className="total__model">{carName}</p>
        <p className="total__number">{carNumber}</p>
        <p className="total__fuel">
          Топливо <span className="total__fuel-count">{carFuel}</span>
        </p>
        <p className="total__access">
          Доступна с <span className="total__access-date">{dateFrom}</span>
        </p>
      </div>
      <img
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={carImg}
        className="total__car-img"
        alt="total__car"
      />
    </div>
  )
}

export default Total
