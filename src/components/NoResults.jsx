import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import { Link } from "gatsby"

const NoResults = ({
  searchQuery,
  showingAll,
  listTitle,
  resetSearch,
  className,
}) => (
  <div
    css={{
      background: theme.n20,
      padding: "48px 24px",
      textAlign: "center",
      borderRadius: 3,
    }}
    className={className}
  >
    <h2 css={{ ...theme.t2 }}>
      No results found{searchQuery && ` for “${searchQuery}”`}
    </h2>

    {!showingAll && (
      <div css={{ marginTop: 16 }}>
        Currently only viewing restaurants in {listTitle}.{" "}
        <Link to="/#restaurants-list">See all restaurants instead.</Link>
      </div>
    )}

    <div css={{ marginTop: 16, fontSize: 12 }}>
      <a
        href="#reset"
        onClick={e => {
          e.preventDefault()
          resetSearch(e)
        }}
      >
        Reset search
      </a>
    </div>
  </div>
)

export default NoResults

NoResults.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  showingAll: PropTypes.bool.isRequired,
  listTitle: PropTypes.string.isRequired,
  resetSearch: PropTypes.func.isRequired,
  className: PropTypes.string,
}
