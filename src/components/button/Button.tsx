import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "outline"; // Different styles
  size?: "small" | "large";
  handleClick?: () => void;
  disabled?: boolean;
};

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "large",
  handleClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button ${variant} ${size}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
