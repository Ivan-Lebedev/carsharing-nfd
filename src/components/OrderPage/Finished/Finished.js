import React from 'react'
import './Finished.css'
import Total from '../Total/Total'

export const Finished = ({ formData }) => {
  return (
    <div className='finished'>
      <div className='finished__title'>Ваш заказ подтверждён</div>
      <Total formData={formData} />
    </div>
  )
}
