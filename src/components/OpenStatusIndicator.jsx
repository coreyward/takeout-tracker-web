import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { hoursCover } from "lib/parseHours"
import theme from "styles/theme"
import { Tooltip } from "@material-ui/core"

const colors = {
  open: theme.green,
  closed: "#D14C5C",
}

const OpenStatusIndicator = ({ hours, className }) => {
  const [open, setOpen] = useState()

  useEffect(() => {
    // Don't show status for unrecognizable hours strings
    if (!hours.some(hrs => /\d/.test(hrs))) return

    const refreshStatus = () => setOpen(hoursCover(hours))

    // Initial state
    refreshStatus()

    const timer = window.setInterval(
      refreshStatus,
      5 * 60 * 1000 + Math.round(Math.random() * 500)
    )

    return () => {
      window.clearTimeout(timer)
    }
  }, [hours])

  if (typeof open === "undefined") return null

  const indicatorColor = open ? colors.open : colors.closed

  return (
    <Tooltip
      title={open ? "Open Now" : "Currently Closed"}
      arrow
      placement="top"
    >
      <div
        css={{
          display: "inline-block",
          verticalAlign: "middle",
          marginLeft: "0.5em",
          width: 5,
          height: 5,
          background: indicatorColor,
          boxShadow: `0px 0px 4px ${indicatorColor}`,
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
