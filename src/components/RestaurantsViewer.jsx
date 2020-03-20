import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import RestaurantTile from "components/RestaurantTile"
import Checkbox from "components/Checkbox"
import RestaurantCard from "components/RestaurantCard"
import ModeSelector, { MODES } from "components/ModeSelector"

const filters = {
  limitTo: n => list => list.slice(0, n),
  hideClosed: list => list.filter(entry => !entry.closedForBusiness),
}

const applyFilters = (list, filters) =>
  filters.filter(x => x).reduce((results, filter) => filter(results), list)

const RestaurantsViewer = ({ restaurants }) => {
  const [includeClosed, setIncludeClosed] = useState(false)
  const [mode, setMode] = useState(MODES.CARD)

  const filteredRestaurants = applyFilters(restaurants, [
    !includeClosed && filters.hideClosed,
  ])

  const RestaurantComponent =
    mode === MODES.CARD ? RestaurantCard : RestaurantTile

  return (
    <>
      <div
        css={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            css={{
              ...theme.smallcaps,
              color: theme.n40,
              fontSize: 10,
              marginBottom: 8,
            }}
          >
            View Mode
          </div>
          <ModeSelector activeMode={mode} setMode={setMode} />
        </div>
      </div>

      <div
        css={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
          [theme.mobile]: {
            gridTemplateColumns: "1fr",
            gap: 16,
          },
        }}
      >
        {filteredRestaurants.map(location => (
          <RestaurantComponent key={location._id} {...location} />
        ))}
      </div>
    </>
  )
}

export default RestaurantsViewer

RestaurantsViewer.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape(RestaurantCard.propTypes).isRequired
  ).isRequired,
}
