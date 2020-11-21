import React from 'react'
import './Total.css'
import { connect } from 'react-redux'
import { getCars } from '../../../store/order-selectors'

const Total = ({ formData, cars }) => {
  const carData = cars.find((car) => car.name === formData.model)
  console.log(carData)
  return (
    <div className='total'>
      <div className='total__info'>
        <p className='total__model'>{carData.name}</p>
        <p className='total__number'>{carData.number || 'K 761 HA 73'}</p>
        <p className='total__fuel'>
          Топливо{' '}
          <span className='total__fuel-count'>
            {formData.isFullTank ? '100%' : `${carData.tank || '50'}%`}
          </span>
        </p>
        <p className='total__access'>
          Доступна с{' '}
          <span className='total__access-date'>
            {formData.dateFrom.toLocaleDateString()} 12:00
          </span>
        </p>
      </div>
      <img
        crossOrigin='anonymous'
        referrerPolicy='origin'
        src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${carData.thumbnail.path}`}
        className='total__car-img'
        alt='total__car'
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  cars: getCars(state),
})

export default connect(mapStateToProps)(Total)
