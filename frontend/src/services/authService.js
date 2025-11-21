import api from "./api";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  login: async (identifier, password) => {
    const response = await api.post("/auth/login", { identifier, password });
    return response.data;
  },

  verifyCode: async (identifier, code) => {
    const response = await api.post("/auth/verify", { identifier, code });
    return response.data;
  },

  resendCode: async (identifier) => {
    const response = await api.post("/auth/resend-code", { identifier });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },
};
