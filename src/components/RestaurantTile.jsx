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
    unverified,
    website,
  }) => (
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
        <OpenStatusIndicator hours={closedForBusiness ? [] : hours} />
      </h3>

      <SourcesDropdown
        urls={sourceUrls}
        notes={sourceNotes}
        css={{ position: "absolute", left: 8, right: 8, top: 14 }}
      />

      <PolicyInfo
        css={{ marginBottom: 16 }}
        closedForBusiness={closedForBusiness}
        confirmedAt={confirmedAt}
        hours={hours}
        takeoutOptions={takeoutOptions}
        policyNotes={policyNotes}
      />

      {!closedForBusiness && (
        <OrderInfo
          menuUrl={menuUrl}
          website={website}
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
  unverified: PropTypes.bool,
  website: PropTypes.string,
}
