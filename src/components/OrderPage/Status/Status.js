import React from 'react'
import './Status.css'

const Status = () => {
  return (
    <div className='status'>
      <div className='status__header'>Ваш заказ:</div>
      <div className='status__location'>
        <div className='status__location-title'>Пункт выдачи</div>
        <div className='status__location-dash'></div>
        <div className='status__location-place'>Ульяновск, Нариманова 42</div>
      </div>
      <div className='status__price'>
        <span className='status__price-header'>Цена: </span>
        от <span className='status__price-digits'> 8 000 </span>
        до <span className='status__price-digits'> 12 000 </span>₽
      </div>
      <button className='button status__price-btn button--disabled'>
        Выбрать модель
      </button>
    </div>
  )
}

export default Status
