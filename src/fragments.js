import { graphql } from "gatsby"

export const fragments = graphql`
  fragment Restaurant on SanityRestaurant {
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

  fragment Image on SanityImage {
    hotspot {
      height
      width
      x
      y
    }
    crop {
      bottom
      left
      right
      top
    }
    asset {
      _id
      metadata {
        preview: lqip
      }
    }
  }
`
