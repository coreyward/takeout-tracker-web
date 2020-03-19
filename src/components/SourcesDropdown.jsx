import React, { useState } from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import Icons from "lib/icons"
import SourcesList from "components/SourcesList"
import useOnClickOutside from "hooks/useOnClickOutside"

const SourcesDropdown = ({ urls, notes, className }) => {
  const [showSources, setShowSources] = useState(false)
  const ref = useOnClickOutside(() => {
    setShowSources(false)
  }, showSources)

  return (
    (notes || urls?.length > 0) && (
      <div
        ref={ref}
        css={{
          filter: "drop-shadow(1px 2px 3px rgba(12, 27, 46, 0.69))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        className={className}
      >
        <div
          onClick={() => {
            setShowSources(prev => !prev)
          }}
          css={{
            color: theme.n50,
            cursor: "pointer",
            marginLeft: "auto",
            background: showSources ? "#1D3149" : "transparent",
            padding: "12px 16px 4px",
            borderRadius: "5px 5px 0 0",
            ":hover": { color: theme.n80 },
          }}
        >
          <Icons.Book />
        </div>

        {showSources && (
          <div
            css={{
              background: showSources ? "#1D3149" : "transparent",
              borderRadius: "5px 0 5px 5px",
            }}
          >
            <h3
              css={{
                fontWeight: 500,
                fontSize: 14,
                padding: "8px 16px",
              }}
            >
              Sources
            </h3>

            <SourcesList
              notes={notes}
              urls={urls}
              css={{
                padding: 16,
                paddingBottom: 8, // offset to accomodate margin-bottom on IconRow and IconButton
                background: "#111A24",
                borderRadius: "0 0 5px 5px",
              }}
            />
          </div>
        )}
      </div>
    )
  )
}

export default SourcesDropdown

SourcesDropdown.propTypes = {
  urls: PropTypes.array,
  notes: PropTypes.string,
  className: PropTypes.string,
}
