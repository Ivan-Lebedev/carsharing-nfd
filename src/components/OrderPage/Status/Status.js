import React, { useState } from 'react'
import './Status.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Status = ({ isFinished }) => {
  const [modal, setModal] = useState(false)
  const statusBtnClasses = classNames('button status__price-btn', {
    'button--cancel': isFinished === true,
  })

  return (
    <div className='status'>
      {modal && (
        <div className='modal'>
          <div className='modal__overlay' />
          <div className='modal__container'>
            <div className='modal__title'>Подтвердить заказ</div>
            <div className='modal__buttons'>
              <Link
                to='/order/finished'
                onClick={() => setModal(false)}
                className='button'>
                Подтвердить
              </Link>
              <button onClick={() => setModal(false)} className='button button--cancel'>
                Вернуться
              </button>
            </div>
          </div>
        </div>
      )}
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
      <button className='button status__price-btn'>Дополнительно</button>
      <button className='button status__price-btn'>Итого</button> */}

      <button
        className={statusBtnClasses}
        onClick={() => (isFinished ? '' : setModal(!modal))}>
        {isFinished ? 'Отменить' : 'Заказать'}
      </button>
    </div>
  )
}

export default Status
