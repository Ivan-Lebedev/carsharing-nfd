import React from 'react'
import Header from '../../common/Header/Header'
import './StartScreen.css'

const StartScreen = () => {
  return (
    <div className='start-screen'>
      <Header />

      <div className='hero-block'>
        <h1 className='hero-block__title'>
          Каршеринг <br />
          <span>Need for drive</span>
        </h1>
        <div className='hero-block__subtitle'>
          Поминутная аренда авто твоего города
        </div>
        <button className='button hero-block__btn'>Забронировать</button>
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
