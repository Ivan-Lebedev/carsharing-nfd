import orderAPI from "../api/api"
import Cookies from "js-cookie"

const TOGGLE_IS_ORDER_FETCHING = "TOGGLE_IS_ORDER_FETCHING"
const SET_ORDER_DATA = "SET_ORDER_DATA"
const SET_POINTS_DATA = "SET_POINTS_DATA"
const SET_CITIES_DATA = "SET_CITIES_DATA"
const SET_CARS_DATA = "SET_CARS_DATA"

const initialState = {
  isOrderFetching: false,
  orderData: null,
  pointsData: [],
  citiesData: null,
  carsData: [],
}

const adminOrderSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_ORDER_FETCHING:
      return {
        ...state,
        isOrderFetching: action.payload,
      }
    case SET_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      }
    case SET_POINTS_DATA:
      return {
        ...state,
        pointsData: action.payload,
      }
    case SET_CITIES_DATA:
      return {
        ...state,
        citiesData: action.payload,
      }
    case SET_CARS_DATA:
      return {
        ...state,
        carsData: action.payload,
      }
    default:
      return state
  }
}

export const toggleIsOrderFetching = (isOrderFetching) => ({
  type: TOGGLE_IS_ORDER_FETCHING,
  payload: isOrderFetching,
})

export const setOrderData = (orderData) => ({
  type: SET_ORDER_DATA,
  payload: orderData,
})

export const setPointsData = (pointsData) => ({
  type: SET_POINTS_DATA,
  payload: pointsData,
})

export const setCitiesData = (citiesData) => ({
  type: SET_CITIES_DATA,
  payload: citiesData,
})

export const setCarsData = (carsData) => ({
  type: SET_CARS_DATA,
  payload: carsData,
})

export const requestOrderData = (orderId) => async (dispatch) => {
  try {
    dispatch(toggleIsOrderFetching(true))
    const result = await orderAPI.getOrder(orderId)
    dispatch(toggleIsOrderFetching(false))
    dispatch(setOrderData(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const requestCarsData = () => async (dispatch) => {
  try {
    dispatch(toggleIsOrderFetching(true))
    const result = await orderAPI.getCar()
    dispatch(toggleIsOrderFetching(false))
    dispatch(setCarsData(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const requestCitiesData = () => async (dispatch) => {
  try {
    dispatch(toggleIsOrderFetching(true))
    const result = await orderAPI.getCity()
    dispatch(toggleIsOrderFetching(false))
    dispatch(setCitiesData(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

// export const requestCategoryData = () => async (dispatch) => {
//   try {
//     dispatch(toggleIsCarsFetching(true))
//     const result = await orderAPI.getCategory()
//     dispatch(toggleIsCarsFetching(false))
//     dispatch(setCategoryData(result.data.data))
//   } catch (e) {
//     console.log(e)
//   }
// }

// export const sendNewCarData = (carData) => async (dispatch) => {
//   try {
//     const basicToken = `${Cookies.get("access_token")}`
//     const carBody = JSON.stringify(carData)
//     dispatch(toggleIsCarsFetching(true))
//     const response = await orderAPI.postNewCar(carBody, basicToken)
//     dispatch(toggleIsCarsFetching(false))
//     if (response.statusText === "OK") {
//       dispatch(setNewCarId(response.data.data.id))
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }

// export const updateCarData = (carData, carId) => async (dispatch) => {
//   try {
//     const basicToken = `${Cookies.get("access_token")}`
//     const carBody = JSON.stringify(carData)
//     dispatch(toggleIsCarsFetching(true))
//     const response = await orderAPI.putNewCarData(carBody, basicToken, carId)
//     dispatch(toggleIsCarsFetching(false))
//     if (response.statusText === "OK") {
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }

// export const deleteCarData = (carId) => async (dispatch) => {
//   try {
//     const basicToken = `${Cookies.get("access_token")}`
//     dispatch(toggleIsCarsFetching(true))
//     const response = await orderAPI.deleteCarData(basicToken, carId)
//     dispatch(toggleIsCarsFetching(false))
//     if (response.statusText === "OK") {
//       dispatch(setNewCarId(null))
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }

export default adminOrderSettingsReducer
