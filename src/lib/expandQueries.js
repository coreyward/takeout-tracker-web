const leftZip = (left, right) =>
  left.reduce((output, value, index) => {
    output[right[index]] = value
    return output
  }, {})

const expandQueries = function recurse(styles, mediaQueries) {
  const { root = {}, ...rest } = Object.entries(styles).reduce(
    (output, [property, values]) => {
      if (Array.isArray(values)) {
        Object.entries(leftZip(values, mediaQueries)).forEach(
          ([query, value]) => {
            output[query] = output[query] || {}
            output[query][property] = value
          }
        )
      } else if (typeof values === "object") {
        output[property] = {
          ...(output[property] || {}),
          ...recurse(values, mediaQueries),
        }
      } else {
        output[property] = values
      }

      return output
    },
    {}
  )

  return { ...root, ...rest }
}

export default expandQueries
