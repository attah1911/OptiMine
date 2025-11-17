const CodeInput = ({
  value,
  onChange,
  label = "Kode Verifikasi (6 digit)",
  placeholder = "000000",
  maxLength = 6,
  disabled = false,
  autoFocus = true,
}) => {
  const handleChange = (e) => {
    const digitValue = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    onChange(digitValue);
  };

  return (
    <div>
      <label
        htmlFor="code-input"
        className="block text-sm font-medium text-sage-700 mb-1.5 text-center"
      >
        {label}
      </label>
      <input
        type="text"
        id="code-input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3.5 py-3 text-center text-2xl tracking-widest font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        maxLength={maxLength}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default CodeInput;

