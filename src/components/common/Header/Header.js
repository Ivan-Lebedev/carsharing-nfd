import React from 'react'
import './Header.css'
import CityPin from '../icons/CityPin'

const Header = () => {
  return (
    <div className='main-header'>
      <div className='main-header__logo'>Need for drive</div>
      <div className='main-header__location'>
        <CityPin />
        <div className='location-city'>Ульяновск</div>
      </div>
    </div>
  )
}

export default Header
