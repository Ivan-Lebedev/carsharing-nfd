import React from 'react'
import Header from '../../common/Header/Header'
import './StartScreen.css'
import { LinkButton } from '../../common/Button/Button'

const StartScreen = () => {
  return (
    <div className='start-screen'>
      <Header />

      <div className='hero-block'>
        <h1 className='hero-block__title'>
          Каршеринг <br />
          <span className='title__app-name'>Need for drive</span>
        </h1>
        <div className='hero-block__subtitle'>
          Поминутная аренда авто твоего города
        </div>
        <LinkButton to='/order' additionalStyles='hero-block__btn'>
          Забронировать
        </LinkButton>
      </div>

      <footer className='start-screen__footer'>
        <div className='footer__copyright'>© 2016-2019 «Need for drive»</div>
        <a href='tel:84952342244' className='footer__tel'>
          8 (495) 234-22-44
        </a>
      </footer>
    </div>
  )
}

export default StartScreen
