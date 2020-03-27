import React, { useCallback, useRef } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import Checkbox from "components/Checkbox"
import ModeSelector, { MODES } from "components/ModeSelector"
import hexToRgb from "lib/hexToRgb"
import theme from "styles/theme"
import { debounce } from "lodash-es"

const FilterBar = ({
  listTitle,
  defaultSearchQuery,
  mode,
  filters,
  dispatch,
}) => {
  const searchRef = useRef()

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

  const toggleFilter = value =>
    dispatch({
      action: "toggleFilter",
      value,
    })

  return (
    <div
      css={{
        padding: "16px var(--pagePadding)",
        display: "flex",
        justifyContent: "space-between",
        background: theme.n10,
        zIndex: 5,
        boxShadow: `0 1px 10px ${hexToRgb(theme.n10, 0.5)}`,
        "@supports (backdrop-filter: blur(6px))": {
          background: hexToRgb(theme.n10, 0.75),
          backdropFilter: "blur(6px)",
        },
        [theme.mobile]: {
          padding: "8px var(--pagePadding)",
        },
      }}
    >
      <div css={{ flex: "1 1 auto", marginRight: 24 }}>
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
            [theme.mobile]: { display: "block" },
          }}
        >
          <input
            ref={searchRef}
            type="search"
            placeholder={`Search ${listTitle}`}
            defaultValue={defaultSearchQuery}
            onChange={updateSearchQuery}
            css={{
              flex: "1 1 300px",
              maxWidth: 400,
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
              [theme.mobile]: { minWidth: "50vw" },
              [theme.smallMobile]: { minWidth: 160 },
            }}
          />

          <Checkbox
            onChange={() => toggleFilter("hideClosed")}
            checked={filters.has("hideClosed")}
            css={{ flex: "0 0 auto", [theme.mobile]: { display: "none" } }}
          >
            Offering Takeout/Delivery
          </Checkbox>

          <Checkbox
            onChange={() => toggleFilter("currentlyOpen")}
            checked={filters.has("currentlyOpen")}
            css={{
              flex: "0 0 auto",
              marginLeft: 8,
              [theme.mobile]: { margin: "8px 0 0 0" },
            }}
          >
            Open{" "}
            {filters.has("currentlyOpen")
              ? `at ${moment().format("h:mma")}`
              : "now"}
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
          activeMode={mode}
          setMode={value => dispatch({ action: "setViewMode", value })}
        />
      </div>
    </div>
  )
}

export default FilterBar

FilterBar.propTypes = {
  listTitle: PropTypes.string.isRequired,
  defaultSearchQuery: PropTypes.string,
  mode: PropTypes.oneOf(Object.values(MODES)),
  filters: PropTypes.instanceOf(Set).isRequired,
  dispatch: PropTypes.func.isRequired,
}
