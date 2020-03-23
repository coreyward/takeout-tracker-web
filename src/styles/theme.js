import normalize from "emotion-normalize"
import expandQueries from "lib/expandQueries"

const breakpoints = {
  tablet: "@media (max-width: 900px)",
  mobile: "@media (max-width: 540px)",
  smallMobile: "@media (max-width: 370px)",
}

const colors = {
  n10: "#08121E",
  n20: "#182C44",
  n30: "#2A405A",
  n40: "#435770",
  n50: "#728194",
  n70: "#A1ABB7",
  n80: "#D0D5DB",

  green: "#4BD37B",
  red: "#AE2929",
}

const fontFamily = "Roboto, Helvetica, sans-serif"
const defaultExpansionBreaks = ["root", breakpoints.tablet, breakpoints.mobile]

export default {
  ...colors,
  ...breakpoints,

  t1: expandQueries(
    {
      fontSize: [75, 65, 45],
      fontWeight: 900,
      lineHeight: 1.1,
    },
    defaultExpansionBreaks
  ),

  t4: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    fontFeatureSettings:
      "'pnum' on, 'lnum' on, 'cpsp' on, 'ss06' on, 'ss07' on",
    letterSpacing: "0.135em",
    marginBottom: 8,
  },

  smallcaps: {
    fontWeight: 500,
    textTransform: "uppercase",
    fontFeatureSettings:
      "'pnum' on, 'lnum' on, 'cpsp' on, 'ss06' on, 'ss07' on",
  },

  expandQueries: (styles, breaks) =>
    expandQueries(styles, breaks || defaultExpansionBreaks),
}

export const globalStyles = [
  normalize,
  {
    [["*", "*:before", "*:after"]]: {
      boxSizing: "inherit",
    },

    html: {
      // Default font styles
      fontFamily: fontFamily,
      fontStyle: "normal",
      fontSize: "var(--text)",
      lineHeight: 1.25,
      wordBreak: "break-word",
      boxSizing: "border-box",
      color: colors.n50,
      background: colors.n10,

      // Improve browser font rendering
      textRendering: "optimizeLegibility",
      fontFeatureSettings: "'kern' 1",
      fontKerning: "normal",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
    },

    [["h1", "h2", "h3", "h4", "h5", "h6"]]: {
      margin: 0,
      fontSize: "inherit",
    },

    a: {
      color: "inherit",
    },

    img: {
      maxWidth: "100%",
    },
  },
]
