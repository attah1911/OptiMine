import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Input = ({
  id,
  name,
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  autoFocus = false,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-sage-700 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          className={`w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            isPasswordField ? "pr-10" : ""
          } ${className}`}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-500 hover:text-sage-700"
          >
            {showPassword ? (
              <IoEyeOffOutline className="w-5 h-5" />
            ) : (
              <IoEyeOutline className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
