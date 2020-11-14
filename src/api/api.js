import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api-factory.simbirsoft1.com/api/',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    Authorization: 'Bearer 4cbcea96de',
  },
})

const orderAPI = {
  getCity() {
    return instance.get(`db/city/`)
  },
  getPoint() {
    return instance.get(`db/point/`)
  },
}

export default orderAPI
