import orderAPI from "../api/api"
import Geocode from "react-geocode"
import Cookies from "js-cookie"

const ADD_CITIES = "ADD_CITIES"
const ADD_POINTS = "ADD_POINTS"
const ADD_CARS = "ADD_CARS"
const IS_CARS_FETCHING = "IS_CARS_FETCHING"
const ADD_ORDER_ID = "ADD_ORDER_ID"
const ADD_FINISHED_ORDER_DATA = "ADD_FINISHED_ORDER_DATA"
const TOGGLE_IS_AUTH_IN_PROGRESS = "TOGGLE_IS_AUTH_IN_PROGRESS"
const TOGGLE_IS_AUTH_FAILED = "TOGGLE_IS_AUTH_FAILED"

Geocode.setApiKey("AIzaSyCrF2ESCD9XTV0X2_4JOrAvPSIHq2NPJiI")

const initialState = {
  cities: [],
  points: [],
  cars: [],
  isCarsFetching: true,
  orderId: null,
  finishedOrderData: null,
  isAuthInProgress: false,
  isAuthFailed: false,
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
    case IS_CARS_FETCHING:
      return {
        ...state,
        isCarsFetching: action.payload,
      }
    case ADD_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      }
    case ADD_FINISHED_ORDER_DATA:
      return {
        ...state,
        finishedOrderData: action.payload,
      }
    case TOGGLE_IS_AUTH_IN_PROGRESS:
      return {
        ...state,
        isAuthInProgress: action.payload,
      }
    case TOGGLE_IS_AUTH_FAILED:
      return {
        ...state,
        isAuthFailed: action.payload,
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

export const toggleIsCarsFetching = (isCarsFetching) => ({
  type: IS_CARS_FETCHING,
  payload: isCarsFetching,
})

export const addOrderId = (orderId) => ({
  type: ADD_ORDER_ID,
  payload: orderId,
})

export const addFinishedOrderData = (orderData) => ({
  type: ADD_FINISHED_ORDER_DATA,
  payload: orderData,
})

export const toggleIsAuthInProgress = (isAuthInProgress) => ({
  type: TOGGLE_IS_AUTH_IN_PROGRESS,
  payload: isAuthInProgress,
})

export const toggleIsAuthFailed = (isAuthFailed) => ({
  type: TOGGLE_IS_AUTH_FAILED,
  payload: isAuthFailed,
})

export const requestCities = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCity()
    const cities = result.data.data
    const getCityLatLng = async (city) => {
      try {
        const address = city.name
        const response = await Geocode.fromAddress(address)
        const { lat, lng } = response.results[0].geometry.location
        const cityWithLatLng = city
        cityWithLatLng.lat = lat
        cityWithLatLng.lng = lng
        return cityWithLatLng
      } catch (e) {
        console.log(e)
        return null
      }
    }
    cities.map((city) => getCityLatLng(city))
    dispatch(addCities(cities))
  } catch (e) {
    console.log(e)
  }
}

export const requestPoints = () => async (dispatch) => {
  try {
    const result = await orderAPI.getPoint()
    const points = result.data.data
    const getPointLatLng = async (point) => {
      try {
        const address = `${point.address}, ${point.cityId.name}`
        const response = await Geocode.fromAddress(address)
        const { lat, lng } = response.results[0].geometry.location
        const pointWithLatLng = point
        pointWithLatLng.lat = lat
        pointWithLatLng.lng = lng
        return pointWithLatLng
      } catch (e) {
        console.log(e)
        return null
      }
    }
    points.map((point) => getPointLatLng(point))
    dispatch(addPoints(points))
  } catch (e) {
    console.log(e)
  }
}

export const requestCars = () => async (dispatch) => {
  try {
    dispatch(toggleIsCarsFetching(true))
    const result = await orderAPI.getCar()
    dispatch(toggleIsCarsFetching(false))
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
  isRightWheel,
  setIsModal,
) => async (dispatch) => {
  try {
    const orderBody = {
      orderStatusId: {
        name: "new",
        id: "5e26a191099b810b946c5d89",
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
    const result = await orderAPI.postOrder(orderBody)
    dispatch(addOrderId(result.data.data.id))
    setIsModal(false)
  } catch (e) {
    console.log(e)
  }
}

export const requestOrder = (orderId) => async (dispatch) => {
  try {
    const result = await orderAPI.getOrder(orderId)
    dispatch(addFinishedOrderData(result.data.data))
  } catch (e) {
    console.log(e)
  }
}

export const logIn = (userData) => async (dispatch) => {
  try {
    dispatch(toggleIsAuthInProgress(true))
    const getRandomString = (n) => Math.random().toString(32).substr(2, n)
    const basicToken = btoa(`${getRandomString(7)}:4cbcea96de`)
    const orderBody = JSON.stringify(userData)
    const response = await orderAPI.postLogIn(orderBody, basicToken)
    if (response.statusText === "OK") {
      const cookiesExpiresDays = response.data.expires_in / 86400
      Cookies.set("access_token", response.data.access_token, {
        expires: cookiesExpiresDays,
      })
      Cookies.set("refresh_token", response.data.refresh_token, {
        expires: cookiesExpiresDays,
      })
    }
    dispatch(toggleIsAuthInProgress(false))
  } catch (e) {
    dispatch(toggleIsAuthInProgress(false))
    dispatch(toggleIsAuthFailed(true))
    console.log(e)
  }
}

export default orderReducer
