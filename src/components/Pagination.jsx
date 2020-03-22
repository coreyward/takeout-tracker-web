import React from "react"
import PropTypes from "prop-types"
import Icons from "lib/icons"
import theme from "styles/theme"

const Pagination = ({
  currentPage,
  perPage,
  totalCount,
  className,
  setPage,
}) => {
  const totalPages = Math.ceil(totalCount / perPage)
  return totalCount > 0 ? (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={className}
    >
      <PageButton
        disabled={currentPage <= 1}
        onClick={() => setPage(currentPage - 1)}
      />

      <div css={{ color: theme.n40, fontSize: 12 }}>
        Page {currentPage} of {totalPages}
      </div>

      <PageButton
        disabled={currentPage >= totalPages}
        onClick={() => setPage(currentPage + 1)}
        flipped
      />
    </div>
  ) : null
}

export default Pagination

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  setPage: PropTypes.func.isRequired,
}

const PageButton = ({ onClick, flipped = false, disabled = false }) => (
  <button
    css={{
      appearance: "none",
      padding: "4px 8px",
      background: theme.n20,
      color: theme.n50,
      cursor: "pointer",
      borderRadius: 2,
      border: 0,
      outline: 0,
      transition: "background 250ms",
      pointerEvents: disabled && "none",
      opacity: disabled && 0.5,
      ":hover": {
        background: theme.n30,
      },
    }}
    onClick={disabled ? null : onClick}
  >
    <Icons.LeftChevron
      css={{ display: "block", transform: flipped && "rotateZ(180deg)" }}
    />
  </button>
)

PageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  flipped: PropTypes.bool,
  disabled: PropTypes.bool,
}
