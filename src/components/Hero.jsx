import React from "react"
import PropTypes from "prop-types"
import { imageUrl } from "components/Image"
import Markdown from "markdown-to-jsx"
import hexToRgb from "lib/hexToRgb"
import theme from "styles/theme"

const overlay = `
  linear-gradient(
    to bottom,
    ${hexToRgb(theme.n10, 0.7)},
    ${hexToRgb(theme.n10, 0.7)} 60%
  )
`
const assetUrl = (background, width, height) => {
  const asset = {
    _id: background.asset._id,
    hotspot: background.hotspot,
    crop: background.crop,
  }

  const url = imageUrl(asset, { width, height })

  return `url(${url})`
}

const Hero = ({ title, description, background, presentation }) => (
  <div
    css={theme.expandQueries({
      padding: [64, 48, "48px 24px"],
      minHeight: 375,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: [overlay, assetUrl(background, 1440, 375)].join(", "),
      [theme.tablet]: {
        backgroundImage: [overlay, assetUrl(background, 900, 415)].join(", "),
      },
      [theme.mobile]: {
        backgroundImage: [overlay, assetUrl(background, 540, 475)].join(", "),
      },
    })}
  >
    <h1
      css={{
        ...theme.t1,
        color: "#fff",
        maxWidth: presentation === "narrow" ? 480 : 800,
      }}
    >
      {title}
    </h1>
    <Markdown
      css={theme.expandQueries({
        fontSize: [16, 15, 14],
        lineHeight: 1.4,
        color: theme.n70,
        maxWidth: presentation === "narrow" ? 480 : 600,
        textShadow: "0 0 2px rgba(0, 0, 0, 0.4)",
      })}
      options={{ forceBlock: true }}
    >
      {description}
    </Markdown>
  </div>
)

export default Hero

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  background: PropTypes.shape({
    asset: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    crop: PropTypes.object,
    hotspot: PropTypes.object,
  }).isRequired,
  presentation: PropTypes.oneOf(["narrow", "wide"]).isRequired,
}
