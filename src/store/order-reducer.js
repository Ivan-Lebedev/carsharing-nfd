import orderAPI from '../api/api'

const ADD_CITIES = 'ADD_CITIES'
const ADD_POINTS = 'ADD_POINTS'
const ADD_CARS = 'ADD_CARS'

const initialState = {
  cities: [],
  points: [],
  cars: [],
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITIES:
      return {
        ...state,
        cities: action.payload,
      }
    case ADD_POINTS:
      return {
        ...state,
        points: action.payload,
      }
    case ADD_CARS:
      return {
        ...state,
        cars: action.payload,
      }
    default:
      return state
  }
}

export const addCities = (cities) => ({
  type: ADD_CITIES,
  payload: cities,
})

export const addPoints = (points) => ({
  type: ADD_POINTS,
  payload: points,
})

export const addCars = (cars) => ({
  type: ADD_CARS,
  payload: cars,
})

export const requestCities = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCity()
    dispatch(addCities(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const requestPoints = () => async (dispatch) => {
  try {
    const result = await orderAPI.getPoint()
    dispatch(addPoints(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const requestCars = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCar()
    dispatch(addCars(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export default orderReducer
