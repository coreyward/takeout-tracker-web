import React from "react"
import PropTypes from "prop-types"
import Icons from "lib/icons"

const Tags = React.memo(({ tags, className }) => (
  <div css={{ display: "flex", flexWrap: "wrap" }} className={className}>
    {tags.map(tag => (
      <div
        key={tag}
        css={{
          marginRight: 8,
          marginBottom: 8,
          padding: "4px 6px",
          background: "rgba(67, 87, 112, 0.35)",
          borderRadius: 5,
          fontSize: 10,
          textTransform: "lowercase",
        }}
      >
        <Icons.Tag css={{ marginRight: 4 }} /> {tag}
      </div>
    ))}
  </div>
))

Tags.displayName = "Tags"

export default Tags

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  className: PropTypes.string,
}
