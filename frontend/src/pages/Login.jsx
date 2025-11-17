import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Mining Distribution System"
      subtitle="Perencanaan & Distribusi Tambang"
    >
      <h2 className="text-xl font-semibold text-center text-primary mb-5">
        Login
      </h2>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
