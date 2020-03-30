import React, { useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Hero from "components/Hero"
import RestaurantsViewer from "components/RestaurantsViewer"
import ListCloud from "components/ListCloud"
import PageContext from "context/PageContext"

const ContentBlocks = ({ contentBlocks }) => renderContentBlocks(contentBlocks)

export default ContentBlocks

export const renderContentBlocks = contentBlocks =>
  contentBlocks
    .filter(x => x)
    .map(({ __typename, _key, _type = "", ...props }) => {
      const type = _type.slice(0, 1).toUpperCase() + _type.slice(1)

      if (connectors[type]) {
        return React.createElement(connectors[type], { key: _key, ...props })
      } else {
        if (process.env.NODE_ENV !== "production")
          console.warn(`No connector found for ${_type || __typename}`)
        return null
      }
    })

/* eslint-disable react/prop-types, react/display-name */
const connectors = {
  Hero,

  ListCloud: props => <ListCloud {...props} truncate />,

  RestaurantsViewer: ({ defaultSearchQuery, ...props }) => {
    const context = useContext(PageContext) || {}
    const { data } = useStaticQuery(graphql`
      {
        data: allSanityRestaurant(
          filter: {
            locations: {
              elemMatch: {
                _key: { ne: null }
                geoLocation: { lat: { gt: -180, lt: 180 } }
              }
            }
          }
          sort: { fields: confirmedAt, order: DESC }
        ) {
          restaurants: nodes {
            ...Restaurant
          }
        }
      }
    `)

    const locations = data.restaurants.flatMap(({ locations, ...base }) =>
      locations.map(loc => ({
        ...base,
        ...loc,
      }))
    )

    return (
      <RestaurantsViewer
        restaurants={locations}
        defaultSearchQuery={context.searchQuery || defaultSearchQuery}
        showingAll={true}
        {...props}
      />
    )
  },
}

Object.keys(connectors).forEach(name => {
  connectors[name].displayName = `${name}Connector`
})
/* eslint-enable react/prop-types, react/display-name */
