// Dropdown.jsx
import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Dropdown({ label, onChange, options = [], error }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <div
        className="label-container"
        onClick={() => setOpen(!open)}
      >
        <p>{label}</p>
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`icon ${open ? "rotated" : ""}`}
        />
      </div>
      <div className={`dropdown-options ${open ? "show" : ""}`}>
        {options.map((option) => (
          <span
            key={option}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
            className="dropdown-option"
          >
            {option}
          </span>
        ))}
      </div>
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
}

export default Dropdown;
