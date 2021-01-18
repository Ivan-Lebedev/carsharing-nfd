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
import { useLocation, useHistory } from "react-router-dom"
import "./AdminCarCategory.scss"

const AdminCarCategorySettings = ({
  isDataFetching,
  carsCategoryData,
  newCategoryId,
  requestCategoriesData,
  updateCategoryData,
  deleteCategoryData,
  sendNewCategoryData,
  clearCategoryId,
}) => {
  const location = useLocation()
  const history = useHistory()
  const categoryId = location.pathname.split("/")[3]

  const [category, setCategory] = useState(carsCategoryData)
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    if (categoryId && categoryId !== "new-category") {
      requestCategoriesData(categoryId)
    }
  }, [requestCategoriesData, categoryId])

  useEffect(() => {
    if (carsCategoryData) {
      setCategory(carsCategoryData)
      setIsDataReady(true)
    }
    if (categoryId === "new-category") {
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
    if (categoryId && categoryId !== "new-category") {
      updateCategoryData(category, categoryId)
    }
    if (categoryId === "new-category") {
      sendNewCategoryData(category)
    }
  }

  const discardChanges = () => {
    if (categoryId && categoryId !== "new-category") {
      requestCategoriesData(categoryId)
    }
  }

  const deleteCategory = () => {
    if (categoryId && categoryId !== "new-category") {
      deleteCategoryData(categoryId)
      clearCategoryId()
      history.push(`/admin/car-category/`)
    }
  }

  return (
    <div className="admin__orders">
      {!isDataReady || isDataFetching ? (
        <Loader admin />
      ) : (
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
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  isDataFetching: state.categoryData.isDataFetching,
  carsCategoryData: state.categoryData.carsCategoryData,
  newCategoryId: state.categoryData.newCategoryId,
})

export default connect(mapStateToProps, {
  requestCategoriesData,
  updateCategoryData,
  deleteCategoryData,
  sendNewCategoryData,
  clearCategoryId,
})(AdminCarCategorySettings)
