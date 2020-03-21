import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"

const IconButton = ({
  icon: Icon,
  href,
  children,
  className,
  childStyles = {},
}) => (
  <a
    href={href}
    target={
      href.startsWith("http") || href.startsWith("mailto") ? "_blank" : "_self"
    }
    rel="noopener noreferrer"
    css={{
      display: "inline-flex",
      marginBottom: 8,
      textDecoration: "none",
      whiteSpace: "nowrap",
      alignItems: "center",
      marginRight: 16,
    }}
    className={className}
  >
    <Icon css={{ color: theme.n50, marginRight: 8, flex: "0 0 16px" }} />
    <div css={{ fontWeight: 500, color: theme.n80, ...childStyles }}>
      {children}
    </div>
  </a>
)

export default IconButton

IconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  childStyles: PropTypes.object,
}
