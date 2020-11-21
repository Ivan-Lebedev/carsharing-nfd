import React, { useEffect } from 'react'
import './Location.css'
import Map from '../../../assets/images/Map.png'
import { InputText } from '../../common/Forms/Forms'
import { connect } from 'react-redux'
import { requestCities, requestPoints } from '../../../store/order-reducer'
import { getListOfCities, getPoints } from '../../../store/order-selectors'

const Location = ({
  formik,
  listOfCities,
  points,
  requestCities,
  requestPoints,
}) => {
  useEffect(() => {
    requestCities()
    requestPoints()
  }, [requestCities, requestPoints])

  const listOfPoints = []
  points.map(
    (point) =>
      formik.values.locationCity === point.cityId.name &&
      listOfPoints.push(point.address)
  )

  return (
    <div className='location'>
      <InputText
        items={[
          {
            name: 'locationCity',
            label: 'Город',
            placeholder: 'Начните вводить город...',
            value: formik.values.locationCity,
            options: listOfCities,
          },
          {
            name: 'locationPoint',
            label: 'Пункт выдачи',
            placeholder: 'Начните вводить пункт...',
            value: formik.values.locationPoint,
            options: listOfPoints,
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
  listOfCities: getListOfCities(state),
  points: getPoints(state),
})

export default connect(mapStateToProps, { requestCities, requestPoints })(
  Location
)
