import React, { useEffect, useState } from 'react'
import './Status.css'
import classNames from 'classnames'
import {
  getPoints,
  getCars,
  getCities,
  getOrderId,
} from '../../../store/order-selectors'
import { connect } from 'react-redux'
import { submitOrder } from '../../../store/order-reducer'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Button, LinkButton } from '../../common/Button/Button'

const Status = ({
  isFinished,
  step,
  setStep,
  stepDisabled,
  setStepDisabled,
  formData,
  cities,
  points,
  cars,
  submitOrder,
  orderId,
  history,
}) => {
  const [isModal, setIsModal] = useState(false)
  const statusBtnClasses = classNames('button status__price-btn', {
    'button--cancel': isFinished === true,
  })

  useEffect(() => {
    if (orderId) {
      history.push(`/order/finished/${orderId}`)
    }
  }, [history, orderId])

  const onModalConfirm = () => {
    if (isFinished) {
      setStep(1)
      setIsModal(false)
    } else {
      submitForm()
    }
  }

  const onButtonClick = () => {
    if (step === 4 || isFinished) {
      setIsModal(!isModal)
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
    points.find((point) => point.address === formData.locationPoint)

  const isButtonDisabled = () => {
    if (isFinished) {
      return false
    }
    if (!isPlaceValid()) {
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

  const deltaTime = Math.abs(formData.dateTo - formData.dateFrom)
  const deltaMinutes =
    formData.dateTo && formData.dateFrom !== ''
      ? Math.ceil(deltaTime / (1000 * 60))
      : 0
  const deltaHours =
    formData.dateTo && formData.dateFrom !== ''
      ? Math.ceil(deltaTime / (1000 * 60 * 60))
      : 0
  const deltaDays =
    formData.dateTo !== '' && formData.dateFrom !== ''
      ? Math.ceil(deltaTime / (1000 * 60 * 60 * 24))
      : 0

  const modelData = cars.find((car) => car.name === formData.model)

  const getPrice = () => {
    let price = 0
    if (formData.model !== '') {
      if (deltaMinutes === 0) {
        let priceMin =
          formData.rate === 'minute'
            ? modelData.priceMin * 2
            : modelData.priceMin
        const priceMax = modelData.priceMax
        if (formData.isFullTank) {
          priceMin += 500
        }
        if (formData.isNeedChildChair) {
          priceMin += 200
        }
        if (formData.isRightWheel) {
          priceMin += 1600
        }
        price = `${priceMin} - ${priceMax}`
      } else {
        price = Math.round(
          formData.rate === 'minute'
            ? (modelData.priceMin / (60 * 24)) * deltaMinutes * 1.5
            : modelData.priceMin * deltaDays
        )
        if (formData.isFullTank) {
          price += 500
        }
        if (formData.isNeedChildChair) {
          price += 200
        }
        if (formData.isRightWheel) {
          price += 1600
        }
      }
    }
    return `${price} ₽`
  }

  const submitForm = () => {
    const { color, isFullTank, isNeedChildChair, isRightWheel } = formData
    const cityId = cities.find((city) => city.name === formData.locationCity).id
    const pointId = points.find(
      (point) => point.address === formData.locationPoint
    ).id
    const carId = modelData.id
    const dateFrom = formData.dateFrom.getTime()
    const dateTo = formData.dateTo.getTime()
    const rateId =
      formData.rate === 'day'
        ? '5e26a0e2099b810b946c5d86'
        : '5e26a0d2099b810b946c5d85'
    const price = getPrice()

    submitOrder(
      cityId,
      pointId,
      carId,
      color,
      dateFrom,
      dateTo,
      rateId,
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
      setIsModal
    )
  }

  return (
    <div className='status'>
      {isModal && (
        <div className='modal'>
          <div className='modal__overlay' />
          <div className='modal__container'>
            <div className='modal__title'>
              {isFinished ? 'Отменить заказ' : 'Подтвердить заказ'}
            </div>
            <div className='modal__buttons'>
              <LinkButton
                to={isFinished ? '/order' : false}
                onClick={() => onModalConfirm()}>
                Подтвердить
              </LinkButton>
              <Button
                onClick={() => setIsModal(false)}
                additionalStyles='button--cancel'>
                Вернуться
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className='status__header'>Ваш заказ:</div>
      {formData.locationPoint !== '' && formData.locationCity !== '' && (
        <div className='status__item'>
          <div className='status__item-title'>Пункт выдачи</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>
            {formData.locationCity}, {formData.locationPoint}
          </div>
        </div>
      )}
      {formData.model !== '' && (
        <div className='status__item'>
          <div className='status__item-title'>Модель</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>{formData.model}</div>
        </div>
      )}
      {!stepDisabled[3] && (
        <div className='status__item'>
          <div className='status__item-title'>Цвет</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>{formData.color}</div>
        </div>
      )}
      {!stepDisabled[3] && formData.dateFrom && formData.dateTo && (
        <div className='status__item'>
          <div className='status__item-title'>Длительность аренды</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>{`${Math.floor(
            deltaHours / 24
          )}д ${deltaHours % 24}ч`}</div>
        </div>
      )}
      {!stepDisabled[3] && (
        <div className='status__item'>
          <div className='status__item-title'>Тариф</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>
            {formData.rate === 'day' ? 'На сутки' : 'Поминутно'}
          </div>
        </div>
      )}
      {!stepDisabled[3] && formData.isFullTank && (
        <div className='status__item'>
          <div className='status__item-title'>Полный бак</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>Да</div>
        </div>
      )}
      {!stepDisabled[3] && formData.isNeedChildChair && (
        <div className='status__item'>
          <div className='status__item-title'>Детское кресло</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>Да</div>
        </div>
      )}
      {!stepDisabled[3] && formData.isRightWheel && (
        <div className='status__item'>
          <div className='status__item-title'>Правый руль</div>
          <div className='status__item-dash' />
          <div className='status__item-value'>Да</div>
        </div>
      )}
      <div className='status__price'>
        <span className='status__price-header'>Цена: </span>
        <span className='status__price-digits'>{getPrice()}</span>
      </div>

      <Button
        additionalStyles={statusBtnClasses}
        onClick={() => onButtonClick()}
        disabled={isButtonDisabled()}>
        {step === 1 && 'Выбрать модель'}
        {step === 2 && 'Дополнительно'}
        {step === 3 && 'Итого'}
        {step === 4 && !isFinished && 'Заказать'}
        {step === 4 && isFinished && 'Отменить'}
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  points: getPoints(state),
  cars: getCars(state),
  cities: getCities(state),
  orderId: getOrderId(state),
})

export default compose(
  connect(mapStateToProps, { submitOrder }),
  withRouter
)(Status)
