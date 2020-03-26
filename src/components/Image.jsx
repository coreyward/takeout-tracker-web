import React from "react"
import PropTypes from "prop-types"
import sanityClient from "@sanity/client"
import sanityImageUrl from "@sanity/image-url"

export const SANITY_REF_PATTERN = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/
export const DEFAULT_IMAGE_CONFIG = {
  auto: "format",
  fit: "max",
}

export const client = sanityClient({
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: true,
})
export const builder = sanityImageUrl(client)

const Image = ({
  asset,
  hotspot,
  crop,
  width,
  height,
  size,
  config = {},
  ...props
}) => {
  asset = {
    _id: asset._id,
    hotspot,
    crop,
  }

  // Setup/configuration
  width = width || size?.[0]
  height = height || size?.[1]
  const { dimensions, format } = parseImageRef(asset._id)

  // Short circuit for SVGs
  if (format === "svg") {
    return <img src={imageUrl(asset)} {...props} />
  }

  // Determine dimensions and ratios for srcSet calculations
  const origRatio = dimensions.width / dimensions.height
  width = width || dimensions.width
  height = height || Math.round(width / origRatio)
  const targetRatio = width / height
  let cropRatio = origRatio
  let maxWidth = dimensions.width
  let maxHeight = dimensions.height

  // Compensate for dimensional changes if image was cropped in Sanity
  if (crop && Object.values(crop).some(n => n > 0)) {
    const cropWidth =
      dimensions.width -
      crop.left * dimensions.width -
      crop.right * dimensions.width
    const cropHeight =
      dimensions.height -
      crop.top * dimensions.height -
      crop.bottom * dimensions.height

    cropRatio = cropWidth / cropHeight
    if (cropRatio > origRatio) {
      maxHeight = cropHeight
    } else {
      maxWidth = cropWidth
    }
  }

  // Create default src and build srcSet
  config = { ...config, width, height }
  const src = imageUrl(asset, config)
  const srcSet = Object.values(
    [0.5, 0.75, 1, 1.5, 2].reduce((set, dpr) => {
      const url = imageUrl(asset, { ...config, dpr })
      const size = Math.round(
        // For modes where Sanity will not scale up, determine
        // the anticipated final width based on the params
        ["fillmax", "max", "min"].includes(config.fit)
          ? targetRatio < origRatio
            ? Math.min(
                (maxHeight / (height * dpr)) * (width * dpr),
                width * dpr
              )
            : Math.min(width * dpr, maxWidth)
          : width * dpr
      )

      // Avoid duplicate sizes in srcSet list
      if (!set.hasOwnProperty(size)) {
        set[size] = `${url} ${size}w`
      }
      return set
    }, {})
  )

  return <img src={src} srcSet={srcSet} {...props} />
}

const parseImageRef = id => {
  const [, assetId, dimensions, format] = SANITY_REF_PATTERN.exec(id)
  const [width, height] = dimensions.split("x").map(v => parseInt(v, 10))

  return {
    assetId,
    dimensions: { width, height },
    format,
  }
}

export const imageUrl = (asset, params = {}) =>
  Object.entries({ ...DEFAULT_IMAGE_CONFIG, ...params })
    .reduce(
      (acc, [key, value]) =>
        value
          ? Array.isArray(value)
            ? acc[key](...value)
            : acc[key](value)
          : acc,
      builder.image(asset)
    )
    .url()

export default Image

Image.propTypes = {
  config: PropTypes.object,

  hotspot: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  crop: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  asset: PropTypes.oneOfType([
    PropTypes.shape({ _id: PropTypes.string.isRequired }),
    PropTypes.shape({ _ref: PropTypes.string.isRequired }),
  ]).isRequired,

  // These are only used for determining the dimensions of the generated
  // assets, not for layout. Use CSS to specify how the browser should
  // render the image instead.
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.arrayOf(PropTypes.number),

  // Default React Element Props
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  sizes: PropTypes.string,
}
