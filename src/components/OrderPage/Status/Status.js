import React, { useState } from 'react'
import './Status.css'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getPoints } from '../../../store/order-selectors'
import { connect } from 'react-redux'

const Status = ({
  isFinished,
  step,
  setStep,
  stepDisabled,
  setStepDisabled,
  formData,
  points,
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

  const isPlaceValid = () =>
    points.find((point) => point.address === formData.locationPlace)

  const deltaTime = Math.abs(formData.dateTo - formData.dateFrom)
  const deltaDays =
    formData.dateTo !== '' && formData.dateFrom !== ''
      ? Math.ceil(deltaTime / (1000 * 60 * 60 * 24))
      : 0

  const isButtonDisabled = () => {
    if (step === 1 && !isPlaceValid()) {
      return true
    }
    if (step === 2 && formData.model === '') {
      return true
    }
    if (step === 3 && deltaDays === 0) {
      return true
    }
    return false
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
      {formData.model !== '' && (
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
          <div className='status__item-value'>{deltaDays} д</div>
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

      <button
        className={statusBtnClasses}
        onClick={() => onButtonClick()}
        disabled={isButtonDisabled()}>
        {step === 1 && 'Выбрать модель'}
        {step === 2 && 'Дополнительно'}
        {step === 3 && 'Итого'}
        {step === 4 && !isFinished && 'Заказать'}
        {step === 4 && isFinished && 'Отменить'}
      </button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  points: getPoints(state),
})

export default connect(mapStateToProps)(Status)
