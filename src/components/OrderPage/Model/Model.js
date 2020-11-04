import React from 'react'
import './Model.css'
import car_1 from '../../../assets/images/car_1.png'
import car_2 from '../../../assets/images/car_2.png'
import car_3 from '../../../assets/images/car_3.png'
import car_4 from '../../../assets/images/car_4.png'

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

const Model = () => {
  return (
    <div className='model'>
      <div className='model__filter'>
        <div className='model__filter-item'>
          <input
            className='filter-item__input'
            type='radio'
            name='model'
            id='all'
            defaultChecked={true}
            value='all'
          />
          <label className='filter-item__label' htmlFor='all'>
            Все модели
          </label>
        </div>
        <div className='model__filter-item'>
          <input
            className='filter-item__input'
            type='radio'
            name='model'
            id='econom'
            value='econom'
          />
          <label className='filter-item__label' htmlFor='econom'>
            Эконом
          </label>
        </div>
        <div className='model__filter-item'>
          <input
            className='filter-item__input'
            type='radio'
            name='model'
            id='premium'
            value='premium'
          />
          <label className='filter-item__label' htmlFor='premium'>
            Премиум
          </label>
        </div>
      </div>
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
