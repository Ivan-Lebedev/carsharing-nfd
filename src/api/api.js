import axios from "axios"
import {
  actionsHeaders,
  defaultHeaders,
  getHeaders,
  authHeaders,
} from "../constants/apiHeaders"
import { baseURL } from "../constants/urls"

const instance = axios.create({
  baseURL,
  headers: defaultHeaders,
})

const orderAPI = {
  getCity() {
    return instance.get(`db/city/`)
  },
  getPoint() {
    return instance.get(`db/point/`)
  },
  getCar() {
    return instance.get(`db/car/`)
  },
  getCarById(carId) {
    return instance.get(`db/car/${carId}`)
  },
  getCategory(categoryId) {
    if (!categoryId) {
      categoryId = ""
    }
    return instance.get(`db/category/${categoryId}`)
  },
  postOrder(orderBody) {
    return instance.post(`db/order/`, orderBody)
  },
  getOrder(orderId) {
    return instance.get(`db/order/${orderId}`)
  },
  getOrderStatuses() {
    return instance.get(`db/orderStatus/`)
  },
  postLogIn(orderBody, basicToken) {
    return instance.post(`auth/login`, orderBody, authHeaders(basicToken))
  },
  getCarsPage(currentPage = 0, pageSize = 5, filters) {
    const { model, type } = filters
    let reqUrl = `db/car?page=${currentPage}&limit=${pageSize}`

    if (model) {
      reqUrl += `&name[$regex]=.*${model}.*`
    }
    if (type) {
      reqUrl += `&categoryId=${type}`
    }
    return instance.get(reqUrl)
  },
  getAdminOrders(currentPage = 0, pageSize = 5, basicToken, filters) {
    let reqUrl = `db/order?page=${currentPage}&limit=${pageSize}`
    const { period, model, city, status } = filters
    if (period) {
      let periodUrl = "&createdAt[$gt]="
      const now = new Date()
      switch (period) {
        case "year":
          periodUrl += now.setFullYear(now.getFullYear() - 1)
          break
        case "month":
          periodUrl += now.setMonth(now.getMonth() - 1)
          break
        case "week":
          periodUrl += now.setDate(now.getDate() - 7)
          break
        case "day":
          periodUrl += now.setDate(now.getDate() - 1)
          break
        default:
          periodUrl = ""
          break
      }
      reqUrl += periodUrl
    }
    if (model) {
      reqUrl += `&carId=${model}`
    }
    if (city) {
      reqUrl += `&cityId=${city}`
    }
    if (status) {
      reqUrl += `&orderStatusId=${status}`
    }
    return instance.get(reqUrl, getHeaders(basicToken))
  },
  putNewOrderData(orderBody, basicToken, orderId) {
    return instance.put(
      `db/order/${orderId}`,
      orderBody,
      actionsHeaders(basicToken),
    )
  },
  deleteOrderData(basicToken, orderId) {
    return instance.delete(`db/order/${orderId}`, actionsHeaders(basicToken))
  },
  postNewCar(carBody, basicToken) {
    return instance.post(`db/car/`, carBody, actionsHeaders(basicToken))
  },
  putNewCarData(carBody, basicToken, carId) {
    return instance.put(`db/car/${carId}`, carBody, actionsHeaders(basicToken))
  },
  deleteCarData(basicToken, carId) {
    return instance.delete(`db/car/${carId}`, actionsHeaders(basicToken))
  },
  putNewCategoryData(categoryBody, basicToken, categoryId) {
    return instance.put(
      `db/category/${categoryId}`,
      categoryBody,
      actionsHeaders(basicToken),
    )
  },
  deleteCategoryData(basicToken, categoryId) {
    return instance.delete(
      `db/category/${categoryId}`,
      actionsHeaders(basicToken),
    )
  },
  postNewCategory(categoryBody, basicToken) {
    return instance.post(
      `db/category/`,
      categoryBody,
      actionsHeaders(basicToken),
    )
  },
}

export default orderAPI
