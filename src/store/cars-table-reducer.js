import orderAPI from "../api/api"

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_CARS_PER_PAGE = "SET_CARS_PER_PAGE"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_CARS_COUNT = "SET_CARS_COUNT"
const SET_CARS_TOTAL = "SET_CARS_TOTAL"

const initialState = {
  carsTotal: [],
  carsPerPage: [],
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
    case SET_CARS_PER_PAGE:
      return {
        ...state,
        carsPerPage: action.payload,
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
    case SET_CARS_TOTAL:
      return {
        ...state,
        carsTotal: action.payload,
      }
    default:
      return state
  }
}

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  payload: isFetching,
})

export const setCarsPerPage = (carsPerPage) => ({
  type: SET_CARS_PER_PAGE,
  payload: carsPerPage,
})

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
})

export const setCarsCount = (carsCount) => ({
  type: SET_CARS_COUNT,
  payload: carsCount,
})

export const setCarsTotal = (carsTotal) => ({
  type: SET_CARS_TOTAL,
  payload: carsTotal,
})

export const requestCarsPage = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(toggleIsFetching(true))
    const result = await orderAPI.getCarsPage(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setCarsPerPage(result.data.data))
    dispatch(setCarsCount(result.data.count))
  } catch (e) {
    console.log(e)
  }
}

export const requestCarsTotal = () => async (dispatch) => {
  try {
    dispatch(toggleIsFetching(true))
    const result = await orderAPI.getCar()
    dispatch(toggleIsFetching(false))
    dispatch(setCarsTotal(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export default carsTableReducer
