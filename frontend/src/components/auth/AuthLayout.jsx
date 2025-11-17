const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-300 via-sage-400 to-sage-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mb-10">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="inline-block w-16 h-16 bg-white rounded-full items-center justify-center mb-3 shadow-lg">
            <img
              src="../../public/mountain-icon.svg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">{title}</h1>
          <p className="text-sm text-sage-100">{subtitle}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-2xl p-6">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
