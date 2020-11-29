import React from 'react'
import './Steps.css'
import StepsTriangle from '../../common/icons/StepsTriangle'
import classNames from 'classnames'

const Steps = ({ isFinished, step, setStep, stepDisabled, orderId }) => {
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
          <span className='steps__finished'>Заказ номер {orderId}</span>
        ) : (
          stepNames.map((name, index) => (
            <div className='steps__item' key={name}>
              <button
                className={stepClass(index)}
                onClick={() => setStep(index + 1)}
                disabled={stepDisabled[index + 1]}>
                {name}
              </button>
              {index !== stepNames.length - 1 && <StepsTriangle />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Steps
