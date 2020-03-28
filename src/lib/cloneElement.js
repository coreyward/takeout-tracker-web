import { jsx } from "@emotion/core"

export default function cloneElement(element, config, ...children) {
  return jsx(
    element.props["__EMOTION_TYPE_PLEASE_DO_NOT_USE__"]
      ? element.props["__EMOTION_TYPE_PLEASE_DO_NOT_USE__"]
      : element.type,
    {
      key: element.key !== null ? element.key : undefined,
      ref: element.ref,
      ...element.props,
      ...config,
    },
    ...children
  )
}
