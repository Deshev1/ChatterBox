//CSS
import "./Input.css";

function Input({
  options,
  error,
  children,
}: {
  options: object;
  error: { message?: string } | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="input-container">
      {children}
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
