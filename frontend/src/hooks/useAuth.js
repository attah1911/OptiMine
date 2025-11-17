import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  authFailure,
} from "../store/slices/authSlice";
import { authService } from "../services/authService";
import { getErrorMessage } from "../utils/helpers";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (identifier, password) => {
    if (!identifier || !password) {
      toast.error("Semua field harus diisi");
      return;
    }

    setIsLoading(true);
    dispatch(loginStart());

    try {
      const response = await authService.login(identifier, password);

      if (response.success) {
        dispatch(loginSuccess({ identifier }));
        toast.success(response.message);
        navigate("/verify", { state: { identifier } });
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      dispatch(authFailure(errorMessage));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
};
