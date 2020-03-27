import React, { useReducer, useMemo, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Fuse from "fuse.js"
import theme from "styles/theme"
import RestaurantTile from "components/RestaurantTile"
import RestaurantCard from "components/RestaurantCard"
import { MODES } from "components/ModeSelector"
import Pagination from "components/Pagination"
import FilterBar from "components/FilterBar"
import { hoursCover } from "lib/parseHours"
import Map from "components/Map"
import ActiveListingPanel from "components/ActiveListingPanel"

const RestaurantsViewer = ({
  title,
  restaurants,
  defaultSearchQuery,
  defaultFilters,
  defaultViewMode,
  showingAll,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    mode: defaultViewMode || "card",
    searchQuery: defaultSearchQuery || "",
    filters: new Set(defaultFilters),
  })
  const fuse = useMemo(() => new Fuse(restaurants, fuseConfig), [restaurants])
  const searchRef = useRef()

  const filteredRestaurants = useMemo(
    () =>
      applyFilters(
        state.searchQuery?.length > 0
          ? fuse.search(state.searchQuery).map(res => res.item)
          : restaurants,
        Array.from(state.filters).map(filter => filters[filter])
      ),
    [fuse, state.searchQuery, state.filters, restaurants]
  )

  const restaurantsInView = state.mapBounds
    ? filters.inView(state.mapBounds)(filteredRestaurants)
    : filteredRestaurants

  const currentRestaurants = restaurantsInView.slice(
    (state.page - 1) * state.perPage,
    state.page * state.perPage
  )

  const RestaurantComponent =
    state.mode === MODES.CARD ? RestaurantCard : RestaurantTile

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
      <FilterBar
        listTitle={title}
        defaultSearchQuery={defaultSearchQuery}
        mode={state.mode}
        filters={state.filters}
        dispatch={dispatch}
      />

      <ActiveListingPanel
        dispatch={dispatch}
        listing={
          state.activeListing
            ? restaurants.find(({ _key }) => _key === state.activeListing)
            : null
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
            padding: "var(--pagePadding)",
            paddingTop: 0,
            ":after": {
              content: "''",
              display: "block",
              position: "sticky",
              bottom: "calc(-1 * var(--pagePadding))",
              left: 0,
              right: 0,
              height: 50,
              zIndex: 2,
              pointerEvents: "none",
              background: `linear-gradient(to bottom, transparent, ${theme.n10})`,
            },
          }}
        >
          {restaurantsInView.length > 0 ? (
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 24,
                [theme.mobile]: {
                  gridTemplateColumns: "1fr",
                  gap: 16,
                },
              }}
            >
              {currentRestaurants.map(location => (
                <RestaurantComponent
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
            <NoResults
              listTitle={title}
              searchQuery={state.searchQuery}
              showingAll={showingAll}
              resetSearch={() => {
                dispatch({ action: "setSearchQuery", value: "" })
                searchRef.current.value = ""
              }}
            />
          )}
        </div>

        <Pagination
          currentPage={state.page}
          perPage={state.perPage}
          totalCount={restaurantsInView.length}
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
            locations={currentRestaurants}
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

export default RestaurantsViewer

const filters = {
  hideClosed: list => list.filter(entry => entry.openForBusiness),
  currentlyOpen: list => list.filter(entry => hoursCover(entry.hours)),
  inView: bounds => list =>
    list.filter(
      ({ geoLocation: { lat, lng } }) =>
        lng > bounds.nw.lng &&
        lng < bounds.se.lng &&
        lat < bounds.nw.lat &&
        lat > bounds.se.lat
    ),
}

RestaurantsViewer.propTypes = {
  title: PropTypes.string.isRequired,
  restaurants: PropTypes.arrayOf(
    PropTypes.shape(RestaurantCard.propTypes).isRequired
  ).isRequired,
  defaultSearchQuery: PropTypes.string,
  defaultFilters: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(filters))),
  defaultViewMode: PropTypes.oneOf(Object.values(MODES)),
  showingAll: PropTypes.bool,
}

const fuseConfig = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  keys: ["name", "tags", "sourceNotes", "orderNotes"],
}

const applyFilters = (list, filters) =>
  filters.filter(x => x).reduce((results, filter) => filter(results), list)

const reducer = (state, { action, value, ...props }) => {
  switch (action) {
    case "setViewMode":
      return {
        ...state,
        mode: value,
      }

    case "toggleFilter":
      const filters = new Set(state.filters)

      if (filters.has(value)) {
        filters.delete(value)
      } else {
        filters.add(value)
      }

      return {
        ...state,
        page: 1,
        filters,
      }

    case "setSearchQuery":
      return {
        ...state,
        page: 1,
        searchQuery: value,
      }

    case "setPage":
      return {
        ...state,
        page: value,
      }

    case "setPerPage":
      return {
        ...state,
        page: 1,
        perPage: value,
      }

    case "setMapGeometry":
      return {
        ...state,
        mapBounds: value.bounds,
        mapCenter: value.center,
        page: 1,
      }

    case "activateListing":
      return {
        ...state,
        activeListing: value,
      }

    case "clearActiveListing":
      return {
        ...state,
        activeListing: null,
      }

    default:
      return state
  }
}

const initialState = {
  filters: new Set(["hideClosed"]),
  mode: MODES.CARD,
  searchQuery: "",
  page: 1,
  perPage: 30,
  activeListing: null,
}

const NoResults = ({ searchQuery, showingAll, listTitle, resetSearch }) => (
  <div
    css={{
      background: theme.n20,
      padding: "48px 24px",
      textAlign: "center",
      borderRadius: 3,
    }}
  >
    <h2 css={{ ...theme.t2 }}>
      No results found{searchQuery && `for “${searchQuery}”`}
    </h2>

    {!showingAll && (
      <div css={{ marginTop: 16 }}>
        Currently only viewing restaurants in {listTitle}.{" "}
        <Link to="/#restaurants-list">See all restaurants instead.</Link>
      </div>
    )}

    <div css={{ marginTop: 16, fontSize: 12 }}>
      <a href="" onClick={resetSearch}>
        Reset search
      </a>
    </div>
  </div>
)

NoResults.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  showingAll: PropTypes.bool.isRequired,
  listTitle: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
}
