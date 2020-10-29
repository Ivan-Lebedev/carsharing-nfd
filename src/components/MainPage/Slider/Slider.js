import React, { useState } from 'react'
import './Slider.css'
import PrevArrow from '../../../assets/icons/slider-left-arr.svg'
import NextArrow from '../../../assets/icons/slider-right-arr.svg'

const slides = [
    {
        img: 'slider-item slide__1',
        title: 'Бесплатная парковка',
        desc: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах',
        btn: 'slider-item__btn btn1 button'
    },
    {
        img: 'slider-item slide__2',
        title: 'Страховка',
        desc: 'Полная страховка страховка автомобиля',
        btn: 'slider-item__btn btn2 button'
    },
    {
        img: 'slider-item slide__3',
        title: 'Бензин',
        desc: 'Полный бак на любой заправке города за наш счёт',
        btn: 'slider-item__btn btn3 button'
    },
    {
        img: 'slider-item slide__4',
        title: 'Обслуживание',
        desc: 'Автомобиль проходит еженедельное ТО',
        btn: 'slider-item__btn btn4 button'
    }
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
        <div className="slider">
            <button
                onClick={() => onPrevArrowClick()}
                className="control-button btn-left">
                <img src={PrevArrow} alt="PrevArrow" />
            </button>
            <div className="slider-wrapper">
                <div className={slide.img}>
                    <h3 className="slider-item__header">{slide.title}</h3>
                    <p className="slider-item__desc">{slide.desc}</p>
                    <button className={slide.btn}>Подробнее</button>
                </div>

                <div className="radio">
                    {slides.map((item, index) => {
                        return index === slideIndex
                            ? <button
                                className="radio__btn radio__btn--active"
                                key={index}></button>

                            : <button
                                onClick={(e) => onDotClick(e, index)}
                                className="radio__btn"
                                key={index}></button>
                    })}
                </div>
            </div>
            <button
                onClick={() => onNextArrowClick()}
                className="control-button btn-right">
                <img src={NextArrow} alt="NextArrow" />
            </button>
        </div>
    )
}

export default Slider