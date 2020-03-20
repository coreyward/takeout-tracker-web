import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import IconRow from "components/IconRow"
import Icons from "lib/icons"
import TimeAgo from "components/TimeAgo"
import theme from "styles/theme"

const PolicyInfo = ({
  closedForBusiness,
  confirmedAt,
  hours,
  takeoutOptions,
  policyNotes,
  className,
}) => {
  const diningModes = takeoutOptions
    .filter(opt => !deliveryOptions.includes(opt))
    .map(opt => serviceLabels[opt])
    .join(", ")

  const deliveryModes = takeoutOptions
    .filter(opt => deliveryOptions.includes(opt))
    .map(opt => serviceLabels[opt])
    .join(" or ")

  const hoursAgo = Math.abs(moment(confirmedAt).diff(moment(), "hours"))
  const [iconColor] = Object.entries(stalenessColors)
    .reverse()
    .find(([_c, cutoff]) => hoursAgo >= cutoff)

  return (
    <div className={className}>
      <IconRow icon={Icons.CheckCircle} iconColor={iconColor}>
        as of <TimeAgo time={confirmedAt} />
      </IconRow>
      {closedForBusiness ? (
        <IconRow icon={Icons.Clock}>
          <strong>Closed Temporarily</strong>
        </IconRow>
      ) : (
        <>
          {hours && hours.length > 0 && (
            <IconRow icon={Icons.Clock}>
              {hours.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </IconRow>
          )}
          <IconRow icon={Icons.Dining}>
            {diningModes.length > 0 ? diningModes : "No information"}
          </IconRow>
          <IconRow icon={Icons.Delivery}>
            {deliveryModes.length > 0 ? deliveryModes : "No delivery"}
          </IconRow>
        </>
      )}

      {policyNotes && policyNotes.length > 0 && (
        <IconRow icon={Icons.Info}>{policyNotes}</IconRow>
      )}
    </div>
  )
}

export default PolicyInfo

PolicyInfo.propTypes = {
  closedForBusiness: PropTypes.bool,
  confirmedAt: PropTypes.string,
  hours: PropTypes.arrayOf(PropTypes.string),
  takeoutOptions: PropTypes.arrayOf(PropTypes.string),
  policyNotes: PropTypes.string,
  className: PropTypes.string,
}

const stalenessColors = {
  [theme.green]: 0,
  inherit: 30,
  "#D3AD4B": 48,
  "#D14C5C": 72,
}

export const serviceLabels = {
  "dine-in": "Dine-In",
  takeout: "Takeout",
  curbside: "Curbside Takeout",
  delivery: "By Restaurant",
  "delivery-favor": "Favor",
  "delivery-doordash": "DoorDash",
  "delivery-postmates": "Postmates",
  "delivery-grubhub": "GrubHub",
  "delivery-ubereats": "UberEats",
}

export const deliveryOptions = [
  "delivery",
  "delivery-favor",
  "delivery-doordash",
  "delivery-postmates",
  "delivery-grubhub",
  "delivery-ubereats",
]
