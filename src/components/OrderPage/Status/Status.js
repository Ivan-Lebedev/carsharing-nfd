import React, { useState } from 'react'
import './Status.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Status = ({
  isFinished,
  step,
  setStep,
  stepDisabled,
  setStepDisabled,
  formData,
}) => {
  const [modal, setModal] = useState(false)
  const statusBtnClasses = classNames('button status__price-btn', {
    'button--cancel': isFinished === true,
  })

  const onModalConfirm = () => {
    if (isFinished) setStep(1)
    setModal(false)
  }

  const onButtonClick = () => {
    if (step === 4 || isFinished) {
      setModal(!modal)
    } else {
      const nextStep = step + 1
      setStepDisabled({
        ...stepDisabled,
        [nextStep]: false,
      })
      setStep(nextStep)
    }
  }

  return (
    <div className='status'>
      {modal && (
        <div className='modal'>
          <div className='modal__overlay' />
          <div className='modal__container'>
            <div className='modal__title'>
              {isFinished ? 'Отменить заказ' : 'Подтвердить заказ'}
            </div>
            <div className='modal__buttons'>
              <Link
                to={isFinished ? '/order' : '/order/finished'}
                onClick={() => onModalConfirm()}
                className='button'>
                Подтвердить
              </Link>
              <button
                onClick={() => setModal(false)}
                className='button button--cancel'>
                Вернуться
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='status__header'>Ваш заказ:</div>
      {formData.locationPlace !== '' && formData.locationCity !== '' && (
        <div className='status__item'>
          <div className='status__item-title'>Пункт выдачи</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>
            {formData.locationCity}, {formData.locationPlace}
          </div>
        </div>
      )}
      {!stepDisabled[2] && (
        <div className='status__item'>
          <div className='status__item-title'>Модель</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>{formData.model}</div>
        </div>
      )}
      {!stepDisabled[3] && (
        <div className='status__item'>
          <div className='status__item-title'>Цвет</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>{formData.color}</div>
        </div>
      )}
      {!stepDisabled[3] && formData.dateFrom && formData.dateTo && (
        <div className='status__item'>
          <div className='status__item-title'>Длительность аренды</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>
            {formData.dateFrom} {formData.dateTo}
          </div>
        </div>
      )}
      {!stepDisabled[3] && (
        <div className='status__item'>
          <div className='status__item-title'>Тариф</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>
            {formData.plan === 'day' ? 'На сутки' : 'Поминутно'}
          </div>
        </div>
      )}
      {!stepDisabled[3] && formData.fullFuel && (
        <div className='status__item'>
          <div className='status__item-title'>Полный бак</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>Да</div>
        </div>
      )}
      {!stepDisabled[3] && formData.childSeat && (
        <div className='status__item'>
          <div className='status__item-title'>Детское кресло</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>Да</div>
        </div>
      )}
      {!stepDisabled[3] && formData.rightHand && (
        <div className='status__item'>
          <div className='status__item-title'>Правый руль</div>
          <div className='status__item-dash'></div>
          <div className='status__item-value'>Да</div>
        </div>
      )}

      <div className='status__price'>
        <span className='status__price-header'>Цена: </span>
        <span className='status__price-digits'>от 8 000 до 12 000 ₽</span>
      </div>

      <button className={statusBtnClasses} onClick={() => onButtonClick()}>
        {step === 1 && 'Выбрать модель'}
        {step === 2 && 'Дополнительно'}
        {step === 3 && 'Итого'}
        {step === 4 && !isFinished && 'Заказать'}
        {step === 4 && isFinished && 'Отменить'}
      </button>
    </div>
  )
}

export default Status
