import { graphql } from "gatsby"

export const fragments = graphql`
  fragment Restaurant on SanityRestaurant {
    _id
    confirmedAt
    menuUrl
    name: title
    orderingNotes
    orderUrl
    policyNotes
    sourceNotes
    sourceUrls
    tags
    takeoutOptions
    unverified
    website
    locations {
      _key
      address
      hours
      openForBusiness
      orderPhone: phoneNumber
      geoLocation {
        lat
        lng
      }
    }
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
