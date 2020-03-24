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
  ListCloud,
  RestaurantsViewer: ({ defaultSearchQuery, ...props }) => {
    const context = useContext(PageContext)
    const { data } = useStaticQuery(graphql`
      {
        data: allSanityRestaurant(sort: { fields: title }) {
          restaurants: nodes {
            ...Restaurant
          }
        }
      }
    `)

    return (
      <RestaurantsViewer
        restaurants={data.restaurants}
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
