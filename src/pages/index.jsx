import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import OpenRestaurantTile from "components/OpenRestaurantTile"

const Home = ({ data }) => {
  return (
    <Layout css={{ padding: 24 }}>
      <h1 css={{ color: theme.n90 }}>
        Austin Restaurant Takeout Tracker — covid-19
      </h1>

      <p>
        This project aims to track restaurants that are open during the covid-19
        health crisis. Please patronize them, tip well, and be patient and
        understanding about any shortages or mishaps—let’s all make this a
        little easier by being a little nicer.
      </p>

      <h2>Restaurants that are Open</h2>

      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, auto))",
          gap: 24,
        }}
      >
        {data.openRestaurants.locations.map(location => (
          <OpenRestaurantTile key={location._id} {...location} />
        ))}
      </div>
    </Layout>
  )
}

export default Home

Home.propTypes = {
  data: PropTypes.shape({
    openRestaurants: PropTypes.shape({
      locations: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  {
    openRestaurants: allSanityRestaurant(
      filter: { closedForBusiness: { eq: false } }
      sort: { fields: title }
    ) {
      locations: nodes {
        _id
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

    closedRestaurants: allSanityRestaurant(
      filter: { closedForBusiness: { eq: true } }
      sort: { fields: title }
    ) {
      locations: nodes {
        _id
        confirmedAt
        name: title
        policyNotes
        sourceUrls
        tags
        website
      }
    }
  }
`
