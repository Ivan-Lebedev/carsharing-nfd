import orderAPI from "../api/api"

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_CARS = "SET_CARS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_CARS_COUNT = "SET_TOTAL_CARS_COUNT"

const initialState = {
  cars: [],
  pageSize: 5,
  carsCount: 0,
  currentPage: 0,
  isFetching: false,
}

const carsTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      }
    case SET_CARS:
      return {
        ...state,
        cars: action.payload,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case SET_CARS_COUNT:
      return {
        ...state,
        carsCount: action.payload,
      }
    default:
      return state
  }
}

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  payload: isFetching,
})

export const setCars = (cars) => ({
  type: SET_CARS,
  payload: cars,
})

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
})

export const setCarsCount = (carsCount) => ({
  type: SET_CARS_COUNT,
  payload: carsCount,
})

export const requestCarsPage = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(toggleIsFetching(true))
    const result = await orderAPI.getCarsPage(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setCars(result.data.data))
    dispatch(setCarsCount(result.data.count))
  } catch (e) {
    console.log(e)
  }
}

export default carsTableReducer
