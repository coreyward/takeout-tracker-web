import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import theme from "styles/theme"
import Layout from "components/Layout"
import Hero from "components/Hero"
import RestaurantsViewer from "components/RestaurantsViewer"
import { MODES } from "components/ModeSelector"
import Image from "components/Image"
import hexToRgb from "lib/hexToRgb"
import ExternalLink from "components/ExternalLink"

const List = ({
  data: {
    list: { name, description, background, presentation, author, restaurants },
  },
}) => {
  return (
    <Layout
      title={name}
      description={description}
      css={{
        "--pagePadding": "24px",
        [theme.mobile]: { "--pagePadding": "16px" },
      }}
    >
      <Hero
        title={name}
        description={description}
        background={background}
        presentation={presentation}
      >
        {author && (
          <ExternalLink
            href={author.url}
            css={{
              display: "flex",
              alignItems: "center",
              fontSize: 16,
              color: theme.n70,
              marginTop: 8,
            }}
          >
            {author.avatar && (
              <Image
                {...author.avatar}
                className="authorAvatar"
                width={32}
                height={32}
                alt={author.name}
                css={{
                  display: "block",
                  width: 32,
                  borderRadius: 16,
                  boxShadow: `0 1px 3px ${hexToRgb(theme.n10, 0.4)}`,
                  boxSizing: "content-box",
                  transition: "filter 250ms",
                  marginRight: 16,
                }}
              />
            )}
            <div css={{ letterSpacing: "0.01em" }}>by {author.name}</div>
          </ExternalLink>
        )}
      </Hero>
      <RestaurantsViewer
        title={name}
        restaurants={restaurants}
        defaultFilters={["hideClosed"]}
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
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
          asset: PropTypes.object.isRequired,
        }),
        url: PropTypes.string.isRequired,
      }),
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
      author {
        name
        url
        avatar {
          ...Image
        }
      }
      restaurants {
        ...Restaurant
      }
    }
  }
`
