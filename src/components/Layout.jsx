import React from "react"
import PropTypes from "prop-types"
import { Global } from "@emotion/core"
import Helmet from "react-helmet"
import { globalStyles } from "styles/theme"

const Layout = ({ title, children, className }) => (
  <>
    <Global styles={globalStyles} />
    <Helmet title={`${title ? `${title} - ` : ""}Austin Takeout Tracker`} />

    <main className={className}>{children}</main>
  </>
)

export default Layout

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
