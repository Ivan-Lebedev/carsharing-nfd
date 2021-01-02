import axios from "axios"

const instance = axios.create({
  baseURL: "http://api-factory.simbirsoft1.com/api/",
  // "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/",
  headers: {
    "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
    Authorization: "Bearer 4cbcea96de",
  },
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
    return instance.post(`auth/login`, orderBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicToken}`,
      },
    })
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
    return instance.get(reqUrl, {
      headers: {
        Authorization: `Bearer ${basicToken}`,
      },
    })
  },
}

export default orderAPI
