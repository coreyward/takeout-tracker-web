import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import RestaurantTile from "components/RestaurantTile"
import Checkbox from "components/Checkbox"

const Home = ({ data }) => {
  const [showAll, setShowAll] = useState(false)

  const restaurants = showAll
    ? data.restaurants.locations
    : data.restaurants.locations.filter(location => !location.closedForBusiness)

  return (
    <Layout css={{ padding: 24 }}>
      <div css={{ ...theme.smallcaps, color: theme.n40, fontSize: 12 }}>
        Austin, TX • covid-19
      </div>
      <h1 css={{ color: theme.n80, fontSize: 24 }}>
        Restaurant Takeout Tracker
      </h1>

      <p css={{ lineHeight: 1.4, margin: "8px 0 32px", maxWidth: 600 }}>
        This project aims to track restaurants that are open during the covid-19
        health crisis. Please patronize them, tip well, and be patient and
        understanding about any shortages or mishaps—let’s all make this a
        little easier by being a little nicer.
      </p>

      <div css={{ marginBottom: 16 }}>
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
            onChange={() => setShowAll(prev => !prev)}
            checked={!showAll}
            css={{ color: theme.n40 }}
          >
            Only Show Open Restaurants
          </Checkbox>
        </div>
      </div>

      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, auto))",
          gap: 24,
        }}
      >
        {restaurants.map(location => (
          <RestaurantTile key={location._id} {...location} />
        ))}
      </div>
    </Layout>
  )
}

export default Home

Home.propTypes = {
  data: PropTypes.shape({
    restaurants: PropTypes.shape({
      locations: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  {
    restaurants: allSanityRestaurant(sort: { fields: title }) {
      locations: nodes {
        _id
        closedForBusiness
        confirmedAt
        hours
        menuUrl
        name: title
        orderingNotes
        orderPhone
        orderUrl
        policyNotes
        sourceUrls
        tags
        takeoutOptions
        website
      }
    }
  }
`
