import orderAPI from "../api/api"
import Cookies from "js-cookie"

const TOGGLE_IS_CARS_FETCHING = "TOGGLE_IS_CARS_FETCHING"
const SET_CAR_DATA = "SET_CAR_DATA"
const SET_CATEGORY_DATA = "SET_CATEGORY_DATA"

const initialState = {
  isCarsFetching: false,
  carData: [],
  categoryData: [],
}

const carSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_CARS_FETCHING:
      return {
        ...state,
        isCarsFetching: action.payload,
      }
    case SET_CAR_DATA:
      return {
        ...state,
        carData: action.payload,
      }
    case SET_CATEGORY_DATA:
      return {
        ...state,
        categoryData: action.payload,
      }
    default:
      return state
  }
}

export const toggleIsCarsFetching = (isCarsFetching) => ({
  type: TOGGLE_IS_CARS_FETCHING,
  payload: isCarsFetching,
})

export const setCarData = (carData) => ({
  type: SET_CAR_DATA,
  payload: carData,
})

export const setCategoryData = (categoryData) => ({
  type: SET_CATEGORY_DATA,
  payload: categoryData,
})

export const clearCarData = () => async (dispatch) => {
  try {
    dispatch(setCarData([]))
  } catch (e) {
    console.log(e)
  }
}

export const requestCarData = (carId) => async (dispatch) => {
  try {
    dispatch(toggleIsCarsFetching(true))
    const result = await orderAPI.getCarById(carId)
    dispatch(toggleIsCarsFetching(false))
    dispatch(setCarData(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const requestCategoryData = () => async (dispatch) => {
  try {
    dispatch(toggleIsCarsFetching(true))
    const result = await orderAPI.getCategory()
    dispatch(toggleIsCarsFetching(false))
    dispatch(setCategoryData(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const sendNewCarData = (carData) => async (dispatch) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    const carBody = JSON.stringify(carData)
    dispatch(toggleIsCarsFetching(true))
    const response = await orderAPI.postNewCar(carBody, basicToken)
    dispatch(toggleIsCarsFetching(false))
    if (response.statusText === "OK") {
      console.log(response)
    }
  } catch (e) {
    console.log(e)
  }
}

export const updateCarData = (carData, carId) => async (dispatch) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    const carBody = JSON.stringify(carData)
    dispatch(toggleIsCarsFetching(true))
    const response = await orderAPI.putNewCarData(carBody, basicToken, carId)
    dispatch(toggleIsCarsFetching(false))
    if (response.statusText === "OK") {
      console.log(response)
    }
  } catch (e) {
    console.log(e)
  }
}

export const deleteCarData = (carId) => async (dispatch) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    dispatch(toggleIsCarsFetching(true))
    const response = await orderAPI.deleteCarData(basicToken, carId)
    dispatch(toggleIsCarsFetching(false))
    if (response.statusText === "OK") {
      console.log(response)
    }
  } catch (e) {
    console.log(e)
  }
}

export default carSettingsReducer
