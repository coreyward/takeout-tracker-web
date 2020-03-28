import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import Tags from "components/Tags"
import OpenStatusIndicator from "components/OpenStatusIndicator"
import hexToRgb from "lib/hexToRgb"

const RestaurantListItem = React.memo(
  ({ address, className, hours, name, onClick, openForBusiness, tags }) => {
    return (
      <div
        css={{
          color: theme.n70,
          fontSize: 12,
          cursor: "pointer",
          padding: 16,
          paddingBottom: 8,
          borderBottom: `1px solid ${theme.n20}`,
          transition: "background 250ms",
          opacity: openForBusiness ? 1 : 0.5,
          ":hover": {
            background: hexToRgb(theme.n20, 0.5),
          },
        }}
        onClick={onClick}
        className={className}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <h3
            css={{
              color: theme.n80,
              fontSize: 15,
              fontWeight: 500,
              marginRight: 16,
            }}
          >
            {name}
          </h3>
          <OpenStatusIndicator
            hours={openForBusiness && hours}
            css={{ marginRight: 8 }}
          />
        </div>

        {address && (
          <div css={{ fontSize: 12, marginBottom: 6, color: theme.n50 }}>
            {address.slice(0, address.indexOf(","))}
          </div>
        )}

        {tags && tags.length > 0 && <Tags tags={tags.slice(0, 4)} />}
      </div>
    )
  }
)

RestaurantListItem.displayName = "RestaurantListItem"

export default RestaurantListItem

RestaurantListItem.propTypes = {
  address: PropTypes.string,
  className: PropTypes.string,
  hours: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  openForBusiness: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}
