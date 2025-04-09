//CSS
import "./Input.css";

function Input({
  name,
  options,
  error,
}: {
  name: string;
  options: object;
  error: { message?: string } | undefined;
}) {
  return (
    <div className="input-container">
      <label className="label">{name}</label>
      <input
        {...options}
        type="text"
      ></input>
      <p
        className="form-error"
        style={!error ? { opacity: 0 } : {}}
      >
        {error ? error.message : "e"}
      </p>
    </div>
  );
}

export default Input;
