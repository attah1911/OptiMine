import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "bg-white hover:bg-gray-50 text-primary border border-primary",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5" />
          Memproses...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
