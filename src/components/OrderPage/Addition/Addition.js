import React from 'react'
import './Addition.css'
import { InputItem, InputText } from '../../common/Forms/Forms'

const Addition = ({ formik }) => {
  return (
    <div className='addition'>
      <div className='addition__option'>
        <div className='addition__title'>Цвет</div>
        <InputItem
          name='color'
          items={[
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'Любой',
              value: 'Любой',
              checked: formik.values.color === 'Любой',
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'Красный',
              value: 'Красный',
              checked: formik.values.color === 'Красный',
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'Голубой',
              value: 'Голубой',
              checked: formik.values.color === 'Голубой',
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className='addition__option'>
        <div className='addition__title'>Дата аренды</div>
        <InputText
          items={[
            {
              name: 'dateFrom',
              label: 'C',
              placeholder: 'Введите дату и время',
              value: formik.values.dateFrom,
            },
            {
              name: 'dateTo',
              label: 'По',
              placeholder: 'Введите дату и время',
              value: formik.values.dateTo,
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className='addition__option'>
        <div className='addition__title'>Тариф</div>
        <InputItem
          name='plan'
          direction='column'
          items={[
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'Поминутно, 7₽/мин',
              value: 'minute',
              checked: formik.values.plan === 'minute',
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'На сутки, 1999 ₽/сутки',
              value: 'day',
              checked: formik.values.plan === 'day',
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className='addition__option'>
        <div className='addition__title'>Доп услуги</div>
        <InputItem
          direction='column'
          items={[
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Полный бак, 500р',
              value: 'fullFuel',
              checked: formik.values.fullFuel === true,
            },
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Детское кресло, 200р',
              value: 'childSeat',
              checked: formik.values.childSeat === true,
            },
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Правый руль, 1600р',
              value: 'rightHand',
              checked: formik.values.rightHand === true,
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  )
}

export default Addition
