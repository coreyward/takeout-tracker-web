import React from "react"
import PropTypes from "prop-types"
import GoogleMapReact from "google-map-react"
import MapMarker from "components/MapMarker"
import theme from "styles/theme"

// Coordinates of the Texas State Capitol, just north of downtown Austin
const defaultCenter = { lat: 30.274711897776527, lng: -97.74023069179279 }

const Map = ({
  locations,
  onChange,
  activeListing,
  center,
  zoom,
  dispatch,
}) => (
  <div
    css={{
      width: "100%",
      height: "100%",
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
      zIndex: 2,
      boxShadow: `-8px 0 12px -6px ${theme.n10}`,
      [[".gm-style-iw", ".gm-style-iw-t"]]: { display: "none" },
    }}
    onClick={e => {
      if (!["svg", "path"].includes(e.target.tagName)) {
        dispatch({ action: "clearActiveListing" })
      }
    }}
  >
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }}
      center={center || defaultCenter}
      zoom={zoom || 12}
      onChange={onChange}
      options={createMapOptions}
      hoverDistance={14}
      distanceToMouse={distanceToMouse}
    >
      {locations.map(loc => {
        return (
          <MapMarker
            key={loc._key}
            id={loc._key}
            name={loc.name}
            lat={loc.geoLocation.lat}
            lng={loc.geoLocation.lng}
            active={loc._key === activeListing}
            dispatch={dispatch}
          />
        )
      })}
    </GoogleMapReact>
  </div>
)

export default Map

Map.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      _key: PropTypes.string.isRequired,
      geoLocation: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }),
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  activeListing: PropTypes.string,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  zoom: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

const distanceToMouse = (markerPos, mousePos, markerProps) => {
  const x = markerPos.x
  const y = markerPos.y - 14 // offset height

  // The 0.71 adjusts the distance to compensate for the
  // width of the marker being narrower (20/28px ≈ 0.71)
  return Math.sqrt(
    0.71 * (x - mousePos.x) * (x - mousePos.x) +
      (y - mousePos.y) * (y - mousePos.y)
  )
}

const createMapOptions = maps => ({
  gestureHandling: "greedy",
  zoomControlOptions: {
    position: maps.ControlPosition.LEFT_BOTTOM,
  },
  fullscreenControl: false,
  styles: [
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    { elementType: "geometry", stylers: [{ color: "#17273A" }] },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17273A" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.attraction",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.government",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.medical",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.school",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.sports_complex",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      // stylers: [{ color: "#38414e" }],
      stylers: [{ color: theme.n30 }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: theme.n10 }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
})
