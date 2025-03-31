import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline"; // Different styles
  size?: "small" | "large";
  handleClick?: () => void;
  disabled?: boolean;
}

function Button({
  children,
  variant = "primary",
  size = "large",
  handleClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button ${variant} ${size}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
