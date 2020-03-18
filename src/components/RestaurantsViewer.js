import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import RestaurantTile from "components/RestaurantTile"
import Checkbox from "components/Checkbox"

const RestaurantsViewer = ({ restaurants }) => {
  const [showAll, setShowAll] = useState(false)

  const filteredRestaurants = showAll
    ? restaurants
    : restaurants.filter(location => !location.closedForBusiness)

  return (
    <>
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
            onChange={() => setShowAll(prev => !prev)}
            checked={!showAll}
            css={{ color: theme.n40 }}
          >
            Only Show Open Restaurants
          </Checkbox>
        </div>
      </div>

      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, auto))",
          gap: 24,
        }}
      >
        {filteredRestaurants.map(location => (
          <RestaurantTile key={location._id} {...location} />
        ))}
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
