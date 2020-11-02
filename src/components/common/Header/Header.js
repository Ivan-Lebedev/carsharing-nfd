import React from 'react'
import './Header.css'
import CityPin from '../icons/CityPin'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='main-header'>
      <Link to='/carsharing-nfd' className='main-header__logo'>
        Need for drive
      </Link>
      <div className='main-header__location'>
        <CityPin />
        <div className='location-city'>Ульяновск</div>
      </div>
    </div>
  )
}

export default Header
