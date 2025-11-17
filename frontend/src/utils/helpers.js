export const formatDate = (date) => {
  if (!date) return "-";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(date).toLocaleDateString("id-ID", options);
};

export const getInitials = (name) => {
  if (!name) return "??";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.message ||
    "Terjadi kesalahan. Silakan coba lagi."
  );
};

export const hasRole = (userRole, allowedRoles) => {
  if (!userRole || !Array.isArray(allowedRoles)) return false;
  return allowedRoles.includes(userRole);
};

export const formatNumber = (num) => {
  if (num === null || num === undefined) return "-";
  return num.toLocaleString("id-ID");
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default {
  formatDate,
  getInitials,
  isValidEmail,
  truncateText,
  debounce,
  getErrorMessage,
  hasRole,
  formatNumber,
  sleep,
};
