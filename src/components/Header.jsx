import React from "react"
import { Link } from "gatsby"
import theme from "styles/theme"
import logoUrl from "images/logo.svg"
import Icons from "lib/icons"

const Header = () => (
  <header
    css={{
      background: theme.n10,
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div
      css={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        css={{
          display: "inline-flex",
          fontWeight: 500,
          fontSize: 20,
          lineHeight: 1.2,
          color: theme.n80,
          textDecoration: "none",
        }}
      >
        <img
          src={logoUrl}
          alt=""
          css={{ width: 24, marginRight: 8, display: "block" }}
        />
        Takeout Tracker
      </Link>

      <div
        css={{
          ...theme.smallcaps,
          color: theme.n40,
          fontSize: 12,
          marginTop: 4,
          marginLeft: 8,
          lineHeight: 1,
          [theme.mobile]: {
            display: "none",
          },
        }}
      >
        Austin, TX • covid-19
      </div>
    </div>

    <div
      css={{
        display: "flex",
        alignItems: "center",
        a: {
          ...theme.smallcaps,
          fontSize: 12,
          marginLeft: 16,
          textDecoration: "none",
          color: theme.n50,
          transition: "color 250ms",
          ":hover": { color: theme.n80 },
        },
      }}
    >
      <a
        href="https://forms.gle/m4xj7dkCcnQgT6XV7"
        target="_blank"
        rel="noopener noreferrer"
        css={{
          [theme.mobile]: {
            display: "none",
          },
        }}
      >
        Submit a Restaurant
      </a>

      <a
        href="https://www.instagram.com/takeouttracker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icons.Instagram css={{ display: "block", width: 24 }} />
      </a>
    </div>
  </header>
)

export default Header
