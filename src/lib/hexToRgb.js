export default (hex, alpha) => {
  const color = +("0x" + hex.slice(1).replace(hex.length < 5 && /./g, "$&$&"))
  const r = color >> 16
  const g = (color >> 8) & 255
  const b = color & 255

  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`
}
