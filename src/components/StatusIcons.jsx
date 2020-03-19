import React from "react"
import PropTypes from "prop-types"
import Icons from "lib/icons"

const StatusIcons = ({
  offersDelivery,
  acceptsOnlineOrders,
  acceptsPhoneOrders,
  closedForBusiness,
  className,
}) => (
  <div css={{ display: "flex", svg: { marginLeft: 8 } }} className={className}>
    {closedForBusiness ? (
      <Icons.Closed />
    ) : (
      <>
        {offersDelivery && <Icons.Delivery />}
        {acceptsOnlineOrders && <Icons.Cart />}
        {acceptsPhoneOrders && <Icons.Phone />}
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
