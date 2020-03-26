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
    <h2 css={{ ...theme.t2, color: theme.n80, marginBottom: 8 }}>{title}</h2>

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
      {lists.map(({ _key, name, slug, background, author }) => (
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
            overflow: "hidden",
            "--rotation": "1deg",
            ":hover": {
              ".background": {
                transform: "scale(1.2) rotate(var(--rotation))",
              },
              ".colorFilter": {
                background: "transparent",
              },
              ".authorAvatar": {
                filter: "grayscale(0%)",
              },
            },
            ":nth-child(2n+1)": {
              "--rotation": "-2deg",
            },
            ":nth-child(3n+2)": {
              "--rotation": "2deg",
            },
            ":nth-child(5n+3)": {
              "--rotation": "-3deg",
            },
            ":nth-child(7n+5)": {
              "--rotation": "3deg",
            },
          }}
        >
          <Image
            {...background}
            className="background"
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
              transformOrigin: [background.hotspot.x, background.hotspot.y]
                .map(n => `${Math.round(n * 100)}%`)
                .join(" "),
              transition: "transform 2s cubic-bezier(0.25, 0, 0.15, 1)",
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
              transition: "background 1s",
            }}
          />

          <div
            css={{
              position: "relative",
              zIndex: 2,
            }}
          >
            {preventWidows(name)}
            {author && (
              <div
                css={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 12,
                  color: theme.n80,
                  marginTop: 8,
                }}
              >
                {author.avatar && (
                  <Image
                    {...author.avatar}
                    className="authorAvatar"
                    width={20}
                    height={20}
                    alt={author.name}
                    css={{
                      display: "block",
                      width: 20,
                      borderRadius: 24,
                      boxShadow: `0 2px 3px 0px ${hexToRgb(theme.n10, 0.4)}`,
                      boxSizing: "content-box",
                      filter: "grayscale(100%)",
                      transition: "filter 500ms",
                      marginRight: 8,
                    }}
                  />
                )}
                <div css={{ letterSpacing: "0.01em" }}>by {author.name}</div>
              </div>
            )}
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
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
          asset: PropTypes.object.isRequired,
        }),
      }),
    })
  ).isRequired,
}
