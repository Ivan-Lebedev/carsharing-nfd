import React from 'react'
import './Addition.css'
import { connect } from 'react-redux'
import { getCars } from '../../../store/order-selectors'
import { InputItem, InputDate } from '../../common/Forms/Forms'

const Addition = ({ formik, cars }) => {
  const modelData = cars.find((car) => car.name === formik.values.model)
  const carColors = ['любой', ...modelData.colors]

  const ColorItems = carColors.map((color) => {
    const colorItem = {}
    colorItem.inputItemLabelClass = 'radio-item__label'
    colorItem.inputItemStyle = 'radio'
    colorItem.inputStyle = 'radio-item__input'
    colorItem.inputItemClass = 'input__radio-item'
    colorItem.label = color.charAt(0).toUpperCase() + color.slice(1)
    colorItem.value = color
    colorItem.checked = formik.values.color === color
    return colorItem
  })

  return (
    <div className='addition'>
      <div className='addition__option'>
        <div className='addition__title'>Цвет</div>
        <InputItem
          name='color'
          items={ColorItems}
          onChange={formik.handleChange}
        />
      </div>

      <div className='addition__option'>
        <div className='addition__title'>Дата аренды</div>
        <InputDate
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
          formik={formik}
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
              label: `Поминутно, ${Math.ceil(
                (2 * modelData.priceMin) / (60 * 24)
              )} ₽/мин`,
              value: 'minute',
              checked: formik.values.plan === 'minute',
            },
            {
              inputItemLabelClass: 'radio-item__label',
              inputItemStyle: 'radio',
              inputStyle: 'radio-item__input',
              inputItemClass: 'input__radio-item',
              label: `На сутки, ${Math.ceil(modelData.priceMin)} ₽/сутки`,
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
              value: 'isFullTank',
              checked: formik.values.isFullTank === true,
            },
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Детское кресло, 200р',
              value: 'isNeedChildChair',
              checked: formik.values.isNeedChildChair === true,
            },
            {
              inputItemLabelClass: 'checkbox-item__label',
              inputItemStyle: 'checkbox',
              inputStyle: 'checkbox-item__input',
              inputItemClass: 'input__checkbox-item',
              label: 'Правый руль, 1600р',
              value: 'isRightWheel',
              checked: formik.values.isRightWheel === true,
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cars: getCars(state),
})

// export default Addition
export default connect(mapStateToProps)(Addition)
