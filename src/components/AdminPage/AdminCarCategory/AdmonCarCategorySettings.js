import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import {
  requestCategoriesData,
  updateCategoryData,
  deleteCategoryData,
  sendNewCategoryData,
  clearCategoryId,
} from "../../../store/admin-car-category-reducer"
import { CarSettingsField } from "../../common/AdminForms/AdminForms"
import { Button } from "../../common/Button/Button"
import Loader from "../../common/Loader/Loader"
import { useHistory } from "react-router-dom"
import "./AdminCarCategory.scss"
import { newCategory } from "../../../constants/strings"

const AdminCarCategorySettings = ({
  isDataFetching,
  carsCategoryData,
  newCategoryId,
  requestCategoriesData,
  updateCategoryData,
  deleteCategoryData,
  sendNewCategoryData,
  clearCategoryId,
  match,
}) => {
  const history = useHistory()
  const categoryId = match.params.categoryId

  const [category, setCategory] = useState(carsCategoryData)
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    if (categoryId && categoryId !== newCategory) {
      requestCategoriesData(categoryId)
    }
  }, [requestCategoriesData, categoryId])

  useEffect(() => {
    if (carsCategoryData) {
      setCategory(carsCategoryData)
      setIsDataReady(true)
    }
    if (categoryId === newCategory) {
      setCategory({
        description: "",
        name: "",
      })
      setIsDataReady(true)
    }
  }, [carsCategoryData, categoryId])

  useEffect(() => {
    if (newCategoryId) {
      history.push(`/admin/car-category/${newCategoryId}`)
    }
  }, [newCategoryId, history])

  const inputHandleChange = (e) => {
    const { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }
  const submitCategoryData = () => {
    if (categoryId && categoryId !== newCategory) {
      updateCategoryData(category, categoryId)
    }
    if (categoryId === newCategory) {
      sendNewCategoryData(category)
    }
  }

  const discardChanges = () => {
    if (categoryId && categoryId !== newCategory) {
      requestCategoriesData(categoryId)
    }
  }

  const deleteCategory = () => {
    if (categoryId && categoryId !== newCategory) {
      deleteCategoryData(categoryId)
      clearCategoryId()
      history.push(`/admin/car-category/`)
    }
  }

  const getContent = () => {
    if (!isDataReady || isDataFetching) {
      return <Loader admin />
    } else {
      return (
        <>
          <div className="content__title">Параметры категории</div>
          <div className="small-content-card orders">
            <div className="category-settings">
              <div className="settings-container__title">
                Изменить данные категории
              </div>
              <div className="settings-container__item">
                <CarSettingsField
                  name="name"
                  title="Категория"
                  placeholder="Введите категорию"
                  type="text"
                  value={category.name}
                  onChange={inputHandleChange}
                />
              </div>
              <div className="settings-container__item">
                <CarSettingsField
                  name="description"
                  title="Описание категории"
                  placeholder="Введите описание"
                  type="text"
                  value={category.description}
                  onChange={inputHandleChange}
                />
              </div>
              <div className="settings-container__buttons">
                <div className="settings-container__buttons-edit">
                  <Button
                    additionalStyles="button__admin"
                    onClick={submitCategoryData}
                  >
                    Сохранить
                  </Button>
                  <Button
                    additionalStyles="button__admin"
                    onClick={discardChanges}
                  >
                    Отменить
                  </Button>
                </div>
                <div className="settings-container__buttons-delete">
                  <Button
                    additionalStyles="button__admin button__admin--cancel"
                    onClick={deleteCategory}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }

  return <div className="admin__orders">{getContent}</div>
}

const mapStateToProps = (state) => ({
  isDataFetching: state.carCategoryData.isDataFetching,
  carsCategoryData: state.carCategoryData.carsCategoryData,
  newCategoryId: state.carCategoryData.newCategoryId,
})

export default connect(mapStateToProps, {
  requestCategoriesData,
  updateCategoryData,
  deleteCategoryData,
  sendNewCategoryData,
  clearCategoryId,
})(AdminCarCategorySettings)
