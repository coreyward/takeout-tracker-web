import React, { useReducer, useMemo, useCallback, useRef } from "react"
import PropTypes from "prop-types"
import Fuse from "fuse.js"
import moment from "moment"
import debounce from "lodash-es/debounce"
import theme from "styles/theme"
import RestaurantTile from "components/RestaurantTile"
import Checkbox from "components/Checkbox"
import RestaurantCard from "components/RestaurantCard"
import ModeSelector, { MODES } from "components/ModeSelector"
import Pagination from "components/Pagination"
import { hoursCover } from "lib/parseHours"
import { Link } from "gatsby"

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

  const updateSearchQuery = useCallback(
    debounce(
      value =>
        dispatch({
          action: "setSearchQuery",
          value: searchRef.current.value,
        }),
      500
    ),
    []
  )

  const RestaurantComponent =
    state.mode === MODES.CARD ? RestaurantCard : RestaurantTile

  return (
    <div css={{ padding: "var(--pagePadding)" }} id="restaurants-list">
      <div
        css={{
          paddingBottom: 0,
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

          <div
            css={{
              display: "flex",
              [theme.mobile]: { flexDirection: "column" },
            }}
          >
            <input
              ref={searchRef}
              type="search"
              placeholder="Search"
              defaultValue={state.searchQuery}
              onChange={e => updateSearchQuery()}
              css={{
                marginRight: 16,
                fontSize: 12,
                fontFamily: "inherit",
                borderRadius: 10,
                color: theme.n40,
                padding: "0.5em 0.8em",
                outline: 0,
                border: `1px solid ${theme.n20}`,
                lineHeight: 1,
                ":focus": {
                  border: `1px solid ${theme.n40}`,
                },
                "::placeholder": {
                  color: theme.n40,
                },
              }}
            />

            <Checkbox
              onChange={() =>
                dispatch({ action: "toggleFilter", value: "hideClosed" })
              }
              checked={state.filters.has("hideClosed")}
              css={{ [theme.mobile]: { display: "none" } }}
            >
              Offering Takeout/Delivery
            </Checkbox>

            <Checkbox
              onChange={useCallback(
                () =>
                  dispatch({
                    action: "toggleFilter",
                    value: "currentlyOpen",
                  }),
                []
              )}
              checked={state.filters.has("currentlyOpen")}
              css={{ marginLeft: 8, [theme.mobile]: { margin: "8px 0 0 0" } }}
            >
              Open at {moment().format("h:mma")}
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
          <ModeSelector
            activeMode={state.mode}
            setMode={value => dispatch({ action: "setViewMode", value })}
          />
        </div>
      </div>

      {filteredRestaurants.length > 0 ? (
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
          {filteredRestaurants
            .slice((state.page - 1) * state.perPage, state.page * state.perPage)
            .map(location => (
              <RestaurantComponent key={location._id} {...location} />
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

      <Pagination
        currentPage={state.page}
        perPage={state.perPage}
        totalCount={filteredRestaurants.length}
        setPage={n => dispatch({ action: "setPage", value: n })}
        css={{
          maxWidth: 225,
          margin: "24px auto",
        }}
      />
    </div>
  )
}

export default RestaurantsViewer

const filters = {
  hideClosed: list => list.filter(entry => !entry.closedForBusiness),
  currentlyOpen: list => list.filter(entry => hoursCover(entry.hours)),
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
    <h2 css={{ ...theme.t2 }}>No results found for “{searchQuery}”</h2>

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
