import React from "react"
import PropTypes from "prop-types"
import Icons from "lib/icons"
import theme from "styles/theme"
import IconButton from "components/IconButton"
import IconRow from "components/IconRow"

const OrderInfo = ({ menuUrl, website, orderUrl, orderPhone, orderingNotes }) =>
  [menuUrl, website, orderUrl, orderPhone, orderingNotes].some(x => x) && (
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
        {website && (
          <IconButton icon={Icons.Website} href={website}>
            Website
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
      {orderingNotes && <IconRow icon={Icons.Info}>{orderingNotes}</IconRow>}
    </div>
  )

export default OrderInfo

OrderInfo.propTypes = {
  menuUrl: PropTypes.string,
  website: PropTypes.string,
  orderUrl: PropTypes.string,
  orderPhone: PropTypes.string,
  orderingNotes: PropTypes.node,
}
