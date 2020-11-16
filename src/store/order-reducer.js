import orderAPI from '../api/api'

const ADD_CITIES = 'ADD_CITIES'
const ADD_POINTS = 'ADD_POINTS'

const initialState = {
  cities: [],
  points: [],
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

export default orderReducer
