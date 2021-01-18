import orderAPI from "../api/api"
import Cookies from "js-cookie"

const TOGGLE_IS_DATA_FETCHING = "TOGGLE_IS_DATA_FETCHING"
const SET_CATEGORIES_DATA = "SET_CATEGORIES_DATA"
const SET_CATEGORY_SETTINGS_DATA = "SET_CATEGORY_SETTINGS_DATA"
const SET_NEW_CATEGORY_ID = "SET_NEW_CATEGORY_ID"

const initialState = {
  isDataFetching: false,
  categoriesData: null,
  carsCategoryData: null,
  newCategoryId: null,
}

const adminCategoriesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_DATA_FETCHING:
      return {
        ...state,
        isDataFetching: action.payload,
      }
    case SET_CATEGORIES_DATA:
      return {
        ...state,
        categoriesData: action.payload,
      }
    case SET_CATEGORY_SETTINGS_DATA:
      return {
        ...state,
        carsCategoryData: action.payload,
      }
    case SET_NEW_CATEGORY_ID:
      return {
        ...state,
        newCategoryId: action.payload,
      }
    default:
      return state
  }
}

export const toggleIsDataFetching = (isDataFetching) => ({
  type: TOGGLE_IS_DATA_FETCHING,
  payload: isDataFetching,
})

export const setCategoriesData = (categoriesData) => ({
  type: SET_CATEGORIES_DATA,
  payload: categoriesData,
})

export const setCategoryData = (carsCategoryData) => ({
  type: SET_CATEGORY_SETTINGS_DATA,
  payload: carsCategoryData,
})

export const setNewCategoryId = (newCategoryId) => ({
  type: SET_NEW_CATEGORY_ID,
  payload: newCategoryId,
})

export const clearCategoryId = () => ({
  type: SET_NEW_CATEGORY_ID,
  payload: null,
})

export const requestCategoriesData = (categoryId) => async (dispatch) => {
  try {
    dispatch(toggleIsDataFetching(true))
    if (categoryId) {
      const result = await orderAPI.getCategory(categoryId)
      dispatch(setCategoryData(result.data.data))
    } else {
      const result = await orderAPI.getCategory()
      dispatch(setCategoriesData(result.data.data))
    }
    dispatch(toggleIsDataFetching(false))
  } catch (e) {
    console.log(e)
  }
}

export const updateCategoryData = (categoryData, categoryId) => async (
  dispatch,
) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    const categoryBody = JSON.stringify(categoryData)
    dispatch(toggleIsDataFetching(true))
    const response = await orderAPI.putNewCategoryData(
      categoryBody,
      basicToken,
      categoryId,
    )
    dispatch(toggleIsDataFetching(false))
    if (response.statusText === "OK") {
    }
  } catch (e) {
    console.log(e)
  }
}

export const deleteCategoryData = (categoryId) => async (dispatch) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    dispatch(toggleIsDataFetching(true))
    const response = await orderAPI.deleteCategoryData(basicToken, categoryId)
    dispatch(toggleIsDataFetching(false))
    if (response.statusText === "OK") {
    }
  } catch (e) {
    console.log(e)
  }
}

export const sendNewCategoryData = (categoryData) => async (dispatch) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    const categoryBody = JSON.stringify(categoryData)
    dispatch(toggleIsDataFetching(true))
    const response = await orderAPI.postNewCategory(categoryBody, basicToken)
    dispatch(toggleIsDataFetching(false))
    if (response.statusText === "OK") {
      dispatch(setNewCategoryId(response.data.data.id))
    }
  } catch (e) {
    console.log(e)
  }
}

export default adminCategoriesDataReducer
