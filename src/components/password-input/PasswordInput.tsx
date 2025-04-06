//CSS
import "./PasswordInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//Dependency
import { useState } from "react";

function PasswordInput({
  options,
  error,
  children,
}: {
  options: object;
  error: { message?: string } | undefined;
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="input-container">
      {children}
      <div className="input-field">
        <input
          {...options}
          type={isVisible ? "text" : "password"}
        ></input>
        <FontAwesomeIcon
          icon={isVisible ? faEyeSlash : faEye}
          onClick={() => setIsVisible((prev) => !prev)}
        ></FontAwesomeIcon>
      </div>

      <p
        className="form-error"
        style={!error ? { opacity: 0 } : {}}
      >
        {error ? error.message : "e"}
      </p>
    </div>
  );
}

export default PasswordInput;
