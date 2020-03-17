import React from "react"
import PropTypes from "prop-types"
import TimeAgo from "components/TimeAgo"
import theme from "styles/theme"
import icons from "lib/icons"

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
          marginBottom: 16,
        }}
      >
        {name}
      </h3>

      <div css={{ marginBottom: 16 }}>
        <IconRow icon={icons.checkCircle}>
          as of <TimeAgo time={confirmedAt} />
        </IconRow>
        {closedForBusiness ? (
          <IconRow icon={icons.clock}>
            <strong>Closed Temporarily</strong>
          </IconRow>
        ) : (
          <>
            {hours && hours.length > 0 && (
              <IconRow icon={icons.clock}>
                {hours.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </IconRow>
            )}
            <IconRow icon={icons.dining}>
              {diningModes.length > 0 ? diningModes : "No information"}
            </IconRow>
            <IconRow icon={icons.delivery}>
              {deliveryModes.length > 0 ? deliveryModes : "No delivery"}
            </IconRow>
          </>
        )}

        {policyNotes && policyNotes.length > 0 && (
          <IconRow icon={icons.info}>{policyNotes}</IconRow>
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
              <IconButton icon={icons.menu} href={menuUrl}>
                Menu
              </IconButton>
            )}
            {website && (
              <IconButton icon={icons.website} href={website}>
                Website
              </IconButton>
            )}
            {orderUrl && (
              <IconButton icon={icons.cart} href={orderUrl}>
                Order Online
              </IconButton>
            )}
            {orderPhone && (
              <IconButton
                icon={icons.phone}
                href={`tel:${orderPhone.replace(/[^0-9]/g, "")}`}
              >
                {orderPhone}
              </IconButton>
            )}
          </div>
          {orderingNotes && <IconRow icon={icons.pin}>{orderingNotes}</IconRow>}
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

const IconRow = ({ icon: Icon, children, className }) => (
  <div css={{ display: "flex", marginBottom: 8 }} className={className}>
    <Icon css={{ color: theme.n50, marginRight: 8, flex: "0 0 16px" }} />
    <div>{children}</div>
  </div>
)

IconRow.propTypes = {
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

const IconButton = ({ icon: Icon, href, children, className }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : "_self"}
    rel="noopener noreferrer"
    css={{
      display: "inline-flex",
      marginBottom: 8,
      textDecoration: "none",
      whiteSpace: "nowrap",
      alignItems: "center",
      marginRight: 16,
    }}
    className={className}
  >
    <Icon css={{ color: theme.n50, marginRight: 8, flex: "0 0 16px" }} />
    <div css={{ fontWeight: 500, color: theme.n80 }}>{children}</div>
  </a>
)

IconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
