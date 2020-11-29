import React, { useState } from 'react'
import './Slider.css'
import SliderLeftArr from '../../common/icons/SliderLeftArr'
import SliderRightArr from '../../common/icons/SliderRightArr'
import Image1 from '../../../assets/images/Slider_1.jpg'
import Image2 from '../../../assets/images/Slider_2.jpg'
import Image3 from '../../../assets/images/Slider_3.jpg'
import Image4 from '../../../assets/images/Slider_4.jpg'
import classNames from 'classnames'
import { Button } from '../../common/Button/Button'

const slides = [
  {
    img: Image1,
    title: 'Бесплатная парковка',
    desc:
      'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах',
    btn: 'slider-item__btn btn1',
  },
  {
    img: Image2,
    title: 'Страховка',
    desc: 'Полная страховка страховка автомобиля',
    btn: 'slider-item__btn btn2',
  },
  {
    img: Image3,
    title: 'Бензин',
    desc: 'Полный бак на любой заправке города за наш счёт',
    btn: 'slider-item__btn btn3',
  },
  {
    img: Image4,
    title: 'Обслуживание',
    desc: 'Автомобиль проходит еженедельное ТО',
    btn: 'slider-item__btn btn4',
  },
]

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [slide, setSlide] = useState(slides[slideIndex])

  const onNextArrowClick = () => {
    const index = slideIndex + 1 > slides.length - 1 ? 0 : slideIndex + 1
    setSlideIndex(index)
    setSlide(slides[index])
  }

  const onPrevArrowClick = () => {
    const index = slideIndex - 1 >= 0 ? slideIndex - 1 : slides.length - 1
    setSlideIndex(index)
    setSlide(slides[index])
  }

  const onDotClick = (e, index) => {
    setSlideIndex(index)
    setSlide(slides[index])
  }

  return (
    <div className='slider'>
      <div className='img-preload'>
        {slides.forEach((slide) => {
          const img = new Image()
          img.src = slide.img
        })}
      </div>
      <button
        onClick={() => onPrevArrowClick()}
        className='control-button btn-left'>
        <SliderLeftArr />
      </button>
      <div className='slider-wrapper'>
        <div
          className='slider-item'
          style={{
            background: `linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 0.01%,
            #000000 100%
          ), url(${slide.img}) center/cover`,
          }}>
          <h3 className='slider-item__header'>{slide.title}</h3>
          <p className='slider-item__desc'>{slide.desc}</p>
          <Button additionalStyles={slide.btn}>Подробнее</Button>
        </div>
        <div className='radio'>
          {slides.map((item, index) => (
            <button
              onClick={(e) => onDotClick(e, index)}
              className={classNames('radio__btn', {
                'radio__btn--active': index === slideIndex,
              })}
              key={index}></button>
          ))}
        </div>
      </div>
      <button
        onClick={() => onNextArrowClick()}
        className='control-button btn-right'>
        <SliderRightArr />
      </button>
    </div>
  )
}

export default Slider
