import React, { useState } from 'react'
import './OrderPage.css'
import Header from '../common/Header/Header'
import StepsTriangle from '../common/icons/StepsTriangle'
import Location from './Location/Location'
import Model from './Model/Model'
import Addition from './Addition/Addition'
import TotalContainer from './Total/Total'
import Status from './Status/Status'
import Finished from './Finished/Finished'
import classNames from 'classnames'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { getOrderId } from '../../store/order-selectors'

const OrderPage = ({ isFinished, orderId }) => {
  const [stepDisabled, setStepDisabled] = useState({
    1: false,
    2: true,
    3: true,
    4: true,
  })

  const [step, setStep] = useState(1)

  const formik = useFormik({
    initialValues: {
      locationCity: '',
      locationPoint: '',
      modelFilter: 'Все модели',
      model: '',
      color: 'любой',
      dateFrom: '',
      dateTo: '',
      rate: 'day',
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
    },
  })
  console.log(formik.values)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location formik={formik} />
      case 2:
        return <Model formik={formik} />
      case 3:
        return <Addition formik={formik} />
      case 4:
        return <TotalContainer formData={formik.values} />
      default:
        return <Location formik={formik} />
    }
  }

  return (
    <div className='order-page'>
      <div className='order-page__header'>
        <Header />
      </div>
      <div className='order-page__steps'>
        <Steps
          isFinished={isFinished}
          step={step}
          setStep={setStep}
          stepDisabled={stepDisabled}
          orderId={orderId}
        />
      </div>
      <div className='order'>
        <div className='order__content-container'>
          <div className='order__content'>
            {isFinished ? <Finished /> : renderStep()}
          </div>
        </div>
        <div className='order__status-container'>
          <div className='order__status'>
            <Status
              isFinished={isFinished}
              step={step}
              setStep={setStep}
              stepDisabled={stepDisabled}
              setStepDisabled={setStepDisabled}
              formData={formik.values}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

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

const mapStateToProps = (state) => ({
  orderId: getOrderId(state),
})

export default connect(mapStateToProps, {})(OrderPage)
