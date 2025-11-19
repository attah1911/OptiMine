import Logo from "../common/Logo";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-sage-300 via-sage-400 to-sage-500 flex items-center justify-center px-4 py-8">
      <Logo containerClasses="absolute top-6 left-6" size="w-32 h-16" />
      <article className="w-full max-w-md mb-10">
        <header className="text-center mb-6">
          <h1 className="text-xl font-semibold text-white mb-1">{title}</h1>
          <p className="text-sm text-sage-100">{subtitle}</p>
        </header>

        <section className="bg-white rounded-xl shadow-2xl p-6">
          {children}
        </section>
      </article>
    </main>
  );
};

export default AuthLayout;
