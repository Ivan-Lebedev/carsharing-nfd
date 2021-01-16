import { thumbnailURL } from "../../../constants/urls"

export const getColorItems = (formik, carColors) => {
  return carColors.map((color) => {
    return {
      label: color.charAt(0).toUpperCase() + color.slice(1),
      value: color,
      checked: formik.values.color === color,
    }
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
    return { key: car, value: car }
  })
}

export const getAdminCarTypes = (cars) => {
  return cars
    .map((car) => {
      return { key: car.categoryId.name, value: car.categoryId.id }
    })
    .reduce((carTypes, carItem) => {
      if (!carTypes.find((item) => item.value === carItem.value)) {
        carTypes.push(carItem)
      }
      return carTypes
    }, [])
}

export const getAdminOrdersCarImg = (order) => {
  return order.carId?.thumbnail?.path.includes("base64")
    ? order.carId?.thumbnail?.path
    : `${thumbnailURL}${order.carId?.thumbnail?.path}`
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
    return { key: option.name, value: option.id }
  })
}

export const getAdminOrderCurrentModel = (carData) => ({
  key: carData.name,
  value: carData.id,
})

export const getAdminSettingsCarImg = (data) => {
  if (!data.path) {
    return data
  }
  return data.path?.includes("base64")
    ? data.path
    : `${thumbnailURL}${data.path}`
}

export const getAdminCarSettingsColorItems = (carColors) => {
  return carColors.map((color) => {
    return {
      label: color.charAt(0).toUpperCase() + color.slice(1),
      value: color,
      checked: true,
    }
  })
}

export const getAdminOrderColors = (colors) => {
  return colors.map((color) => {
    return { key: color.charAt(0).toUpperCase() + color.slice(1), value: color }
  })
}

export const getAdminOrderSettingsPoints = (points) =>
  points.map((item) => ({ key: item.address, value: item.id }))
