import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifySuccess, authFailure } from "../store/slices/authSlice";
import { authService } from "../services/authService";
import Button from "../components/common/Button";
import CodeInput from "../components/common/CodeInput";
import InfoBanner from "../components/common/InfoBanner";
import { HiOutlineMail } from "react-icons/hi";
import { getErrorMessage } from "../utils/helpers";
import toast from "react-hot-toast";

const VERIFICATION_CODE_LENGTH = 6;

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pendingIdentifier, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const identifier = location.state?.identifier || pendingIdentifier;
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.role}`);
      return;
    }

    if (!identifier) {
      toast.error("Silakan login terlebih dahulu");
      navigate("/login");
    }
  }, [identifier, navigate, isAuthenticated, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== VERIFICATION_CODE_LENGTH) {
      toast.error(`Kode verifikasi harus ${VERIFICATION_CODE_LENGTH} digit`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.verifyCode(identifier, code);

      if (response.success) {
        dispatch(
          verifySuccess({
            user: response.data.user,
            token: response.data.token,
          })
        );
        toast.success(response.message);
        navigate(`/dashboard/${response.data.user.role}`);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(authFailure(errorMessage));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      const response = await authService.resendCode(identifier);

      if (response.success) {
        toast.success(response.message);
        setCode("");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-300 via-sage-400 to-sage-500 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
            <HiOutlineMail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">
            Verifikasi Email
          </h1>
          <p className="text-sm text-sage-100">
            Masukkan kode yang dikirim ke email Anda
          </p>
        </div>

        {/* Verify Card */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <div className="mb-5">
            <InfoBanner
              label="Kode verifikasi telah dikirim ke:"
              value={identifier}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <CodeInput value={code} onChange={setCode} disabled={isLoading} />

            <Button
              type="submit"
              disabled={isLoading || code.length !== VERIFICATION_CODE_LENGTH}
              isLoading={isLoading}
              loadingText="Memverifikasi..."
              fullWidth
            >
              Verifikasi
            </Button>
          </form>

          {/* Resend Code */}
          <div className="mt-5 text-center">
            <p className="text-xs text-sage-600 mb-2">Tidak menerima kode?</p>
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className="text-xs font-medium text-primary hover:text-primary-dark underline disabled:opacity-50"
            >
              {isResending ? "Mengirim ulang..." : "Kirim ulang kode"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-3 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-xs text-sage-600 hover:text-sage-800"
            >
              ← Kembali ke login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
