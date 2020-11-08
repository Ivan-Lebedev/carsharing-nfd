import React, { useState } from 'react'
import './OrderPage.css'
import Header from '../common/Header/Header'
import StepsTriangle from '../common/icons/StepsTriangle'
import Location from './Location/Location'
import Model from './Model/Model'
import Addition from './Addition/Addition'
import Total from './Total/Total'
import Status from './Status/Status'
import { Finished } from './Finished/Finished'
import classNames from 'classnames'

const OrderPage = ({ isFinished }) => {
  const [step, setStep] = useState(1)
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location />
      case 2:
        return <Model />
      case 3:
        return <Addition />
      case 4:
        return <Total />
      default:
        return <Location />
    }
  }
  return (
    <div className='order-page'>
      <div className='order-page__header'>
        <Header />
      </div>
      <div className='order-page__steps'>
        <Steps isFinished={isFinished} step={step} setStep={setStep} />
      </div>
      <div className='order'>
        <div className='order__content-container'>
          <div className='order__content'>
            {isFinished ? <Finished /> : renderStep()}
          </div>
        </div>
        <div className='order__status-container'>
          <div className='order__status'>
            <Status isFinished={isFinished} step={step} setStep={setStep} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Steps = ({ isFinished, step, setStep }) => {
  const stepNames = ['Местоположение', 'Модель', 'Дополнительно', 'Итого']
  const stepClass = (index) => {
    return classNames('steps__item-name', {
      'steps__item-name--active': step === index + 1,
    })
  }
  return (
    <div className='steps'>
      <div className='steps__items'>
        {isFinished ? (
          <span className='steps__finished'>Заказ номер RU58491823</span>
        ) : (
          stepNames.map((name, index) => (
            <div className='steps__item' key={name}>
              <span
                className={stepClass(index)}
                onClick={() => setStep(index + 1)}>
                {name}
              </span>
              {index !== stepNames.length - 1 && <StepsTriangle />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderPage
