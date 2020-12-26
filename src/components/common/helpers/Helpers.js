export const getColorItems = (formik, carColors) => {
  return carColors.map((color) => {
    const colorItem = {}
    colorItem.label = color.charAt(0).toUpperCase() + color.slice(1)
    colorItem.value = color
    colorItem.checked = formik.values.color === color
    return colorItem
  })
}

export const getAdminTableColors = (colors) => {
  return colors
    .map((color) => color.charAt(0).toUpperCase() + color.slice(1))
    .join(", ")
}

export const getAdminCarNames = (cars) => {
  return [
    ...new Set(cars.map((car) => car.name.slice(0, car.name.search(/,|\s/)))),
  ].map((car) => {
    const carItem = {}
    carItem.key = car
    carItem.value = car
    return carItem
  })
}

export const getAdminCarTypes = (cars) => {
  return cars
    .map((car) => {
      const carItem = {}
      carItem.key = car.categoryId.name
      carItem.value = car.categoryId.id
      return carItem
    })
    .reduce((carTypes, carItem) => {
      if (!carTypes.find((item) => item.value === carItem.value)) {
        carTypes.push(carItem)
      }
      return carTypes
    }, [])
}

export const getAdminCarImg = (order) => {
  return order.carId?.thumbnail?.path.includes("base64")
    ? order.carId?.thumbnail?.path
    : `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${order.carId?.thumbnail?.path}`
}

const getZeros = (number) => (number < 10 ? `0${number}` : number)

export const getAdminOrdersDate = (date) => {
  const newDate = new Date(date)
  return `${getZeros(newDate.getDate())}.${getZeros(
    newDate.getMonth() + 1,
  )}.${newDate.getFullYear()} ${getZeros(newDate.getHours())}:00`
}

export const getAdminOrdersAllOptions = (options) => {
  return options.map((option) => {
    const optionItem = {}
    optionItem.key = option.name
    optionItem.value = option.id
    return optionItem
  })
}
