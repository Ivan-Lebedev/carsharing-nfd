import React, { useEffect } from 'react'
import './Model.css'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { getCars, isCarsFetching } from '../../../store/order-selectors'
import { requestCars } from '../../../store/order-reducer'
import { InputItem } from '../../common/Forms/Forms'
import Loader from '../../common/Loader/Loader'

const Model = ({ formik, listOfCars, requestCars, isCarsFetching }) => {
  useEffect(() => requestCars(), [requestCars])

  let listOfFilteredCars = []

  const filterCars = () => {
    if (formik.values.modelFilter === 'Все модели') {
      listOfFilteredCars = listOfCars
    } else {
      listOfFilteredCars = listOfCars.filter(
        (car) => car.categoryId.name === formik.values.modelFilter
      )
    }
  }

  filterCars()

  const cardClass = (carName) =>
    classNames('catalog__car', {
      'catalog__car--active': carName === formik.values.model,
    })

  const getCarImg = (car) => {
    return car.thumbnail.path.includes('base64')
      ? car.thumbnail.path
      : `http://api-factory.simbirsoft1.com/${car.thumbnail.path}`
    // prod
    // `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${car.thumbnail.path}`
  }

  return (
    <div className='model'>
      {isCarsFetching ? (
        <Loader />
      ) : (
        <>
          <InputItem
            name='modelFilter'
            items={[
              {
                inputItemLabelClass: 'radio-item__label',
                inputItemStyle: 'radio',
                inputStyle: 'radio-item__input',
                inputItemClass: 'input__radio-item',
                label: 'Все модели',
                value: 'Все модели',
                checked: formik.values.modelFilter === 'Все модели',
              },
              {
                inputItemLabelClass: 'radio-item__label',
                inputItemStyle: 'radio',
                inputStyle: 'radio-item__input',
                inputItemClass: 'input__radio-item',
                label: 'Эконом',
                value: 'Эконом',
                checked: formik.values.modelFilter === 'Эконом',
              },
              {
                inputItemLabelClass: 'radio-item__label',
                inputItemStyle: 'radio',
                inputStyle: 'radio-item__input',
                inputItemClass: 'input__radio-item',
                label: 'Премиум',
                value: 'Премиум',
                checked: formik.values.modelFilter === 'Премиум',
              },
            ]}
            onChange={formik.handleChange}
          />
          <div className='catalog'>
            {listOfFilteredCars.map((car) => (
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
                  crossOrigin='anonymous'
                  referrerPolicy='origin'
                  alt='car-img'
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  listOfCars: getCars(state),
  isCarsFetching: isCarsFetching(state),
})

export default connect(mapStateToProps, { requestCars })(Model)
