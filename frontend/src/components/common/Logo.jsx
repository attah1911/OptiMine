const Logo = ({
  variant = "logo_optimine1",
  size = "w-32 h-16",
  className = "",
  containerClasses = "",
  alt = "OptiMine Logo",
}) => {
  return (
    <div className={`${containerClasses}`}>
      <div
        className={`${size} bg-white rounded-full items-center justify-center shadow-lg ${className}`}
      >
        <img
          src={`/${variant}.svg`}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Logo;
