export const getColorItems = (formik, carColors) => {
  return carColors.map((color) => {
    const colorItem = {}
    colorItem.label = color.charAt(0).toUpperCase() + color.slice(1)
    colorItem.value = color
    colorItem.checked = formik.values.color === color
    return colorItem
  })
}
