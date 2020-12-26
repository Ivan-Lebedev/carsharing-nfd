import React from "react"
import "./AdminCarSettings.scss"
import CarImg from "../../../assets/images/image 2.png"
import ProgressBar from "../../../assets/images/Progress Bar.png"
import { Form, Formik } from "formik"
import { CheckBoxes, TextField } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"

const initialValues = {
  model: "Hyndai, i30 N",
  modelType: "Компакт-кар",
  modelColors: "Синий",
}
const colorOptions = [
  { label: "Красный", value: "Красный" },
  { label: "Белый", value: "Белый" },
  { label: "Черный", value: "Черный" },
]

const AdminCarSettings = () => {
  return (
    <div className="admin__car-settings car-settings">
      <div className="content__title">Карточка автомобиля</div>
      <div className="car-settings__content">
        <div className="car-settings__car-container car-container">
          <div className="car-container__car-details">
            <img src={CarImg} alt="CarImg" className="car-container__img" />
            <div className="car-container__title">Hyndai, i30 N</div>
            <div className="car-container__car-desc">Компакт-кар</div>
            <label className="car-container__file">
              <input
                className="car-container__file-input"
                type="file"
                id="file"
              />
              <span className="car-container__file-custom" />
            </label>
          </div>
          <div className="car-container__progress-bar progress-bar">
            <div className="progress-bar__desc">
              <div className="progress-bar__title">Заполнено</div>
              <span className="progress-bar__progress">74 %</span>
            </div>
            <img
              src={ProgressBar}
              alt="loader"
              className="progress-bar__loader"
            />
          </div>
          <div className="car-container__desc">
            <div className="car-container__desc-title">Описание</div>
            <div className="car-container__desc-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              eaque, quidem, commodi soluta qui quae quod dolorum sint alias,
              possimus illum assumenda eligendi cumque?
            </div>
          </div>
        </div>
        <div className="car-settings__settings-container settings-container">
          <Formik initialValues={initialValues}>
            <Form className="settings-container__form">
              <div className="settings-container__title">
                Настройки автомобиля
              </div>
              <div className="settings-container__items">
                <div className="settings-container__item">
                  <TextField
                    name="model"
                    title="Модель автомобиля"
                    placeholder="Hyndai, i30 N"
                    type="text"
                  />
                </div>
                <div className="settings-container__item">
                  <TextField
                    name="modelType"
                    title="Тип автомобиля"
                    placeholder="Компакт-кар"
                    type="text"
                  />
                </div>
                <div className="settings-container__item">
                  <TextField
                    name="modelColors"
                    title="Доступные цвета"
                    placeholder="Синий"
                    type="text"
                  />
                  <button className="settings-container__item-btn" />
                </div>
              </div>
              <div className="settings-container__checkboxes">
                <CheckBoxes direction="column" items={colorOptions} />
              </div>
              <div className="settings-container__buttons">
                <div className="settings-container__buttons-edit">
                  <Button additionalStyles="button__admin">Сохранить</Button>
                  <Button additionalStyles="button__admin" disabled={true}>
                    Отменить
                  </Button>
                </div>
                <div className="settings-container__buttons-delete">
                  <Button additionalStyles="button__admin button__admin--cancel">
                    Удалить
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AdminCarSettings
