import React, { useEffect } from 'react'
import './Model.css'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { getCars } from '../../../store/order-selectors'
import { requestCars } from '../../../store/order-reducer'
import { InputItem } from '../../common/Forms/Forms'

const Model = ({ formik, listOfCars, requestCars }) => {
  useEffect(() => requestCars(), [requestCars])

  const cardClass = (carName) =>
    classNames('catalog__car', {
      'catalog__car--active': carName === formik.values.model,
    })

  const getCarImg = (car) => {
    return car.thumbnail.path.includes('base64')
      ? car.thumbnail.path
      : `http://api-factory.simbirsoft1.com/${car.thumbnail.path}`
  }

  return (
    <div className='model'>
      <InputItem
        name='modelFilter'
        items={[
          {
            inputItemLabelClass: 'radio-item__label',
            inputItemStyle: 'radio',
            inputStyle: 'radio-item__input',
            inputItemClass: 'input__radio-item',
            label: 'Все модели',
            value: 'all',
            checked: formik.values.modelFilter === 'all',
          },
          {
            inputItemLabelClass: 'radio-item__label',
            inputItemStyle: 'radio',
            inputStyle: 'radio-item__input',
            inputItemClass: 'input__radio-item',
            label: 'Эконом',
            value: 'econom',
            checked: formik.values.modelFilter === 'econom',
          },
          {
            inputItemLabelClass: 'radio-item__label',
            inputItemStyle: 'radio',
            inputStyle: 'radio-item__input',
            inputItemClass: 'input__radio-item',
            label: 'Премиум',
            value: 'premium',
            checked: formik.values.modelFilter === 'premium',
          },
        ]}
        onChange={formik.handleChange}
      />
      <div className='catalog'>
        {listOfCars.map((car) => (
          <div
            className={cardClass(car.name)}
            key={car.id}
            onClick={() =>
              formik.setValues({ ...formik.values, model: car.name })
            }>
            <div className='catalog__car-title'>
              <div className='catalog__car-name'>{car.name}</div>
              <div className='catalog__car-price'>{`${car.priceMin} - ${car.priceMax} ₽`}</div>
            </div>
            <img
              className='catalog__car-img'
              src={getCarImg(car)}
              alt='car-img'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  listOfCars: getCars(state),
})

// export default Model
export default connect(mapStateToProps, { requestCars })(Model)
