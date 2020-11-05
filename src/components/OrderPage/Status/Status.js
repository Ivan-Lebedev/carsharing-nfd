import React from 'react'
import './Status.css'

const Status = () => {
  return (
    <div className='status'>
      <div className='status__header'>Ваш заказ:</div>
      <div className='status__item'>
        <div className='status__item-title'>Пункт выдачи</div>
        <div className='status__item-dash'></div>
        <div className='status__item-place'>Ульяновск, Нариманова 42</div>
      </div>

      <div className='status__item'>
        <div className='status__item-title'>Модель</div>
        <div className='status__item-dash'></div>
        <div className='status__item-place'>Hyndai, i30 N</div>
      </div>

      <div className='status__item'>
        <div className='status__item-title'>Цвет</div>
        <div className='status__item-dash'></div>
        <div className='status__item-place'>Голубой</div>
      </div>

      <div className='status__item'>
        <div className='status__item-title'>Длительность аренды</div>
        <div className='status__item-dash'></div>
        <div className='status__item-place'>1д 2ч</div>
      </div>

      <div className='status__item'>
        <div className='status__item-title'>Тариф</div>
        <div className='status__item-dash'></div>
        <div className='status__item-place'>На сутки</div>
      </div>

      <div className='status__item'>
        <div className='status__item-title'>Полный бак</div>
        <div className='status__item-dash'></div>
        <div className='status__item-place'>Да</div>
      </div>

      <div className='status__price'>
        <span className='status__price-header'>Цена: </span>
        <span className='status__price-digits'> 16 000 </span>₽
      </div>

      {/* <button className='button status__price-btn'>Выбрать модель</button>
      <button className='button status__price-btn'>Дополнительно</button> */}

      <button className='button status__price-btn'>Итого</button>
    </div>
  )
}

export default Status
