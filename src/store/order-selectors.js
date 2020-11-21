export const getListOfCities = (state) => {
  const listOfCities = []
  state.order.cities.map((city) => listOfCities.push(city.name))
  return listOfCities
}

export const getCities = (state) => state.order.cities

export const getPoints = (state) => state.order.points

export const getCars = (state) => state.order.cars

export const isCarsFetching = (state) => state.order.carsFetching
