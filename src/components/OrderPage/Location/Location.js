import React from 'react'
import './Location.css'
import Map from '../../../assets/images/Map.png'
import { InputText } from '../../common/Forms/Forms'

const Location = () => {
  return (
    <div className='location'>
      <InputText
        name='date'
        item={{
          label1: 'Город',
          placeholder1: 'Начните вводить город...',
          label2: 'Пункт выдачи',
          placeholder2: 'Начните вводить пункт...',
        }}
      />
      <div className='location__map'>
        <div className='location__map-header'>Выбрать на карте:</div>
        <img src={Map} alt='map' className='location__map-img' />
      </div>
    </div>
  )
}

export default Location
