import React from "react"
import PropTypes from "prop-types"
import Markdown from "markdown-to-jsx"
import { Link } from "gatsby"
import theme from "styles/theme"
import Image from "components/Image"
import hexToRgb from "lib/hexToRgb"
import preventWidows from "lib/preventWidows"

const ListCloud = ({ title, description, lists }) => (
  <div css={{ padding: "var(--pagePadding)" }}>
    <h2
      css={{ fontSize: 24, fontWeight: 500, color: theme.n80, marginBottom: 8 }}
    >
      {title}
    </h2>

    <Markdown options={{ forceBlock: true }} css={{ margin: 0 }}>
      {description}
    </Markdown>

    <div
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 8,
        marginTop: 16,
      }}
    >
      {lists.map(({ _key, name, slug, background }) => (
        <Link
          key={_key}
          to={slug.current}
          css={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 125,
            background: `url(${background.asset.metadata.preview})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "16px 24px",
            color: theme.n80,
            fontSize: 20,
            fontWeight: 500,
            textDecoration: "none",
            textAlign: "center",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
            ":hover": {
              ".colorFilter": {
                background: "transparent",
              },
            },
          }}
        >
          <Image
            {...background}
            alt=""
            width={300}
            height={150}
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "color(#f00)",
            }}
          />

          <div
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: hexToRgb(theme.n10, 0.5),
            }}
          />
          <div
            className="colorFilter"
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: theme.n10,
              mixBlendMode: "color",
              transition: "background 250ms",
            }}
          />

          <div
            css={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {preventWidows(name)}
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default ListCloud

ListCloud.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      _key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.shape({ current: PropTypes.string.isRequired })
        .isRequired,
      background: PropTypes.shape({
        asset: PropTypes.shape({
          metadata: PropTypes.shape({ preview: PropTypes.string.isRequired })
            .isRequired,
        }).isRequired,
      }).isRequired,
    })
  ).isRequired,
}
