import express from "express";
import {
  register,
  login,
  verifyCode,
  getCurrentUser,
  resendCode,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";
import {
  loginValidation,
  verificationValidation,
  registerValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/verify", verificationValidation, verifyCode);
router.post("/resend-code", resendCode);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

// Protected routes
router.get("/me", authenticateToken, getCurrentUser);

export default router;
