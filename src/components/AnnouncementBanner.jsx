import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import Markdown from "markdown-to-jsx"

const AnnouncementBanner = ({ copy, className }) => (
  <div
    css={{
      display: "flex",
      justifyContent: "center",
      background: theme.green,
      color: theme.n10,
      padding: 8,
      textAlign: "center",
      lineHeight: 1.4,
      fontSize: 12,
      [theme.mobile]: {
        textAlign: "left",
      },
    }}
    className={className}
  >
    <svg
      width="17"
      height="16"
      fill="none"
      css={{
        marginRight: 8,
        flex: "0 0 17px",
      }}
    >
      <path
        stroke="#1D1D1D"
        strokeLinecap="round"
        strokeWidth="1.33"
        d="M8.5 14.67a6.67 6.67 0 100-13.34 6.67 6.67 0 000 13.34zM8.5 5.33V8M8.5 10.67h0"
      />
    </svg>
    <Markdown
      options={{
        overrides: {
          a: ExternalLink,
        },
      }}
    >
      {copy}
    </Markdown>
  </div>
)

export default AnnouncementBanner

AnnouncementBanner.propTypes = {
  copy: PropTypes.string.isRequired,
  className: PropTypes.string,
}

const ExternalLink = props => (
  <a {...props} target="_blank" rel="noopener noreferrer" />
)
