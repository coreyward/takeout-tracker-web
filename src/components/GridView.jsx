import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import RestaurantListItem from "components/RestaurantListItem"
import { MODES } from "components/ModeSelector"
import Pagination from "components/Pagination"
import RestaurantTile from "components/RestaurantTile"
import RestaurantCard from "components/RestaurantCard"
import cloneElement from "lib/cloneElement"

const GridView = ({
  state,
  dispatch,
  currentRestaurants,
  restaurantCount,
  filterBar,
  noResults,
}) => {
  const RestaurantComponent = restaurantComponents[state.mode]

  return (
    <div css={{ padding: "var(--pagePadding)" }} id="restaurants-list">
      {cloneElement(React.Children.only(filterBar), {
        css: {
          position: "sticky",
          top: 0,
          margin: "calc(-1 * var(--pagePadding))",
          marginBottom: 0,
        },
      })}

      {currentRestaurants.length > 0
        ? Object.values(
            currentRestaurants.reduce((acc, r) => {
              let char = r.name.slice(0, 1).toUpperCase()
              if (/\d/.test(char)) char = "#"
              if (!acc.hasOwnProperty(char))
                acc[char] = { character: char, entries: [] }
              acc[char].entries.push(r)
              return acc
            }, {})
          ).map(({ character, entries }) => (
            <div key={character} css={{ marginBottom: 24 }}>
              <h2
                css={{
                  fontSize: 24,
                  fontWeight: 900,
                  marginTop: 16,
                  marginBottom: 16,
                  color: theme.n80,
                }}
              >
                {character}
              </h2>

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
                {entries.map(location => (
                  <RestaurantComponent key={location._key} {...location} />
                ))}
              </div>
            </div>
          ))
        : noResults}

      <Pagination
        currentPage={state.page}
        perPage={state.perPage}
        totalCount={restaurantCount}
        setPage={n => dispatch({ action: "setPage", value: n })}
        css={{
          maxWidth: 225,
          margin: "24px auto",
        }}
      />
    </div>
  )
}

export default GridView

GridView.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentRestaurants: PropTypes.array.isRequired,
  restaurantCount: PropTypes.number.isRequired,
  filterBar: PropTypes.node.isRequired,
  noResults: PropTypes.node,
}

const restaurantComponents = {
  [MODES.CARD]: RestaurantCard,
  [MODES.TILE]: RestaurantTile,
  [MODES.MAP]: RestaurantListItem,
}
