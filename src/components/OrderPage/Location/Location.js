import React, { useEffect } from 'react'
import './Location.css'
import Map from '../../../assets/images/Map.png'
import { InputText } from '../../common/Forms/Forms'
import { connect } from 'react-redux'
import { requestCities } from '../../../store/order-reducer'

const Location = ({ formik, cities, requestCities }) => {
  const adresses = {
    ulyanovsk: ['Нариманова 1, корп.2', 'Московское шоссе 34', 'Гончарова 27'],
    saransk: ['Гагарина 99А', 'Ленина 24', 'Рабочая 183'],
    kazan: ['Петербургская 1'],
    samara: ['улица Дыбенко, 30', 'проспект Карла Маркса 201'],
  }

  const getCityAdresses = () => {
    switch (formik.values.locationCity) {
      case 'Ульяновск':
        return adresses.ulyanovsk
      case 'Саранск':
        return adresses.saransk
      case 'Казань':
        return adresses.kazan
      case 'Самара':
        return adresses.samara
      default:
        return false
    }
  }
  useEffect(() => {
    requestCities()
  }, [requestCities])

  return (
    <div className='location'>
      <InputText
        items={[
          {
            name: 'locationCity',
            label: 'Город',
            placeholder: 'Начните вводить город...',
            value: formik.values.locationCity,
            options: ['Ульяновск', 'Саранск', 'Казань', 'Самара'],
          },
          {
            name: 'locationPlace',
            label: 'Пункт выдачи',
            placeholder: 'Начните вводить пункт...',
            value: formik.values.locationPlace,
            options: getCityAdresses(),
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

const mapStateToProps = (state) => ({
  cities: state.orderPage.cities,
})
// export default Location
export default connect(mapStateToProps, { requestCities })(Location)
