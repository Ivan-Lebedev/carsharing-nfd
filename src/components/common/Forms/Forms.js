import React from 'react'
import './Forms.css'
import classNames from 'classnames'
import CrossIcon from '../../common/icons/CrossIcon'

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
          />
          <button className='text__input-cancel'>
            <CrossIcon />
          </button>
        </label>
      ))}
    </div>
  )
}

// export const InputText = ({ item }) => {
//   const [text1, setText1] = useState(item.value1)
//   const [text2, setText2] = useState(item.value2)

//   const clearText1 = classNames('text__input-cancel', {
//     'text__input-cancel--hidden': text1.length === 0,
//   })

//   const clearText2 = classNames('text__input-cancel', {
//     'text__input-cancel--hidden': text2.length === 0,
//   })

//   return (
//     <div className='text'>
//       <label className='text__input'>
//         <div className='text__input-type'>{item.label1}</div>
//         <input
//           type='text'
//           className='text__input-value'
//           value={text1}
//           onChange={(e) => setText1(e.target.value)}
//           placeholder={item.placeholder1}
//         />
//         <button className={clearText1} onClick={() => setText1('')}>
//           <CrossIcon />
//         </button>
//       </label>
//       <label className='text__input'>
//         <div className='text__input-type'>{item.label2}</div>
//         <input
//           type='text'
//           className='text__input-value'
//           value={text2}
//           onChange={(e) => setText2(e.target.value)}
//           placeholder={item.placeholder2}
//         />
//         <button className={clearText2} onClick={() => setText2('')}>
//           <CrossIcon />
//         </button>
//       </label>
//     </div>
//   )
// }
