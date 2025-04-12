//CSS imports
import "./Avatar.css";

function Avatar({
  imageUrl,
  tooltip,
  size = 40,
  padding = 0,
  handleClick,
  status,
  hover = false,
}) {
  return (
    <div
      className="avatar-container"
      onClick={handleClick}
      style={(handleClick || tooltip) && { cursor: "pointer" }}
    >
      <img
        src={imageUrl}
        alt="avatar"
        className={`avatar-image ${hover ? "hover" : ""}`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          padding: `${padding}px`,
        }}
      />
      {tooltip && <div className="tooltip">{tooltip}</div>}
      {status && <div className={`status-icon ${status}`}></div>}
    </div>
  );
}

export default Avatar;
