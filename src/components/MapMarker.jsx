import React from "react"
import PropTypes from "prop-types"

const MapMarker = ({ id, name, $hover, active, dispatch }) => {
  return (
    <svg
      width="20"
      height="28"
      viewBox="0 0 22 27"
      fill="none"
      css={[
        {
          position: "relative",
          transform: `translate3d(-10px, -28px, 0) scale(1)`,
          cursor: "pointer",
          zIndex: $hover ? 4 : active ? 3 : 2,
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
          transformOrigin: "bottom center",
          transition: `transform 450ms ease-out`,
        },
        active && {
          transform: `translate(-10px, -28px) scale(1.5)`,
          transition: "transform 450ms cubic-bezier(0, 3.5, 0.88, 0.82)",
        },
      ]}
      onClick={() => {
        dispatch({ action: "activateListing", value: id, name })
      }}
    >
      <path
        fill="#F04021"
        d="M10.02 26.55l-.02.02-.02-.02c-.25-.3-.62-.72-1.05-1.26a61.5 61.5 0 01-3.18-4.28 38 38 0 01-3.17-5.55A13.93 13.93 0 011.17 10a8.83 8.83 0 1117.66 0c0 1.65-.55 3.53-1.41 5.46A38 38 0 0114.25 21a61.5 61.5 0 01-4.23 5.54z"
        strokeWidth={0.25}
        stroke="#4F2E28"
      />
      <path
        css={{ transition: "fill 250ms" }}
        fill={
          active ? "#fff" : $hover ? "rgba(255, 255, 255, 0.2)" : "transparent"
        }
        d="M13.75 7L8.5 12.4l-1.75-1.8L5 12.4 8.5 16l7-7.2L13.75 7z"
      />
    </svg>
  )
}

MapMarker.displayName = "Marker"

export default MapMarker

MapMarker.propTypes = {
  id: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  $hover: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}
