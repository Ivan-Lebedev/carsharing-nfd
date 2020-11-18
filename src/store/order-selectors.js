export const getCities = (state) => {
  const listOfCities = []
  state.order.cities.map((city) => listOfCities.push(city.name))
  return listOfCities
}

export const getPoints = (state) => state.order.points

export const getCars = (state) => state.order.cars
