import React from "react"
import PropTypes from "prop-types"
import Tooltip from "@material-ui/core/Tooltip"
import Icons from "lib/icons"

const StatusIcons = ({
  offersDelivery,
  acceptsOnlineOrders,
  acceptsPhoneOrders,
  closedForBusiness,
  className,
}) => (
  <div css={{ display: "flex" }} className={className}>
    {closedForBusiness ? (
      <Indicator tip="Temporarily Closed" icon={Icons.Closed} />
    ) : (
      <>
        {offersDelivery && (
          <Indicator tip="Delivery Available" icon={Icons.Delivery} />
        )}
        {acceptsOnlineOrders && (
          <Indicator tip="Order Online" icon={Icons.Cart} />
        )}
        {acceptsPhoneOrders && (
          <Indicator tip="Order by Phone" icon={Icons.Phone} />
        )}
      </>
    )}
  </div>
)

export default StatusIcons

StatusIcons.propTypes = {
  offersDelivery: PropTypes.bool,
  acceptsOnlineOrders: PropTypes.bool,
  acceptsPhoneOrders: PropTypes.bool,
  closedForBusiness: PropTypes.bool,
  className: PropTypes.string,
}

const Indicator = ({ tip, icon: Icon }) => (
  <Tooltip title={tip} arrow placement="top">
    <div css={{ marginLeft: 8 }}>
      <Icon />
    </div>
  </Tooltip>
)

Indicator.propTypes = {
  tip: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
}
