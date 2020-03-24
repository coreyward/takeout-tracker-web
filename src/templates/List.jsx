import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import Hero from "components/Hero"
import RestaurantsViewer from "components/RestaurantsViewer"
import { MODES } from "components/ModeSelector"

const List = ({ data: { list } }) => {
  return (
    <Layout
      title={list.name}
      description={list.description}
      css={{
        "--pagePadding": "24px",
        [theme.mobile]: { "--pagePadding": "16px" },
      }}
    >
      <Hero
        title={list.name}
        description={list.description}
        background={list.background}
        presentation={list.presentation}
      />
      <RestaurantsViewer
        title={list.name}
        restaurants={list.restaurants}
        defaultViewMode={MODES.TILE}
        showingAll={false}
      />
    </Layout>
  )
}

export default List

List.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      background: PropTypes.shape({
        asset: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
        crop: PropTypes.object,
        hotspot: PropTypes.object,
      }).isRequired,
      presentation: PropTypes.oneOf(["narrow", "wide"]).isRequired,
      restaurants: RestaurantsViewer.propTypes.restaurants,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query ListQuery($id: String!) {
    list: sanityList(id: { eq: $id }) {
      name
      description
      background {
        ...Image
      }
      presentation
      restaurants {
        ...Restaurant
      }
    }
  }
`
