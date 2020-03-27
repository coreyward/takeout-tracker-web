import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"
import Helmet from "react-helmet"
import theme, { globalStyles } from "styles/theme"
import Header from "components/Header"
import AnnouncementBanner from "components/AnnouncementBanner"

const Layout = ({ title, description, children, className }) => {
  const metaTitle = `${title ? `${title} - ` : ""} Takeout Tracker`
  const metaDesc = description

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
          content="https://www.takeouttracker.com/opengraph-v2.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image"
          content="https://www.takeouttracker.com/tile.png"
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="twitter:card" content="summary_large_image" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg?v=2"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <meta name="apple-mobile-web-app-title" content="Takeout Tracker" />
        <meta name="application-name" content="Takeout Tracker" />
        <meta name="msapplication-TileColor" content="#182c44" />
        <meta name="theme-color" content="#182c44"></meta>
      </Helmet>

      <div
        css={{
          "--pagePadding": "24px",
          [theme.mobile]: { "--pagePadding": "16px" },
        }}
        className={className}
      >
        {announcement.nodes.length > 0 && (
          <AnnouncementBanner copy={announcement.nodes[0].copy} />
        )}

        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
