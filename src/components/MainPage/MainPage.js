import React from 'react'
import './MainPage.css'
import StartScreen from './StartScreen/StartScreen'
import Slider from './Slider/Slider'
import SideBar from './BurgerMenu/SideBar'

const MainPage = () => {
  return (
    <div className='main-page'>
      <SideBar />
      <StartScreen />
      <Slider />
    </div>
  )
}

export default MainPage
