import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"

const IconRow = ({ icon: Icon, controlledIcon, children, className }) => (
  <div css={{ display: "flex", marginBottom: 8 }} className={className}>
    {controlledIcon || (
      <Icon css={{ color: theme.n50, marginRight: 8, flex: "0 0 16px" }} />
    )}
    <div>{children}</div>
  </div>
)

export default IconRow

IconRow.propTypes = {
  icon: PropTypes.func.isRequired,
  controlledIcon: PropTypes.object,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
