import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import RestaurantTile from "components/RestaurantTile"
import Checkbox from "components/Checkbox"

const filters = {
  limitTo: n => list => list.slice(0, n),
  hideClosed: list => list.filter(entry => !entry.closedForBusiness),
}

const applyFilters = (list, filters) =>
  filters.filter(x => x).reduce((results, filter) => filter(results), list)

const RestaurantsViewer = ({ restaurants }) => {
  const [includeClosed, setIncludeClosed] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const filteredRestaurants = applyFilters(restaurants, [
    !showAll && filters.limitTo(16),
    !includeClosed && filters.hideClosed,
  ])

  return (
    <>
      <h2 css={{ fontWeight: 500, marginBottom: 24, color: theme.n70 }}>
        Verified Restaurants
        <small css={{ color: theme.n50, marginLeft: 8 }}>
          ({restaurants.length})
        </small>
      </h2>

      <div css={{ marginBottom: 16 }}>
        <div
          css={{
            ...theme.smallcaps,
            color: theme.n40,
            fontSize: 10,
            marginBottom: 8,
          }}
        >
          Filters
        </div>

        <div css={{ display: "flex" }}>
          <Checkbox
            onChange={() => setIncludeClosed(prev => !prev)}
            checked={!includeClosed}
            css={{ color: theme.n40 }}
          >
            Offering Takeout/Delivery
          </Checkbox>
        </div>
      </div>

      <div
        css={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
          maxHeight: showAll ? "none" : 800,
          overflow: "hidden",
        }}
      >
        {filteredRestaurants.map(location => (
          <RestaurantTile key={location._id} {...location} />
        ))}

        {!showAll && (
          <div
            onClick={() => setShowAll(true)}
            css={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 500,
              cursor: "pointer",
              background: `linear-gradient(to bottom, transparent, ${theme.n10} 70%)`,
              color: theme.n70,
              padding: "160px 24px 80px",
              minHeight: 400,
              position: "absolute",
              bottom: 0,
              zIndex: 3,
              width: "100%",
              transition: "color 250ms",
              ":hover": {
                color: theme.n80,
              },
            }}
          >
            Show Full List
          </div>
        )}
      </div>
    </>
  )
}

export default RestaurantsViewer

RestaurantsViewer.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape(RestaurantTile.propTypes).isRequired
  ).isRequired,
}
