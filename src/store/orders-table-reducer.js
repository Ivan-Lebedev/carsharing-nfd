import orderAPI from "../api/api"
import Cookies from "js-cookie"

const TOGGLE_IS_ORDER_FETCHING = "TOGGLE_IS_ORDER_FETCHING"
const SET_ORDERS_PER_PAGE = "SET_ORDERS_PER_PAGE"
const SET_CURRENT_ORDERS_PAGE = "SET_CURRENT_ORDERS_PAGE"
const SET_ORDERS_COUNT = "SET_ORDERS_COUNT"
const SET_ORDERS_TOTAL = "SET_ORDERS_TOTAL"

const initialState = {
  ordersTotal: [],
  ordersPerPage: [],
  ordersPageSize: 3,
  ordersCount: 0,
  currentOrdersPage: 0,
  isOrdersFetching: false,
}

const ordersTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_ORDER_FETCHING:
      return {
        ...state,
        isOrdersFetching: action.payload,
      }
    case SET_ORDERS_PER_PAGE:
      return {
        ...state,
        ordersPerPage: action.payload,
      }
    case SET_CURRENT_ORDERS_PAGE:
      return {
        ...state,
        currentOrdersPage: action.payload,
      }
    case SET_ORDERS_COUNT:
      return {
        ...state,
        ordersCount: action.payload,
      }
    case SET_ORDERS_TOTAL:
      return {
        ...state,
        ordersTotal: action.payload,
      }
    default:
      return state
  }
}

export const toggleIsOrdersFetching = (isOrdersFetching) => ({
  type: TOGGLE_IS_ORDER_FETCHING,
  payload: isOrdersFetching,
})

export const setOrdersPerPage = (ordersPerPage) => ({
  type: SET_ORDERS_PER_PAGE,
  payload: ordersPerPage,
})

export const setCurrentOrdersPage = (currentOrdersPage) => ({
  type: SET_CURRENT_ORDERS_PAGE,
  payload: currentOrdersPage,
})

export const setOrdersCount = (ordersCount) => ({
  type: SET_ORDERS_COUNT,
  payload: ordersCount,
})

export const setOrdersTotal = (ordersTotal) => ({
  type: SET_ORDERS_TOTAL,
  payload: ordersTotal,
})

export const requestOrdersPage = (page, pageSize) => async (dispatch) => {
  try {
    const basicToken = `${Cookies.get("access_token")}`
    dispatch(toggleIsOrdersFetching(true))
    const result = await orderAPI.getAdminOrders(page, pageSize, basicToken)
    dispatch(toggleIsOrdersFetching(false))
    dispatch(setOrdersPerPage(result.data.data))
    dispatch(setOrdersCount(result.data.count))
  } catch (e) {
    dispatch(toggleIsOrdersFetching(false))
    console.log(e)
  }
}

// export const requestCarsTotal = () => async (dispatch) => {
//   try {
//     dispatch(toggleIsFetching(true))
//     const result = await orderAPI.getCar()
//     dispatch(toggleIsFetching(false))
//     dispatch(setCarsTotal(result.data.data))
//   } catch (e) {
//     console.log(e)
//   }
// }

export default ordersTableReducer
