import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.identifier, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <Input
        id="identifier"
        name="identifier"
        type="text"
        label="Email / Username"
        value={formData.identifier}
        onChange={handleChange}
        placeholder="Masukkan email atau username"
        disabled={isLoading}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Masukkan password"
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        Masuk
      </Button>

      {/* Forgot Password Link */}
      <div className="mt-3 text-center">
        <Link
          to="/forgot-password"
          className="text-sm text-sage-600 hover:text-primary"
        >
          Lupa password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
