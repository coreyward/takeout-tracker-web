import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "components/Layout"
import ListCloud from "components/ListCloud"

const ListsPage = ({ data }) => (
  <Layout title="Curated Lists of Restaurants in Austin">
    <ListCloud
      lists={data.listData.lists}
      title="In need of a little inspiration?"
      description="These curated lists from contributors are sure to help you find new, awesome places that are just what you're looking for."
    />
  </Layout>
)

export default ListsPage

ListsPage.propTypes = {
  data: PropTypes.shape({
    listData: PropTypes.shape({
      lists: PropTypes.arrayOf(
        PropTypes.shape({
          _key: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          slug: PropTypes.shape({ current: PropTypes.string.isRequired })
            .isRequired,
          background: PropTypes.object.isRequired,
          author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.object.isRequired,
          }),
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  {
    listData: allSanityList(sort: { fields: name, order: ASC }) {
      lists: nodes {
        _key: _id
        name
        slug {
          current
        }
        background {
          ...Image
        }
        author {
          name
          avatar {
            ...Image
          }
        }
      }
    }
  }
`
