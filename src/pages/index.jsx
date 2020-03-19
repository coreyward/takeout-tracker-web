import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import AnnouncementBanner from "components/AnnouncementBanner"
import RestaurantsViewer from "components/RestaurantsViewer"
import UnverifiedRestaurants from "components/UnverifiedRestaurants"

const Home = ({ data }) => {
  return (
    <Layout css={{ padding: 24, [theme.mobile]: { padding: 16 } }}>
      {data.announcement.nodes.length > 0 && (
        <AnnouncementBanner
          copy={data.announcement.nodes[0].copy}
          css={{
            margin: `-24px -24px 24px`,
            [theme.mobile]: {
              margin: `-16px -16px 16px`,
            },
          }}
        />
      )}
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

      <RestaurantsViewer restaurants={data.restaurants.locations} />

      <UnverifiedRestaurants
        restaurants={data.unverifiedRestaurants.locations}
      />
    </Layout>
  )
}

export default Home

Home.propTypes = {
  data: PropTypes.shape({
    restaurants: PropTypes.shape({
      locations: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
    unverifiedRestaurants: PropTypes.shape({
      locations: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
    announcement: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({ copy: PropTypes.string.isRequired })
      ).isRequired,
    }),
  }).isRequired,
}

export const query = graphql`
  {
    restaurants: allSanityRestaurant(
      filter: { unverified: { eq: false } }
      sort: { fields: title }
    ) {
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
        sourceNotes
        sourceUrls
        tags
        takeoutOptions
        website
      }
    }

    unverifiedRestaurants: allSanityRestaurant(
      filter: { unverified: { eq: true } }
      sort: { fields: title }
    ) {
      locations: nodes {
        _id
        name: title
        confirmedAt
        takeoutOptions
        tags
      }
    }

    announcement: allSanityAnnouncement(
      filter: { active: { eq: true } }
      limit: 1
      sort: { fields: publishedAt, order: DESC }
    ) {
      nodes {
        copy
      }
    }
  }
`
