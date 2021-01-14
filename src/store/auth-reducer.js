import Cookies from "js-cookie"
import orderAPI from "../api/api"

const TOGGLE_IS_AUTH_IN_PROGRESS = "TOGGLE_IS_AUTH_IN_PROGRESS"
const TOGGLE_IS_AUTH_FAILED = "TOGGLE_IS_AUTH_FAILED"

const initialState = {
  isAuthInProgress: false,
  isAuthFailed: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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

export const toggleIsAuthInProgress = (isAuthInProgress) => ({
  type: TOGGLE_IS_AUTH_IN_PROGRESS,
  payload: isAuthInProgress,
})

export const toggleIsAuthFailed = (isAuthFailed) => ({
  type: TOGGLE_IS_AUTH_FAILED,
  payload: isAuthFailed,
})

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

export default authReducer
