import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { requestCategoriesData } from "../../../store/admin-car-category-reducer"
import { LinkButton } from "../../common/Button/Button"
import Loader from "../../common/Loader/Loader"

const AdminCarCategory = ({
  isDataFetching,
  categoriesData,
  requestCategoriesData,
}) => {
  const [categories, setCategories] = useState(categoriesData)
  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    requestCategoriesData()
  }, [requestCategoriesData])

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData)
      setIsDataReady(true)
    }
  }, [categoriesData])

  return (
    <div className="admin__orders">
      {!isDataReady || isDataFetching ? (
        <Loader admin />
      ) : (
        <>
          <div className="content__title">Список категорий авто</div>
          <div className="content__card orders">
            <div className="orders__content category-settings">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Категория</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Редактировать</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td data-label="Категория">{category.name}</td>
                      <td data-label="Описание">{category.description}</td>
                      <td data-label="Редактировать">
                        <LinkButton
                          additionalStyles="button__admin button__table"
                          to={`/admin/car-category/${category.id}`}
                        >
                          Редактировать
                        </LinkButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="orders__content-container">
                <LinkButton
                  additionalStyles="button__admin button__table"
                  to={`/admin/car-category/${"new-category"}`}
                >
                  Добавить новую
                </LinkButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  isDataFetching: state.carCategoryData.isDataFetching,
  categoriesData: state.carCategoryData.categoriesData,
})

export default connect(mapStateToProps, { requestCategoriesData })(
  AdminCarCategory,
)
