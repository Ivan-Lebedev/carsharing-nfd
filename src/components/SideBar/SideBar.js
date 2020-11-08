import React, { useState } from 'react'
import './SideBar.css'
import Telegramm from '../common/icons/Telegram'
import Facebook from '../common/icons/Facebook'
import Instagram from '../common/icons/Instagram'
import classNames from 'classnames'

const SideBar = () => {
  const [burgerState, setBurgerState] = useState(false)

  const burgerClasses = classNames('burger-menu', {
    'burger-menu burger-menu--active': burgerState,
  })
  const menuClasses = classNames('opened-menu', {
    'opened-menu opened-menu--active': burgerState,
  })

  if (burgerState) {
    return (
      <div className='side-bar'>
        <button className={burgerClasses} onClick={() => setBurgerState(false)}>
          <span className='burger-menu__line' />
        </button>
        <button className='lang'>Eng</button>

        <div className={menuClasses}>
          <div className='opened-menu__items'>
            <ul className='items-list'>
              <li className='items-list__item'>ПАРКОВКА</li>
              <li className='items-list__item'>СТРАХОВКА</li>
              <li className='items-list__item'>БЕНЗИН</li>
              <li className='items-list__item'>ОБСЛУЖИВАНИЕ</li>
            </ul>

            <div className='social-items'>
              <a href='https://telegram.org/' className='social-items__link'>
                <Telegramm />
              </a>
              <a href='https://ru-ru.facebook.com/' className='social-items__link'>
                <Facebook />
              </a>
              <a href='https://www.instagram.com/' className='social-items__link'>
                <Instagram />
              </a>
            </div>
          </div>
          <div className='opened-menu__substrate'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='side-bar'>
      <button className={burgerClasses} onClick={() => setBurgerState(true)}>
        <span className='burger-menu__line' />
      </button>
      <button className='lang lang--hidden'>Eng</button>
    </div>
  )
}

export default SideBar
