import React from "react"
import PropTypes from "prop-types"
import Icons from "lib/icons"
import theme from "styles/theme"
import IconButton from "components/IconButton"
import IconRow from "components/IconRow"

const OrderInfo = ({ address, menuUrl, orderUrl, orderPhone, orderingNotes }) =>
  [menuUrl, orderUrl, orderPhone, orderingNotes].some(x => x) && (
    <div>
      <h4
        css={{
          ...theme.t4,
          color: theme.n40,
        }}
      >
        Menu / Order
      </h4>

      <div>
        {menuUrl && (
          <IconButton icon={Icons.Menu} href={menuUrl}>
            Menu
          </IconButton>
        )}
        {orderUrl && (
          <IconButton icon={Icons.Cart} href={orderUrl}>
            Order Online
          </IconButton>
        )}
        {orderPhone && (
          <IconButton
            icon={Icons.Phone}
            href={`tel:${orderPhone.replace(/[^0-9]/g, "")}`}
          >
            {orderPhone}
          </IconButton>
        )}
      </div>
      {address && <IconRow icon={Icons.MapMarker}>{address}</IconRow>}
      {orderingNotes && <IconRow icon={Icons.Info}>{orderingNotes}</IconRow>}
    </div>
  )

export default OrderInfo

OrderInfo.propTypes = {
  address: PropTypes.string,
  menuUrl: PropTypes.string,
  orderUrl: PropTypes.string,
  orderPhone: PropTypes.string,
  orderingNotes: PropTypes.node,
}
