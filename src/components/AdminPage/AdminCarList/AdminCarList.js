import React from "react"
import "./AdminCarList.scss"
import { Form, Formik } from "formik"
import { AdminFilter } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"
import Paginator from "../../common/Paginator/Paginator"

const firstOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]
const secondOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]
const thirdOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]
const fourthOption = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
]

const initialValues = {
  field1: "1",
  field2: "2",
  field3: "2",
  field4: "1",
}

const AdminCarList = () => {
  return (
    <div className="admin__car-list car-list">
      <div className="content__title">Список авто</div>
      <div className="car-list__content-wrapper">
        <div className="car-list__content">
          <Formik initialValues={initialValues}>
            <Form className="car-list__filter">
              <div className="car-list__filter-items">
                <AdminFilter name="field1" options={firstOption} />
                <AdminFilter name="field2" options={secondOption} />
                <AdminFilter name="field3" options={thirdOption} />
                <AdminFilter name="field4" options={fourthOption} />
              </div>
              <div className="car-list__filter-btns">
                <div className="car-list__filter-btn">
                  <Button additionalStyles="button__admin button__admin--cancel">
                    Сбросить
                  </Button>
                </div>
                <div className="car-list__filter-btn">
                  <Button additionalStyles="button__admin">Применить</Button>
                </div>
              </div>
            </Form>
          </Formik>
          <div className="car-list__table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Модель</th>
                  <th scope="col">Тип</th>
                  <th scope="col">Цена</th>
                  <th scope="col">Цвета</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Модель">Hyndai, i30 N</td>
                  <td data-label="Тип">Компакт-кар</td>
                  <td data-label="Цена">10000 - 25000 ₽</td>
                  <td data-label="Цвета">синий, красный</td>
                </tr>
                <tr>
                  <td data-label="Модель">Hyndai, i30 N</td>
                  <td data-label="Тип">Компакт-кар</td>
                  <td data-label="Цена">12000 - 32000 ₽</td>
                  <td data-label="Цвета">белый, черный</td>
                </tr>
                <tr>
                  <td data-label="Модель">Hyndai, i30 N</td>
                  <td data-label="Тип">Компакт-кар</td>
                  <td data-label="Цена">12000 - 32000 ₽</td>
                  <td data-label="Цвета">белый, черный</td>
                </tr>
                <tr>
                  <td data-label="Модель">Hyndai, i30 N</td>
                  <td data-label="Тип">Компакт-кар</td>
                  <td data-label="Цена">12000 - 32000 ₽</td>
                  <td data-label="Цвета">белый, черный</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="car-list__footer">
            <Paginator />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCarList
