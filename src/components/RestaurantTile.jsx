import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import Icons from "lib/icons"
import IconRow from "components/IconRow"
import SourcesDropdown from "components/SourcesDropdown"
import Tags from "components/Tags"
import OrderInfo from "components/OrderInfo"
import PolicyInfo from "components/PolicyInfo"
import OpenStatusIndicator from "components/OpenStatusIndicator"

const RestaurantTile = React.memo(
  ({
    address,
    alsoOffering,
    openForBusiness,
    confirmedAt,
    hours,
    menuUrl,
    name,
    orderingNotes,
    orderPhone,
    orderUrl,
    instagramHandle,
    policyNotes,
    sourceNotes,
    sourceUrls,
    tags,
    takeoutOptions,
    unverified,
    website,
  }) => (
    <div
      css={{
        position: "relative",
        background: openForBusiness ? theme.n20 : "#122031",
        color: theme.n70,
        padding: 24,
        borderRadius: 3,
        fontSize: 12,
        opacity: openForBusiness ? 1 : 0.75,
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
        <OpenStatusIndicator hours={openForBusiness && hours} />
      </h3>

      <SourcesDropdown
        urls={sourceUrls}
        notes={sourceNotes}
        css={{ position: "absolute", left: 8, right: 8, top: 14 }}
      />

      <PolicyInfo
        css={{ marginBottom: 16 }}
        openForBusiness={openForBusiness}
        confirmedAt={confirmedAt}
        website={website}
        instagramHandle={instagramHandle}
        hours={hours}
        takeoutOptions={takeoutOptions}
        policyNotes={policyNotes}
        alsoOffering={alsoOffering}
      />

      {openForBusiness && (
        <OrderInfo
          address={address}
          menuUrl={menuUrl}
          orderUrl={orderUrl}
          orderPhone={orderPhone}
          orderingNotes={orderingNotes}
        />
      )}

      {unverified && (
        <IconRow icon={Icons.Info}>
          Includes user-reported data (unverified)
        </IconRow>
      )}

      {tags && tags.length > 0 && <Tags tags={tags} css={{ marginTop: 16 }} />}
    </div>
  )
)

RestaurantTile.displayName = "RestaurantTile"

export default RestaurantTile

RestaurantTile.propTypes = {
  address: PropTypes.string,
  openForBusiness: PropTypes.bool.isRequired,
  confirmedAt: PropTypes.string.isRequired,
  hours: PropTypes.arrayOf(PropTypes.string),
  menuUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  orderingNotes: PropTypes.string,
  orderPhone: PropTypes.string,
  orderUrl: PropTypes.string,
  instagramHandle: PropTypes.string,
  policyNotes: PropTypes.string,
  sourceNotes: PropTypes.string,
  sourceUrls: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  takeoutOptions: PropTypes.arrayOf(
    PropTypes.oneOf([
      "dine-in",
      "patio-dining",
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
  alsoOffering: PropTypes.arrayOf(
    PropTypes.oneOf(["beer", "wine", "cocktails", "groceries", "merch"])
  ),
  unverified: PropTypes.bool,
  website: PropTypes.string,
}
