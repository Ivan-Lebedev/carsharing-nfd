import orderAPI from "../api/api"
import Cookies from "js-cookie"

const TOGGLE_IS_CARS_FETCHING = "TOGGLE_IS_CARS_FETCHING"
const SET_CAR_DATA = "SET_CAR_DATA"

const initialState = {
  isCarsFetching: false,
  carData: [],
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

export default carSettingsReducer
