import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import ExternalLink from "components/ExternalLink"

const IconLink = ({
  icon: Icon,
  href,
  children,
  className,
  childStyles = {},
}) => (
  <ExternalLink
    href={href}
    target={href.startsWith("http") ? "_blank" : "_self"}
    rel="noopener noreferrer"
    css={{
      display: "inline-flex",
      marginBottom: 8,
      textDecoration: "none",
      whiteSpace: "nowrap",
      alignItems: "center",
      marginRight: 16,
      color: theme.n50,
      ":hover > .text": {
        textDecoration: "underline",
      },
    }}
    className={className}
  >
    <Icon css={{ marginRight: 8, flex: "0 0 16px" }} />
    <div css={childStyles} className="text">
      {children}
    </div>
  </ExternalLink>
)

export default IconLink

IconLink.propTypes = {
  icon: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  childStyles: PropTypes.object,
}
