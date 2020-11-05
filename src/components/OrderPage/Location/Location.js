import React, { useState } from 'react'
import CrossIcon from '../../common/icons/CrossIcon'
import './Location.css'
import Map from '../../../assets/images/Map.png'
import classNames from "classnames"

const Location = () => {
  const [city, setCity] = useState('')
  const [location, setLocation] = useState('')
  const clearCity =
    city.length > 0
      ? 'location__input-cancel'
      : 'location__input-cancel--hidden'
  const clearLocation =
    location.length > 0
      ? 'location__input-cancel'
      : 'location__input-cancel--hidden'

  return (
    <div className='location'>
      <label className='location__input'>
        <div className='location__input-type'>Город</div>
        <input
          type='text'
          className='location__input-value'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Начните вводить город...'
        />
        <button className={clearCity} onClick={() => setCity('')}>
          <CrossIcon />
        </button>
      </label>
      <label className='location__input'>
        <div className='location__input-type'>Пункт выдачи</div>
        <input
          type='text'
          className='location__input-value'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Начните вводить пункт...'
        />
        <button className={clearLocation} onClick={() => setLocation('')}>
          <CrossIcon />
        </button>
      </label>
      <div className='location__map'>
        <div className='location__map-header'>Выбрать на карте:</div>
        <img src={Map} alt='map' className='location__map-img' />
      </div>
    </div>
  )
}

export default Location
