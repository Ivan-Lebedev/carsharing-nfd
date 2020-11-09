import React from 'react'
import './Location.css'
import Map from '../../../assets/images/Map.png'
import { InputText } from '../../common/Forms/Forms'

const Location = ({ formik }) => {
  return (
    <div className='location'>
      <InputText
        items={[
          {
            name: 'locationCity',
            label: 'Город',
            placeholder: 'Начните вводить город...',
            value: formik.values.locationCity,
          },
          {
            name: 'locationPlace',
            label: 'Пункт выдачи',
            placeholder: 'Начните вводить пункт...',
            value: formik.values.locationPlace,
          },
        ]}
        onChange={formik.handleChange}
      />
      <div className='location__map'>
        <div className='location__map-header'>Выбрать на карте:</div>
        <img src={Map} alt='map' className='location__map-img' />
      </div>
    </div>
  )
}

export default Location
