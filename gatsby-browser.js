import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

// eslint-disable-next-line react/prop-types
export const wrapPageElement = ({ element }) => (
  <>
    {process.env.CRISP_WEBSITE_ID && (
      <CrispChatInjector websiteId={process.env.CRISP_WEBSITE_ID} />
    )}
    {element}
  </>
)

const CrispChatInjector = ({ websiteId }) => {
  const [didMount, setDidMount] = useState(false)

  useEffect(() => {
    window.$crisp = []
    window.CRISP_WEBSITE_ID = websiteId
    setDidMount(true)
  }, [websiteId])

  return didMount ? (
    <Helmet>
      <script src="https://client.crisp.chat/l.js" async />
    </Helmet>
  ) : null
}

CrispChatInjector.propTypes = {
  websiteId: PropTypes.string.isRequired,
}
