import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"
import Helmet from "react-helmet"
import { globalStyles } from "styles/theme"
import Header from "components/Header"
import AnnouncementBanner from "components/AnnouncementBanner"

const Layout = ({ title, children, className }) => {
  const metaTitle = `${title ? `${title} - ` : ""}Austin Takeout Tracker`
  const metaDesc =
    "This project aims to track restaurants that are open during the covid-19 health crisis."

  const { announcement } = useStaticQuery(graphql`
    {
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
  `)

  return (
    <>
      <Global styles={globalStyles} />
      <Helmet title={metaTitle}>
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta name="description" content={metaDesc} />
        <meta
          property="og:image"
          content="https://www.takeouttracker.com/opengraph.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
      </Helmet>

      {announcement.nodes.length > 0 && (
        <AnnouncementBanner copy={announcement.nodes[0].copy} />
      )}
      <Header />
      <main className={className}>{children}</main>
    </>
  )
}

export default Layout

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
