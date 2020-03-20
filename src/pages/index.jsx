import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import AnnouncementBanner from "components/AnnouncementBanner"
import RestaurantsViewer from "components/RestaurantsViewer"
import Icons from "lib/icons"

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

      <a
        href="https://www.instagram.com/takeouttracker"
        target="_blank"
        rel="noopener noreferrer"
        css={{
          float: "right",
          color: theme.n40,
          transition: "color 250ms",
          ":hover": { color: theme.n70 },
        }}
      >
        <Icons.Instagram />
      </a>

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
    </Layout>
  )
}

export default Home

Home.propTypes = {
  data: PropTypes.shape({
    restaurants: PropTypes.shape({
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
        sourceNotes
        sourceUrls
        tags
        takeoutOptions
        unverified
        website
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
