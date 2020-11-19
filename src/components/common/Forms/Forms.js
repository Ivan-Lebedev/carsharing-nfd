import React from 'react'
import './Forms.css'
import classNames from 'classnames'
import CrossIcon from '../../common/icons/CrossIcon'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const InputItem = ({ name, direction, items, onChange }) => {
  const inputClass = classNames('input', {
    'input--column': direction === 'column',
  })
  //item.inputItemClass: 'input__radio-item' / 'input__checkbox-item'
  //item.inputStyle: 'radio-item__input' / 'checkbox-item__input'
  //item.inputItemStyle: 'radio' / 'checkbox'
  //item.inputItemLabelClass: 'radio-item__label' / 'checkbox-item__label'
  return (
    <div className={inputClass}>
      {items.map((item) => (
        <div className={item.inputItemClass} key={item.value}>
          <input
            className={item.inputStyle}
            type={item.inputItemStyle}
            name={name ? name : item.value}
            id={item.value}
            checked={item.checked}
            value={item.value}
            onChange={onChange}
          />
          <label className={item.inputItemLabelClass} htmlFor={item.value}>
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}

export const InputText = ({ items, onChange }) => {
  return (
    <div className='text'>
      {items.map((item) => (
        <label className='text__input' key={item.label}>
          <div className='text__input-type'>{item.label}</div>
          <input
            type='text'
            id={item.name}
            name={item.name}
            className='text__input-value'
            value={item.value}
            onChange={onChange}
            placeholder={item.placeholder}
            list={item.placeholder}
          />
          {item.options && (
            <datalist id={item.placeholder}>
              <option>{item.options[0]}</option>
              <option>{item.options[1]}</option>
              <option>{item.options[2]}</option>
              <option>{item.options[3]}</option>
            </datalist>
          )}
          <button className='text__input-cancel'>
            <CrossIcon />
          </button>
        </label>
      ))}
    </div>
  )
}

export const InputDate = ({ items, formik }) => {
  return (
    <div className='text'>
      <div className='text__input' key={items[0].label}>
        <div className='text__input-type'>{items[0].label}</div>
        <DatePicker
          selectsStart
          selected={items[0].value}
          onChange={(date) =>
            formik.setValues({ ...formik.values, dateFrom: date })
          }
          startDate={formik.values.dateFrom}
          endDate={formik.values.dateTo}
          maxDate={formik.values.dateTo}
          className='text__input-value'
          placeholderText={items[0].placeholder}
        />
        <button className='text__input-cancel'>
          <CrossIcon />
        </button>
      </div>
      <div className='text__input' key={items[1].label}>
        <div className='text__input-type'>{items[1].label}</div>
        <DatePicker
          selectsEnd
          selected={items[1].value}
          onChange={(date) =>
            formik.setValues({ ...formik.values, dateTo: date })
          }
          startDate={formik.values.dateFrom}
          endDate={formik.values.dateTo}
          minDate={formik.values.dateFrom}
          className='text__input-value'
          placeholderText={items[1].placeholder}
        />
        <button className='text__input-cancel'>
          <CrossIcon />
        </button>
      </div>
    </div>
  )
}
