import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import Icons from "lib/icons"
import hexToRgb from "lib/hexToRgb"

export const MODES = {
  CARD: "card",
  TILE: "tile",
  MAP: "map",
}

const ModeSelector = ({ activeMode, setMode, className }) => (
  <div
    css={{
      background: theme.n20,
      display: "flex",
      borderRadius: 2,
      overflow: "hidden",
    }}
    className={className}
  >
    <ModeButton
      active={activeMode === MODES.MAP}
      icon={Icons.MapMarker}
      onClick={() => setMode(MODES.MAP)}
    />
    <ModeButton
      active={activeMode === MODES.CARD}
      icon={Icons.Cards}
      onClick={() => setMode(MODES.CARD)}
    />
    <ModeButton
      active={activeMode === MODES.TILE}
      icon={Icons.Tiles}
      onClick={() => setMode(MODES.TILE)}
    />
  </div>
)

ModeSelector.propTypes = {
  activeMode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  className: PropTypes.string,
}

const ModeButton = ({ active, icon: Icon, onClick }) => (
  <div
    css={{
      padding: 4,
      color: active ? theme.n80 : theme.n40,
      background: !active && hexToRgb(theme.n10, 0.5),
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <Icon css={{ display: "block" }} />
  </div>
)

ModeButton.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ModeSelector
