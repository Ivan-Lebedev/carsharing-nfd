import React from 'react'
import './Total.css'
import car_2 from '../../../assets/images/car_2.png'

const Total = ({ formData }) => {
  return (
    <div className='total'>
      <div className='total__info'>
        <p className='total__model'>{formData.model}</p>
        <p className='total__number'>K 761 HA 73</p>
        <p className='total__fuel'>
          Топливо{' '}
          <span className='total__fuel-count'>
            {formData.fuel ? '100%' : '50%'}
          </span>
        </p>
        <p className='total__access'>
          Доступна с{' '}
          <span className='total__access-date'>12.06.2019 12:00</span>
        </p>
      </div>
      <img className='total__car-img' src={car_2} alt='total__car' />
    </div>
  )
}

export default Total
