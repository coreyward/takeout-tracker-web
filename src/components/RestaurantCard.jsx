import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import Tags from "components/Tags"
import SourcesList from "components/SourcesList"
import StatusIcons from "components/StatusIcons"
import useOnClickOutside from "hooks/useOnClickOutside"
import OrderInfo from "components/OrderInfo"
import PolicyInfo, { deliveryOptions } from "components/PolicyInfo"
import OpenStatusIndicator from "components/OpenStatusIndicator"

const RestaurantCard = ({
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
}) => {
  const [open, setOpen] = useState(false)

  const ref = useOnClickOutside(() => {
    setOpen(false)
  }, open)

  return (
    <div
      ref={ref}
      css={{
        position: "relative",
        background: closedForBusiness ? "#122031" : theme.n20,
        color: theme.n70,
        borderRadius: 3,
        fontSize: 12,
        transition: "border-radius 250ms",
        zIndex: open && 2,
        outline: open && `8px solid #0E1C2C`,
        display: "flex",
      }}
    >
      <div
        css={{
          width: "100%",
          padding: 16,
          paddingBottom: 8, // adjust for margin-bottom on tags
          cursor: "pointer",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onClick={() => {
          setOpen(prev => !prev)
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
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
            <OpenStatusIndicator hours={hours} />
          </h3>

          <StatusIcons
            closedForBusiness={closedForBusiness}
            offersDelivery={
              !!(
                takeoutOptions &&
                takeoutOptions.find(x => deliveryOptions.includes(x))
              )
            }
            acceptsOnlineOrders={!!orderUrl}
            acceptsPhoneOrders={!!orderPhone}
            userReported={unverified}
            css={{ marginTop: 2, color: theme.n40 }}
          />
        </div>

        {tags && tags.length > 0 && <Tags tags={tags} />}
      </div>

      {open && (
        <div
          css={{
            position: "absolute",
            left: -8,
            right: -8,
            top: "100%",
            background: "#0E1C2C",
            padding: 16,
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            borderRadius: "0 0 5px 5px",
          }}
        >
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

          {(sourceUrls?.length > 0 || sourceNotes || unverified) && (
            <div css={{ marginTop: 16 }}>
              <h4 css={{ ...theme.t4, color: theme.n40 }}>Sources</h4>
              <SourcesList
                urls={sourceUrls}
                notes={
                  unverified ? (
                    <div>
                      {sourceNotes} Includes user-reported data (unverified).
                    </div>
                  ) : (
                    sourceNotes
                  )
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RestaurantCard

RestaurantCard.propTypes = {
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
