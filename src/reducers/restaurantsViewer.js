import { uniqueId } from "lodash-es"
import { MODES } from "components/ModeSelector"
import trackEvent from "lib/trackEvent"

export const initialState = {
  filters: new Set(["hideClosed"]),
  filterBarKey: uniqueId(),
  mode: MODES.CARD,
  searchQuery: "",
  page: 1,
  activeListing: null,
  mapBounds: null,
}

export const reducer = (state, { action, value, ...props }) => {
  switch (action) {
    case "setViewMode":
      trackEvent("View Mode Changed", value)
      return {
        ...state,
        page: 1,
        mode: value,
        mapBounds: value === MODES.MAP ? state.mapBounds : null,
      }

    case "toggleFilter":
      const filters = new Set(state.filters)

      if (filters.has(value)) {
        trackEvent("Filter Removed", value)
        filters.delete(value)
      } else {
        trackEvent("Filter Added", value)
        filters.add(value)
      }

      return {
        ...state,
        page: 1,
        filters,
      }

    case "setSearchQuery":
      if (value.length > 2) trackEvent("Restaurants Searched", value)
      return {
        ...state,
        page: 1,
        searchQuery: value,
      }

    case "clearSearchQuery":
      return {
        ...state,
        page: 1,
        searchQuery: "",
        filterBarKey: uniqueId(),
      }

    case "setPage":
      trackEvent("Restaurants Paged", value)
      return {
        ...state,
        page: value,
      }

    case "setMapGeometry":
      return {
        ...state,
        mapBounds: value.bounds,
        mapCenter: value.center,
        mapZoom: value.zoom,
        page: 1,
      }

    case "activateListing":
      window.scrollTo({ top: document.body.offsetHeight, behavior: "smooth" })
      if (props.name) trackEvent("Restaurants Activated", props.name)
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
