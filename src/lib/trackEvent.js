// Example:
// trackEvent("View Mode Changed", state.mpde)
export default (...args) => {
  const { category, action, label, value, options } = normalizeArguments(
    ...args
  )

  if (typeof window !== "undefined" && window.ga) {
    window.ga("send", "event", category, action, label, value, options)
  }

  if (process.env.NODE_ENV === "development") {
    console.log({
      category,
      action,
      label,
      value,
      options,
    })
  }
}

const normalizeArguments = (eventOrObject, label, value, options) => {
  if (typeof eventOrObject === "string") {
    const splitPoint = eventOrObject.lastIndexOf(" ")
    const category = eventOrObject.slice(0, splitPoint)
    const action = eventOrObject.slice(splitPoint + 1)

    return { category, action, label, value, options }
  }

  return eventOrObject
}
