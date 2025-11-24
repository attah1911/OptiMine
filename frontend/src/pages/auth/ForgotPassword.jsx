import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { HiOutlineMail } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import { getErrorMessage, isValidEmail } from "../../utils/helpers";
import toast from "react-hot-toast";
import Logo from "../../components/common/Logo";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email harus diisi");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Format email tidak valid");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.forgotPassword(email);

      if (response.success) {
        toast.success(response.message);
        setEmail("");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-sage-300 via-sage-400 to-sage-500 flex items-center justify-center px-4 py-8">
      <Logo containerClasses="absolute top-6 left-6" size="w-32 h-16" />
      <article className="w-full max-w-md">
        {/* Header */}
        <header className="text-center mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
            <HiOutlineMail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">
            Lupa Password
          </h1>
          <p className="text-sm text-sage-100">
            Masukkan email Anda untuk menerima link reset password
          </p>
        </header>

        {/* Form Card */}
        <section className="bg-white rounded-xl shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              disabled={isLoading}
              autoFocus
            />

            <Button
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              loadingText="Mengirim..."
              fullWidth
            >
              Kirim Link Reset Password
            </Button>
          </form>

          {/* Back to Login */}
          <nav className="mt-5 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-sage-600 hover:text-sage-800 flex items-center justify-center gap-1"
            >
              <IoArrowBack className="w-4 h-4" />
              Kembali ke login
            </button>
          </nav>
        </section>
      </article>
    </main>
  );
};

export default ForgotPassword;
