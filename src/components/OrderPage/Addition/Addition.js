import React from 'react'
import './Addition.css'
import { InputItem, InputText } from '../../common/Forms/Forms'

const Addition = () => {
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
              value: 'any',
              defaultChecked: true,
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'Красный',
              value: 'red',
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'Голубой',
              value: 'blue',
            },
          ]}
        />
      </div>

      <div className='addition__option'>
        <div className='addition__title'>Дата аренды</div>
        <InputText
          name='date'
          item={{
            label1: 'C',
            placeholder1: 'Введите дату и время',
            label2: 'По',
            placeholder2: 'Введите дату и время',
          }}
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
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: 'На сутки, 1999 ₽/сутки',
              value: 'day',
              defaultChecked: true,
            },
          ]}
        />
      </div>

      <div className='addition__option'>
        <div className='addition__title'>Доп услуги</div>
        <InputItem
          name='extra-options'
          direction='column'
          items={[
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Полный бак, 500р',
              value: 'fuel',
            },
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Детское кресло, 200р',
              value: 'chair',
            },
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Правый руль, 1600р',
              value: 'wheel',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Addition
