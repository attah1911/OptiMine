import { body, validationResult } from "express-validator";
import { USER_ROLES } from "../constants/index.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const loginValidation = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Email atau username harus diisi"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  validateRequest,
];

export const verificationValidation = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Email atau username harus diisi"),
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Kode verifikasi harus diisi")
    .isLength({ min: 6, max: 6 })
    .withMessage("Kode verifikasi harus 6 digit"),
  validateRequest,
];

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username harus diisi")
    .isLength({ min: 3, max: 100 })
    .withMessage("Username harus antara 3-100 karakter")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "Username hanya boleh mengandung huruf, angka, dan underscore"
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("role")
    .notEmpty()
    .withMessage("Role harus diisi")
    .isIn(Object.values(USER_ROLES))
    .withMessage(`Role harus ${Object.values(USER_ROLES).join(" atau ")}`),
  validateRequest,
];

export const forgotPasswordValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email tidak valid")
    .normalizeEmail(),
  validateRequest,
];

export const resetPasswordValidation = [
  body("token").trim().notEmpty().withMessage("Token harus diisi"),
  body("newPassword")
    .notEmpty()
    .withMessage("Password baru harus diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  validateRequest,
];
