import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

const TimeAgo = ({ time }) => {
  const formattedTime =
    moment(time).diff(moment().startOf("day")) < 0
      ? moment(time)
          .calendar()
          .replace("Last", "last")
          .replace("Today", "today")
          .replace("Yesterday", "yesterday")
      : moment(time).fromNow()

  return <time dateTime={time}>{formattedTime}</time>
}

export default TimeAgo

TimeAgo.propTypes = {
  time: PropTypes.string.isRequired,
}
