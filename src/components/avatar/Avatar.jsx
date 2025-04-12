//CSS imports
import "./Avatar.css";

import defaultTeam from "../../assets/default-team.svg";

function Avatar({ imageUrl = defaultTeam, tooltip, size = 45, handleClick }) {
  return (
    <div
      className="avatar-container"
      onClick={handleClick}
      style={tooltip && { cursor: "pointer" }}
    >
      <img
        src={imageUrl}
        alt="avatar"
        className="avatar-image"
        style={{ height: `${size}px`, width: `${size}px` }}
      />
      {tooltip && <div className="tooltip">{tooltip}</div>}
    </div>
  );
}

export default Avatar;
