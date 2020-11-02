import React from 'react'
import './OrderPage.css'
import Header from '../common/Header/Header'
import StepsTriangle from '../common/icons/StepsTriangle'
import Location from './Location/Location'
import Model from './Model/Model'
import Addition from './Addition/Addition'
import Total from './Total/Total'
import Status from './Status/Status'

const OrderPage = () => {
  return (
    <div className='order-page'>
      <div className='order-page__header'>
        <Header />
      </div>
      <div className='order-page__steps'>
        <Steps />
      </div>
      <div className='order'>
        <div className='order__content-container'>
          <div className='order__content'>
            <Location />
            <div style={{ display: 'none' }}>
              <Model />
              <Addition />
              <Total />
            </div>
          </div>
        </div>

        <div className='order__status-container'>
          <div className='order__status'>
            <Status />
          </div>
        </div>
      </div>
    </div>
  )
}

const Steps = () => (
  <section className='steps'>
    <div className='steps__items'>
      <div className='steps__item steps__item--active'>
        <span className='steps__item-name'>Местоположение</span>
        <StepsTriangle />
      </div>
      <div className='steps__item'>
        <span className='steps__item-name'>Модель</span>
        <StepsTriangle />
      </div>
      <div className='steps__item'>
        <span className='steps__item-name'>Дополнительно</span>
        <StepsTriangle />
      </div>
      <div className='steps__item'>
        <span className='steps__item-name'>Итого</span>
      </div>
    </div>
  </section>
)

export default OrderPage
