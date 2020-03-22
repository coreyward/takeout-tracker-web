import React, { useReducer, useCallback } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import theme from "styles/theme"
import RestaurantTile from "components/RestaurantTile"
import Checkbox from "components/Checkbox"
import RestaurantCard from "components/RestaurantCard"
import ModeSelector, { MODES } from "components/ModeSelector"
import { hoursCover } from "lib/parseHours"

const filters = {
  limitTo: n => list => list.slice(0, n),
  hideClosed: list => list.filter(entry => !entry.closedForBusiness),
  currentlyOpen: list => list.filter(entry => hoursCover(entry.hours)),
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
        filters,
      }
    default:
      return state
  }
}

const initialState = {
  filters: new Set(["hideClosed"]),
  mode: MODES.CARD,
}

const RestaurantsViewer = ({ restaurants }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const filteredRestaurants = applyFilters(
    restaurants,
    Array.from(state.filters).map(filter => filters[filter])
  )

  const RestaurantComponent =
    state.mode === MODES.CARD ? RestaurantCard : RestaurantTile

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
              onChange={() =>
                dispatch({ action: "toggleFilter", value: "hideClosed" })
              }
              checked={state.filters.has("hideClosed")}
              css={{ color: theme.n40 }}
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
              css={{ color: theme.n40, marginLeft: 8 }}
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
