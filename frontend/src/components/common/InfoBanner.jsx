const InfoBanner = ({ label, value, variant = "info" }) => {
  const variants = {
    info: "bg-primary/10 border-primary/20 text-sage-700",
    success: "bg-green-50 border-green-200 text-green-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    error: "bg-red-50 border-red-200 text-red-700",
  };

  const valueColors = {
    info: "text-primary",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  };

  return (
    <div className={`${variants[variant]} border rounded-lg p-3 text-center`}>
      <p className="text-xs">{label}</p>
      <p className={`text-sm font-semibold ${valueColors[variant]} mt-1`}>
        {value}
      </p>
    </div>
  );
};

export default InfoBanner;
