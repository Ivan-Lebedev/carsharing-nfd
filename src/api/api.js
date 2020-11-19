import axios from 'axios'

const instance = axios.create({
  // prod url
  baseURL: 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/',
  // dev url
  // baseURL: 'http://api-factory.simbirsoft1.com/api/',
  headers: {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    Authorization: 'Bearer 4cbcea96de',
  },
})

const orderAPI = {
  getCity() {
    return instance.get('db/city/')
  },
  getPoint() {
    return instance.get('db/point/')
  },
  getCar() {
    return instance.get(`db/car/`)
  },
}

export default orderAPI