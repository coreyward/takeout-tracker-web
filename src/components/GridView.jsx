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
  filterBar,
  noResults,
}) => {
  const RestaurantComponent = restaurantComponents[state.mode]

  const perPage =
    state.searchQuery.length > 0 ? 30 : state.mode === MODES.TILE ? 60 : 100

  const paginatedRestaurants = (state.searchQuery.length === 0
    ? [...currentRestaurants].sort((a, b) => {
        const aName = a.name.toUpperCase()
        const bName = b.name.toUpperCase()
        return aName > bName ? 1 : bName > aName ? -1 : 0
      })
    : currentRestaurants
  ).slice((state.page - 1) * perPage, state.page * perPage)

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

      {paginatedRestaurants.length > 0 ? (
        state.searchQuery.length === 0 ? (
          Object.values(
            paginatedRestaurants.reduce((acc, r) => {
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
        ) : (
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
            {paginatedRestaurants.map(location => (
              <RestaurantComponent key={location._key} {...location} />
            ))}
          </div>
        )
      ) : (
        noResults
      )}

      <Pagination
        currentPage={state.page}
        perPage={perPage}
        totalCount={currentRestaurants.length}
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
  filterBar: PropTypes.node.isRequired,
  noResults: PropTypes.node,
}

const restaurantComponents = {
  [MODES.CARD]: RestaurantCard,
  [MODES.TILE]: RestaurantTile,
  [MODES.MAP]: RestaurantListItem,
}
