import React from "react"
import PropTypes from "prop-types"
import TimeAgo from "components/TimeAgo"
import theme from "styles/theme"
import Icons from "lib/icons"
import IconRow from "components/IconRow"
import IconButton from "components/IconButton"
import SourcesDropdown from "components/SourcesDropdown"

const RestaurantTile = ({
  closedForBusiness,
  confirmedAt,
  hours,
  menuUrl,
  name,
  orderingNotes,
  orderPhone,
  orderUrl,
  policyNotes,
  sourceNotes,
  sourceUrls,
  tags,
  takeoutOptions,
  website,
}) => {
  const diningModes = takeoutOptions
    .filter(opt => !deliveryOptions.includes(opt))
    .map(opt => serviceLabels[opt])
    .join(", ")

  const deliveryModes = takeoutOptions
    .filter(opt => deliveryOptions.includes(opt))
    .map(opt => serviceLabels[opt])
    .join(" or ")

  return (
    <div
      css={{
        position: "relative",
        background: closedForBusiness ? "#122031" : theme.n20,
        color: theme.n70,
        padding: 24,
        borderRadius: 3,
        fontSize: 12,
        opacity: closedForBusiness ? 0.75 : 1,
      }}
    >
      <h3
        css={{
          color: theme.n80,
          fontSize: 16,
          fontWeight: 500,
          marginRight: 36,
          marginBottom: 16,
        }}
      >
        {name}
      </h3>

      <SourcesDropdown urls={sourceUrls} notes={sourceNotes} />

      <div css={{ marginBottom: 16 }}>
        <IconRow icon={Icons.CheckCircle}>
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

      {!closedForBusiness && (
        <div>
          <h4
            css={{
              fontWeight: 700,
              color: theme.n40,
              letterSpacing: "0.135em",
              textTransform: "uppercase",
              marginBottom: 8,
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
          {orderingNotes && (
            <IconRow icon={Icons.Info}>{orderingNotes}</IconRow>
          )}
        </div>
      )}

      {tags && tags.length > 0 && (
        <div css={{ display: "flex", marginTop: 16, flexWrap: "wrap" }}>
          {tags.map(tag => (
            <div
              key={tag}
              css={{
                marginRight: 8,
                marginBottom: 8,
                padding: "4px 6px",
                background: "rgba(67, 87, 112, 0.35)",
                borderRadius: 5,
                fontSize: 10,
                textTransform: "lowercase",
              }}
            >
              <Icons.Tag css={{ marginRight: 4 }} /> {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RestaurantTile

RestaurantTile.propTypes = {
  closedForBusiness: PropTypes.bool.isRequired,
  confirmedAt: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.string),
  menuUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  orderingNotes: PropTypes.string,
  orderPhone: PropTypes.string,
  orderUrl: PropTypes.string,
  policyNotes: PropTypes.string,
  sourceNotes: PropTypes.string,
  sourceUrls: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  takeoutOptions: PropTypes.arrayOf(
    PropTypes.oneOf([
      "dine-in",
      "takeout",
      "curbside",
      "delivery",
      "delivery-favor",
      "delivery-doordash",
      "delivery-postmates",
      "delivery-grubhub",
      "delivery-ubereats",
    ])
  ),
  website: PropTypes.string,
}

const serviceLabels = {
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

const deliveryOptions = [
  "delivery",
  "delivery-favor",
  "delivery-doordash",
  "delivery-postmates",
  "delivery-grubhub",
  "delivery-ubereats",
]
