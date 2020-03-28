import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import RestaurantListItem from "components/RestaurantListItem"
import { MODES } from "components/ModeSelector"
import Pagination from "components/Pagination"
import Map from "components/Map"
import ActiveListingPanel from "components/ActiveListingPanel"

const PER_PAGE = 30

const MapView = ({
  state,
  dispatch,
  currentRestaurants,
  filterBar,
  noResults,
}) => {
  const paginatedRestaurants = currentRestaurants.slice(
    (state.page - 1) * PER_PAGE,
    state.page * PER_PAGE
  )

  return (
    <div
      css={{
        height: "100vh",
        scrollSnapAlign: "start",
        gridTemplateRows: "80px 1fr",
        position: "relative",
        "--listWidth": "400px",
        [theme.tablet]: {
          "--listWidth": "300px",
        },
      }}
      id="restaurants-list"
    >
      {filterBar}

      <ActiveListingPanel
        dispatch={dispatch}
        listing={
          state.activeListing &&
          currentRestaurants.find(({ _key }) => _key === state.activeListing)
        }
      />

      <div
        css={{
          display: "grid",
          gridTemplateColumns: "var(--listWidth) 1fr",
          gridTemplateRows: "1fr 100px",
          gridTemplateAreas: `
          "list map"
          "pagination map"
        `,
          height: "calc(100vh - 80px)",
        }}
      >
        <div
          css={{
            position: "relative",
            gridArea: "list",
            overflowY: state.activeListing ? "hidden" : "auto",
            WebkitOverflowScrolling: "touch",
            padding:
              state.mode === MODES.MAP
                ? "0 1px 0 0"
                : "0 var(--pagePadding) var(--pagePadding) var(--pagePadding)",
            ":before": {
              content: "''",
              display: "block",
              position: "sticky",
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              zIndex: 2,
              pointerEvents: "none",
              background: `linear-gradient(to top, transparent, ${theme.n10})`,
            },
            ":after": {
              content: "''",
              display: "block",
              position: "sticky",
              bottom:
                state.mode === MODES.MAP ? 0 : "calc(-1 * var(--pagePadding))",
              left: 0,
              right: 0,
              height: 50,
              zIndex: 2,
              pointerEvents: "none",
              background: `linear-gradient(to bottom, transparent, ${theme.n10})`,
            },
          }}
        >
          {paginatedRestaurants.length > 0 ? (
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: state.mode !== MODES.MAP && 24,
                marginTop: -30,
                [theme.mobile]: {
                  gridTemplateColumns: "1fr",
                  gap: state.mode !== MODES.MAP ? 8 : 16,
                },
              }}
            >
              {paginatedRestaurants.map(location => (
                <RestaurantListItem
                  key={location._key}
                  {...location}
                  onClick={() => {
                    dispatch({
                      action: "activateListing",
                      value: location._key,
                    })
                  }}
                />
              ))}
            </div>
          ) : (
            noResults
          )}
        </div>

        <Pagination
          currentPage={state.page}
          perPage={PER_PAGE}
          totalCount={currentRestaurants.length}
          setPage={n => dispatch({ action: "setPage", value: n })}
          css={{
            gridArea: "pagination",
            width: "100%",
            maxWidth: 225,
            margin: "24px auto",
          }}
        />
        <div
          css={{
            gridArea: "map",
            height: "100%",
            padding: "var(--pagePadding)",
            paddingTop: 0,
            paddingLeft: 0,
          }}
        >
          <Map
            locations={paginatedRestaurants}
            onChange={({ center, bounds }) => {
              dispatch({
                action: "setMapGeometry",
                value: { center, bounds },
              })
            }}
            activeListing={state.activeListing}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  )
}

export default MapView

MapView.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  currentRestaurants: PropTypes.array.isRequired,
  filterBar: PropTypes.node.isRequired,
  noResults: PropTypes.node,
}
