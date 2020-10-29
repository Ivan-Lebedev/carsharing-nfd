import React from 'react'
import './Header.css'
import LocationIcon from '../../../assets/icons/Group.svg'

const Header = () => {
    return (
        <div className="main-header">
            <div className="main-header__logo">Need for drive</div>
            <div className="main-header__location">
                <img src={LocationIcon} alt="LocationIcon" />
                <div className="location-city">Ульяновск</div> </div>
        </div>
    )
}

export default Header