import AuthLayout from "../../components/Layouts/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Mining Value Chain Optimization"
      subtitle="Silahkan login untuk melanjutkan ke dashboard"
    >
      <h2 className="text-xl font-semibold text-center text-primary mb-5">
        Login
      </h2>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
