import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import IconRow from "components/IconRow"
import Icons from "lib/icons"
import TimeAgo from "components/TimeAgo"
import Tags from "components/Tags"

const UnverifiedRestaurants = ({ restaurants }) => (
  <>
    <h2
      css={{
        fontWeight: 500,
        marginTop: 48,
        marginBottom: 24,
        color: theme.n70,
      }}
    >
      User-Reported Restaurants
      <small css={{ color: theme.n50, marginLeft: 8 }}>
        ({restaurants.length})
      </small>
    </h2>

    <p css={{ lineHeight: 1.4, margin: "8px 0 32px", maxWidth: 600 }}>
      These restaurants have been reported by members of the community as being
      open and accepting takeout orders, but we have not yet been able to verify
      or source details for them. If you have additional information, especially
      links, please get in touch with the chat widget to the right!
    </p>

    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, auto))",
        gap: 24,
        fontSize: 12,
      }}
    >
      {restaurants.map(location => (
        <div
          key={location._id}
          css={{ background: theme.n20, padding: 16, borderRadius: 3 }}
        >
          <h4
            css={{
              fontSize: 16,
              fontWeight: 500,
              color: theme.n70,
              marginBottom: 8,
            }}
          >
            {location.name}
          </h4>
          <IconRow icon={Icons.Clock} css={{ marginBottom: 0 }}>
            <TimeAgo time={location.confirmedAt} />
          </IconRow>
          <Tags tags={location.tags} css={{ marginTop: 8 }} />
        </div>
      ))}
    </div>
  </>
)

export default UnverifiedRestaurants

UnverifiedRestaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      confirmedAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}
