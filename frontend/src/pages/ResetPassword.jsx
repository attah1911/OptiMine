import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../services/authService";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { HiOutlineKey } from "react-icons/hi";
import { getErrorMessage } from "../utils/helpers";
import toast from "react-hot-toast";
import Logo from "../components/common/Logo";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Token tidak valid");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword(
        token,
        formData.newPassword
      );

      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sage-300 via-sage-400 to-sage-500 flex items-center justify-center px-4 py-8">
      <Logo containerClasses="absolute top-6 left-6" size="w-32 h-16" />
      <article className="w-full max-w-md">
        {/* Header */}
        <header className="text-center mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
            <HiOutlineKey className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">
            Reset Password
          </h1>
          <p className="text-sm text-sage-100">Masukkan password baru Anda</p>
        </header>

        {/* Form Card */}
        <section className="bg-white rounded-xl shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              label="Password Baru"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Masukkan password baru"
              disabled={isLoading}
              autoFocus
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Masukkan ulang password baru"
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              loadingText="Mereset..."
              fullWidth
            >
              Reset Password
            </Button>
          </form>

          {/* Back to Login */}
          <nav className="mt-5 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-sage-600 hover:text-sage-800"
            >
              ← Kembali ke login
            </button>
          </nav>
        </section>
      </article>
    </main>
  );
};

export default ResetPassword;
