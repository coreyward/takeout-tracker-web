import { graphql } from "gatsby"

export const fragments = graphql`
  fragment Restaurant on SanityRestaurant {
    _id
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
    locations {
      _key
      address
      hours
      openForBusiness
      phoneNumber
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
