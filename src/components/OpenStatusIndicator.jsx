import React from "react"
import PropTypes from "prop-types"
import { hoursCover } from "lib/parseHours"
import theme from "styles/theme"
import { Tooltip } from "@material-ui/core"

const colors = {
  open: theme.green,
  closed: "#D14C5C",
}

const OpenStatusIndicator = ({ hours, className }) => {
  // Don't show status for unrecognizable hours strings
  if (!hours.some(hrs => /\d/.test(hrs))) return null
  const open = hoursCover(hours)

  return (
    <Tooltip
      title={open ? "Open Now" : "Currently Closed"}
      arrow
      placement="top"
    >
      <div
        css={{
          "--indicatorColor": open ? colors.open : colors.closed,
          display: "inline-block",
          verticalAlign: "middle",
          marginLeft: "0.5em",
          width: 5,
          height: 5,
          background: "var(--indicatorColor)",
          boxShadow: "0px 0px 4px var(--indicatorColor)",
          borderRadius: 3,
        }}
        className={className}
      />
    </Tooltip>
  )
}

export default OpenStatusIndicator

OpenStatusIndicator.propTypes = {
  hours: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
}
