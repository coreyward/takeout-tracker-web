import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import { renderContentBlocks } from "components/ContentBlocks"

const Home = ({ data: { page } }) => {
  return (
    <Layout
      css={{
        "--pagePadding": "24px",
        [theme.mobile]: { "--pagePadding": "16px" },
      }}
    >
      {renderContentBlocks(page.contentBlocks)}
    </Layout>
  )
}

export default Home

Home.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      contentBlocks: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query HomepageQuery {
    page: sanityPage {
      contentBlocks {
        __typename
        ... on SanityHero {
          _key
          _type
          title
          description
          background {
            ...Image
          }
          presentation
        }
        ... on SanityRestaurantsViewer {
          _key
          _type
          title
          defaultFilters
          defaultSearchQuery
          defaultViewMode
        }
        ... on SanityListCloud {
          _key
          _type
          title
          description
          lists {
            _key: _id
            name
            slug {
              current
            }
            background {
              ...Image
            }
          }
        }
      }
    }
  }
`
