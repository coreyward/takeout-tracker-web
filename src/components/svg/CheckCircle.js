import React from "react"
import PropTypes from "prop-types"

export const CheckCircle = ({ fill = "#4BD37B" }) => (
  <svg
    width="16"
    height="16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    css={{ marginRight: 8, flex: "0 0 16px" }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5 8a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0zm-9.25.9l5.25-5.4 1.75 1.8-7 7.2-3.5-3.6L4.5 7.1l1.75 1.8z"
      fill={fill}
    />
  </svg>
)

CheckCircle.propTypes = {
  fill: PropTypes.string,
}
