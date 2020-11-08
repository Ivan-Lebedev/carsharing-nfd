import React from 'react'
import './OrderPage.css'
import Header from '../common/Header/Header'
import StepsTriangle from '../common/icons/StepsTriangle'
import Location from './Location/Location'
import Model from './Model/Model'
import Addition from './Addition/Addition'
import Total from './Total/Total'
import Status from './Status/Status'
import { Finished } from './Finished/Finished'

const OrderPage = ({ isFinished }) => {
  return (
    <div className='order-page'>
      <div className='order-page__header'>
        <Header />
      </div>
      <div className='order-page__steps'>
        <Steps isFinished={isFinished} />
      </div>
      <div className='order'>
        <div className='order__content-container'>
          <div className='order__content'>
            {isFinished ? (
              <Finished />
            ) : (
              <>
                <Total />
                <div style={{ display: 'none' }}>
                  <Addition />
                  <Location />
                  <Model />
                </div>
              </>
            )}
          </div>
        </div>

        <div className='order__status-container'>
          <div className='order__status'>
            <Status isFinished={isFinished} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Steps = ({ isFinished }) => (
  <div className='steps'>
    <div className='steps__items'>
      {isFinished ? (
        <span className='steps__finished'>Заказ номер RU58491823</span>
      ) : (
        <>
          <div className='steps__item'>
            <span className='steps__item-name'>Местоположение</span>
            <StepsTriangle />
          </div>
          <div className='steps__item steps__item--active'>
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
        </>
      )}
    </div>
  </div>
)

export default OrderPage
