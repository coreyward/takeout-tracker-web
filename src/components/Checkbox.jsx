import React from "react"
import PropTypes from "prop-types"

const Tick = () => (
  <svg width="10" height="9">
    <path
      fill="currentColor"
      d="M9.46.19a1.04 1.04 0 00-1.44.25L4.07 6.08 1.48 4.31A.95.95 0 10.41 5.88l3.47 2.37a.94.94 0 00.74.14 1.04 1.04 0 00.67-.43l4.43-6.33A1.04 1.04 0 009.46.2"
    />
  </svg>
)

const Checkbox = ({ children, className, ...props }) => (
  <label
    css={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      userSelect: "none",
    }}
    className={className}
  >
    <input
      type="checkbox"
      tabIndex="0"
      css={{
        position: "absolute",
        left: -100,
        width: 0,
        height: 0,
        opacity: 0,
        overflow: "hidden",
        ":focus": {
          "& + .checkbox-indicator": {
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
          },
        },
      }}
      {...props}
    />

    <div
      css={{
        width: 16,
        height: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        border: `2px solid currentColor`,
        borderRadius: 2,
      }}
      className="checkbox-indicator"
    >
      {props.checked && <Tick />}
    </div>

    <span css={{ fontSize: 12, fontWeight: 500 }}>{children}</span>
  </label>
)

export default Checkbox

Checkbox.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
}
