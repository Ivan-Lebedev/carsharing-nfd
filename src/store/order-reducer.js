import orderAPI from '../api/api'

const ADD_CITIES = 'ADD_CITIES'
const ADD_POINTS = 'ADD_POINTS'
const ADD_CARS = 'ADD_CARS'
const CARS_FETCHING = 'CARS_FETCHING'

const initialState = {
  cities: [],
  points: [],
  cars: [],
  carsFetching: true,
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
    case CARS_FETCHING:
      return {
        ...state,
        carsFetching: action.payload,
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

export const toggleCarsFetching = (carsFetching) => ({
  type: CARS_FETCHING,
  payload: carsFetching,
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
    dispatch(toggleCarsFetching(true))
    const result = await orderAPI.getCar()
    dispatch(toggleCarsFetching(false))
    dispatch(addCars(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const submitOrder = (
  cityId,
  pointId,
  carId,
  color,
  dateFrom,
  dateTo,
  rateId,
  price,
  isFullTank,
  isNeedChildChair,
  isRightWheel
) => async () => {
  try {
    const orderBody = {
      orderStatusId: {
        name: 'new',
        id: '5e26a191099b810b946c5d89',
      },
      cityId: {
        id: cityId,
      },
      pointId: {
        id: pointId,
      },
      carId: {
        id: carId,
      },
      color,
      dateFrom,
      dateTo,
      rateId: {
        id: rateId,
      },
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
    }
    await orderAPI.postOrder(orderBody)
  } catch (e) {
    console.log(e)
  }
}

export default orderReducer
