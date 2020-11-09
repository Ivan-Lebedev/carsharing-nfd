import React from 'react'
import './Model.css'
import car_1 from '../../../assets/images/car_1.png'
import car_2 from '../../../assets/images/car_2.png'
import car_3 from '../../../assets/images/car_3.png'
import car_4 from '../../../assets/images/car_4.png'
import { InputItem } from '../../common/Forms/Forms'

const carList = [
  {
    name: 'ELANTRA',
    price: '12 000 - 25 000 ₽',
    img: car_1,
  },
  {
    name: 'i30 N',
    price: '10 000 - 32 000 ₽',
    img: car_2,
  },
  {
    name: 'CRETA',
    price: '12 000 - 25 000 ₽',
    img: car_3,
  },
  {
    name: 'SONATA',
    price: '10 000 - 32 000 ₽',
    img: car_4,
  },
  {
    name: 'ELANTRA',
    price: '12 000 - 25 000 ₽',
    img: car_1,
  },
  {
    name: 'i30 N',
    price: '10 000 - 32 000 ₽',
    img: car_2,
  },
]

const Model = ({ formik }) => {
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
        {carList.map((car, i) => (
          <div className='catalog__car' key={i}>
            <div className='catalog__car-title'>
              <div className='catalog__car-name'>{car.name}</div>
              <div className='catalog__car-price'>{car.price}</div>
            </div>
            <img className='catalog__car-img' src={car.img} alt='car-img' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Model
