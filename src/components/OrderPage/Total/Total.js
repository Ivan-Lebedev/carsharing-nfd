import React from 'react'
import './Total.css'
import { connect } from 'react-redux'
import { getCars } from '../../../store/order-selectors'

const TotalContainer = ({ orderData, formData, cars }) => {
  let carName
  let carNumber
  let carFuel
  let dateFrom
  let carImg

  console.log('cars:', cars)
  console.log('orderData:', orderData)
  console.log('formData:', formData)

  const getCarImg = (car) => {
    return car?.thumbnail?.path.includes('base64')
      ? car?.thumbnail?.path
      : `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${car?.thumbnail?.path}`
  }

  if (orderData) {
    carName = orderData.carId.name
    carNumber = orderData.carId.number || 'K 761 HA 73'
    carFuel = `${orderData.carId.tank}  %`
    const date = new Date(orderData.dateFrom)
    dateFrom = date.toLocaleDateString()
    // carImg = orderData.carId.thumbnail.path
    carImg = getCarImg(orderData.carId)
  } else {    
    const carData = cars.find((car) => car?.name === formData?.model)
    
    carName = carData?.name
    carNumber = carData?.number || 'K 761 HA 73'
    carFuel = formData?.isFullTank ? '100%' : `${carData?.tank || '50'} %`
    const date = new Date(formData?.dateFrom)
    dateFrom = date?.toLocaleDateString()
    // carImg = carData?.thumbnail.path
    carImg = getCarImg(carData)

    console.log('carData:', carData)
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

const Total = ({ carName, carNumber, carFuel, dateFrom, carImg }) => {
  return (
    <div className='total'>
      <div className='total__info'>
        <p className='total__model'>{carName}</p>
        <p className='total__number'>{carNumber}</p>
        <p className='total__fuel'>
          Топливо <span className='total__fuel-count'>{carFuel}</span>
        </p>
        <p className='total__access'>
          Доступна с{' '}
          <span className='total__access-date'>{dateFrom} 12:00</span>
        </p>
      </div>
      <img
        crossOrigin='anonymous'
        referrerPolicy='origin'
        // src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${carImg}`}
        src={carImg}
        className='total__car-img'
        alt='total__car'
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  cars: getCars(state),
})

export default connect(mapStateToProps)(TotalContainer)
