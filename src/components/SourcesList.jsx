import React from "react"
import PropTypes from "prop-types"
import IconRow from "components/IconRow"
import Icons from "lib/icons"
import IconLink from "components/IconLink"
import theme from "styles/theme"

const SourcesList = ({ notes, urls, className }) => (
  <div className={className}>
    {notes && (
      <IconRow icon={Icons.Info} css={{ lineHeight: 1.4 }}>
        {notes}
      </IconRow>
    )}

    <ul css={{ margin: 0, padding: 0, listStyle: "none" }}>
      {urls.map((source, index) => (
        <li
          key={index}
          css={{
            margin: 0,
            display: "block",
          }}
        >
          <IconLink
            icon={Icons.Link}
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            css={{
              display: "flex",
              whiteSpace: "nowrap",
              textDecoration: "none",
              marginRight: 0,
            }}
            childStyles={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "100%",
              color: theme.n50,
            }}
          >
            {source}
          </IconLink>
        </li>
      ))}
    </ul>
  </div>
)

export default SourcesList

SourcesList.propTypes = {
  urls: PropTypes.array,
  notes: PropTypes.node,
  className: PropTypes.string,
}
