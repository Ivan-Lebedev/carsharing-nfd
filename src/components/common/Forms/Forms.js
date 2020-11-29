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

export const DateFrom = ({ formik }) => {
  const clearInput = classNames('text__input-cancel', {
    'text__input-cancel--hidden': formik.values.dateFrom.length === 0,
  })
  const dateNow = new Date()
  return (
    <div className='text'>
      <div className='text__input'>
        <div className='text__input-type'>С</div>
        <DatePicker
          selectsStart
          selected={formik.values.dateFrom}
          onChange={(date) =>
            formik.setValues({ ...formik.values, dateFrom: date })
          }
          startDate={formik.values.dateFrom}
          endDate={formik.values.dateTo}
          maxDate={formik.values.dateTo}
          className='text__input-value'
          placeholderText={'Введите дату и время'}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={60}
          dateFormat='dd.MM.yyyy HH:mm'
          minDate={dateNow}
        />
        <button
          className={clearInput}
          onClick={() => formik.setValues({ ...formik.values, dateFrom: '' })}>
          <CrossIcon />
        </button>
      </div>
    </div>
  )
}

export const DateTo = ({ formik }) => {
  const clearInput = classNames('text__input-cancel', {
    'text__input-cancel--hidden': formik.values.dateTo.length === 0,
  })
  return (
    <div className='text'>
      <div className='text__input'>
        <div className='text__input-type'>По</div>
        <DatePicker
          selectsEnd
          selected={formik.values.dateTo}
          onChange={(date) =>
            formik.setValues({ ...formik.values, dateTo: date })
          }
          startDate={formik.values.dateFrom}
          endDate={formik.values.dateTo}
          minDate={formik.values.dateFrom}
          className='text__input-value'
          placeholderText={'Введите дату и время'}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={60}
          dateFormat='dd.MM.yyyy HH:mm'
        />
        <button
          className={clearInput}
          onClick={() => formik.setValues({ ...formik.values, dateTo: '' })}>
          <CrossIcon />
        </button>
      </div>
    </div>
  )
}

export const SearchCity = ({ item, onChange, formik }) => {
  const clearInput = classNames('text__input-cancel', {
    'text__input-cancel--hidden': item.value.length === 0,
  })
  return (
    <div className='text'>
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
          autoComplete='off'
        />
        {item.options && item.value.length > 1 && (
          <datalist id={item.placeholder}>
            {item.options.map((city, index) => (
              <option key={index}>{city}</option>
            ))}
          </datalist>
        )}
        <button
          className={clearInput}
          onClick={() =>
            formik.setValues({ ...formik.values, locationCity: '' })
          }>
          <CrossIcon />
        </button>
      </label>
    </div>
  )
}

export const SearchPoint = ({ item, onChange, formik }) => {
  const clearInput = classNames('text__input-cancel', {
    'text__input-cancel--hidden': item.value.length === 0,
  })
  return (
    <div className='text'>
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
          autoComplete='off'
        />
        {item.options && (
          <datalist id={item.placeholder}>
            {item.options.length ? (
              item.options.map((point, index) => (
                <option key={index}>{point}</option>
              ))
            ) : (
              <option>В городе нет точек</option>
            )}
          </datalist>
        )}
        <button
          className={clearInput}
          onClick={() =>
            formik.setValues({ ...formik.values, locationPoint: '' })
          }>
          <CrossIcon />
        </button>
      </label>
    </div>
  )
}
