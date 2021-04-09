import React from "react"
import PropTypes from "prop-types"
import Markdown from "markdown-to-jsx"
import { Link, graphql } from "gatsby"
import theme from "styles/theme"
import Image from "components/Image"
import hexToRgb from "lib/hexToRgb"
import preventWidows from "lib/preventWidows"
import Icons from "lib/icons"

const ListCloud = ({ title, description, lists, truncate }) => (
  <div css={{ padding: "var(--pagePadding)" }}>
    <h2 css={{ ...theme.t2, color: theme.n80, marginBottom: 8 }}>{title}</h2>

    {description && (
      <Markdown options={{ forceBlock: true }} css={{ margin: 0 }}>
        {description}
      </Markdown>
    )}

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
          css={[
            {
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
              ":nth-of-type(2n+1)": {
                "--rotation": "-2deg",
              },
              ":nth-of-type(3n+2)": {
                "--rotation": "2deg",
              },
              ":nth-of-type(5n+3)": {
                "--rotation": "-3deg",
              },
              ":nth-of-type(7n+5)": {
                "--rotation": "3deg",
              },
            },

            truncate && {
              // Hide extras, avoid widows
              ":nth-of-type(n+10)": {
                display: "none",
              },
              "@media (max-width: 1579px) and (min-width: 1272px)": {
                ":nth-of-type(n+8)": {
                  display: "none",
                },
              },
              "@media (max-width: 1271px) and (min-width: 964px)": {
                ":nth-of-type(n+9)": {
                  display: "none",
                },
              },
              "@media (max-width: 963px) and (min-width: 656px)": {
                ":nth-of-type(n+6)": {
                  display: "none",
                },
              },
              "@media (max-width: 655px)": {
                ":nth-of-type(n+4)": {
                  display: "none",
                },
              },
            },
          ]}
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
              transformOrigin:
                background.hotspot &&
                [background.hotspot.x, background.hotspot.y]
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

      {truncate && (
        <Link
          to="/lists/"
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 125,
            background: hexToRgb(theme.n20, 0.5),
            padding: "16px 24px",
            color: theme.n80,
            fontSize: 20,
            fontWeight: 500,
            textDecoration: "none",
            textAlign: "center",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            transition: "background 250ms",
            "--rotation": "1deg",
            ":hover": {
              background: theme.n20,
              svg: {
                transform: "translateX(8px) rotateY(180deg)",
              },
            },
          }}
        >
          See all curated lists
          <Icons.LeftChevron
            css={{
              transform: "rotateY(180deg)",
              marginLeft: 8,
              transition: "transform 250ms ease-out",
            }}
          />
        </Link>
      )}
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

export const query = graphql`
  fragment ListCloud on SanityListCloud {
    _key
    _type
    title
    description
    lists {
      _key: _id
      name
      slug {
        current
      }
      background {
        ...Image
      }
      author {
        name
        avatar {
          ...Image
        }
      }
    }
  }
`
