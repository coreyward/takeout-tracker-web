import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import { keyframes } from "@emotion/core"
import { useMediaQuery } from "@material-ui/core"
import ScrollLock from "react-scrolllock"
import PolicyInfo from "components/PolicyInfo"
import OrderInfo from "components/OrderInfo"
import SourcesList from "components/SourcesList"
import OpenStatusIndicator from "components/OpenStatusIndicator"
import Tags from "components/Tags"
import hexToRgb from "lib/hexToRgb"
import Icons from "lib/icons"

const ActiveListingPanel = ({ listing: currentListing, dispatch }) => {
  const mobile = useMediaQuery(theme.mobile)
  const prevListingRef = useRef(currentListing)

  useEffect(() => {
    setTimeout(() => {
      prevListingRef.current = currentListing
    }, 500)
  }, [currentListing])

  const animation = !currentListing && prevListingRef.current ? "out" : "in"
  const listing = currentListing || prevListingRef.current

  if (!listing) return null

  return (
    <ScrollLock isActive={mobile && currentListing}>
      <div
        css={{
          position: "absolute",
          top: 79,
          left: "calc(0.5 * var(--pagePadding))",
          padding: "var(--pagePadding)",
          paddingTop: 0,
          width: "var(--listWidth)",
          bottom: 0,
          background: theme.n10,
          zIndex: 3,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          transform: `translateX(${animation === "out" ? "-100%" : 0})`,
          opacity: animation === "out" ? 0 : 1,
          animation: `${slideAnimation[animation]} 250ms ease-out`,
          [theme.mobile]: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
          },
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px calc(0.5 * var(--pagePadding))",
            margin: "0 calc(-0.5 * var(--pagePadding)) var(--pagePadding)",
            position: "sticky",
            top: 0,
            borderRadius: 3,
            boxShadow: `0 2px 4px ${hexToRgb(theme.n10, 0.5)}`,
            background: hexToRgb("#17273A", 0.9),
            backdropFilter: "blur(3px)",
            zIndex: 4,
            [theme.mobile]: {
              padding: 12,
              margin: "0 calc(-1 * var(--pagePadding)) var(--pagePadding)",
              borderRadius: 0,
            },
          }}
        >
          <button
            css={{
              background: theme.n30,
              padding: 8,
              border: 0,
              borderRadius: 3,
              cursor: "pointer",
              transition: "background 250ms",
              ":hover": {
                background: theme.n20,
              },
              marginRight: 16,
              outline: 0,
            }}
            onClick={() => {
              dispatch({ action: "clearActiveListing" })
            }}
          >
            <Icons.LeftChevron css={{ display: "block", color: theme.n80 }} />
          </button>

          <h3
            css={{
              color: theme.n80,
              fontSize: 24,
              fontWeight: 500,
              [theme.mobile]: {
                fontSize: 18,
              },
            }}
          >
            {listing.name}
          </h3>

          <OpenStatusIndicator
            hours={listing.openForBusiness && listing.hours}
            css={{ marginLeft: 16, marginRight: 8 }}
          />
        </div>

        <ActiveRestaurantDetails {...listing} />
      </div>
    </ScrollLock>
  )
}

export default ActiveListingPanel

const ActiveRestaurantDetails = ({
  address,
  openForBusiness,
  confirmedAt,
  hours,
  menuUrl,
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
  alsoOffering,
}) => (
  <div css={{ fontSize: 14 }}>
    {unverified && (
      <div
        css={{
          display: "flex",
          alignItems: "center",
          marginTop: -8,
          marginBottom: 16,
          border: `1px solid ${hexToRgb("#887e4f", 0.5)}`,
          borderRadius: 3,
          padding: 16,
          lineHeight: 1.4,
          color: "#887e4f",
        }}
      >
        <Icons.Warning
          css={{
            marginRight: 24,
            flex: "0 0 16px",
            transform: "scale(1.5)",
            transformOrigin: "left center",
          }}
        />
        The information in this listing is user-reported only and has not been
        verified.
      </div>
    )}

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

    {tags && tags.length > 0 && <Tags tags={tags} css={{ marginTop: 16 }} />}

    {(sourceUrls?.length > 0 || sourceNotes) && (
      <div css={{ marginTop: 16 }}>
        <h4 css={{ ...theme.t4, color: theme.n40 }}>Sources</h4>
        <SourcesList urls={sourceUrls} notes={sourceNotes} />
      </div>
    )}
  </div>
)

ActiveRestaurantDetails.propTypes = {
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
    PropTypes.oneOf([
      "beer",
      "wine",
      "cocktails",
      "groceries",
      "merch",
      "coffee",
    ])
  ),
  unverified: PropTypes.bool,
  website: PropTypes.string,
}

ActiveListingPanel.propTypes = {
  listing: PropTypes.shape(ActiveRestaurantDetails.propTypes),
  dispatch: PropTypes.func.isRequired,
}

const slideAnimation = {
  hidden: {
    transform: "translateX(-100%)",
    opacity: 0,
  },
  visible: {
    transform: "translateX(0)",
    opacity: 1,
  },
}

slideAnimation.in = keyframes({
  from: slideAnimation.hidden,
  to: slideAnimation.visible,
})
slideAnimation.out = keyframes({
  from: slideAnimation.visible,
  to: slideAnimation.hidden,
})
