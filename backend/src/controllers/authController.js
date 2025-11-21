import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/database.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../config/email.js";
import { VERIFICATION_CODE } from "../constants/index.js";
import crypto from "crypto";

const generateVerificationCode = () => {
  return crypto
    .randomInt(VERIFICATION_CODE.MIN, VERIFICATION_CODE.MAX)
    .toString();
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Register new user
// export const register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     const existingUser = await query(
//       "SELECT * FROM users WHERE email = $1 OR username = $2",
//       [email, username]
//     );

//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Email atau username sudah terdaftar",
//       });
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const result = await query(
//       "INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, created_at",
//       [username, email, passwordHash, role]
//     );

//     const newUser = result.rows[0];

//     res.status(201).json({
//       success: true,
//       message: "Registrasi berhasil",
//       data: {
//         id: newUser.id,
//         username: newUser.username,
//         email: newUser.email,
//         role: newUser.role,
//         created_at: newUser.created_at,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Terjadi kesalahan pada server",
//     });
//   }
// };

// Step 1: Login and send verification code
export const logins = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log("🔐 Login attempt:", { identifier });

    const result = await query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [identifier]
    );

    if (result.rows.length === 0) {
      console.log("❌ User not found in database");
      return res.status(401).json({
        success: false,
        message: "Email/username atau password salah",
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      console.log("❌ User is not active");
      return res.status(401).json({
        success: false,
        message: "Akun Anda telah dinonaktifkan",
      });
    }

    console.log("🔑 Comparing password...");
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log("🔍 Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Password mismatch");
      return res.status(401).json({
        success: false,
        message: "Email/username atau password salah",
      });
    }

    console.log("✅ Authentication successful!");

    const code = generateVerificationCode();
    const expiresAt = new Date(
      Date.now() +
        parseInt(process.env.VERIFICATION_CODE_EXPIRES_IN) * 60 * 1000
    );

    await query(
      "INSERT INTO verification_codes (user_id, code, expires_at) VALUES ($1, $2, $3)",
      [user.id, code, expiresAt]
    );

    const emailResult = await sendVerificationEmail(
      user.email,
      code,
      user.username
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengirim kode verifikasi. Silakan coba lagi.",
      });
    }

    res.json({
      success: true,
      message: "Kode verifikasi telah dikirim ke email Anda",
      data: {
        email: user.email,
        expiresIn: process.env.VERIFICATION_CODE_EXPIRES_IN,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Step 2: Verify code and complete login
export const verifyCode = async (req, res) => {
  try {
    const { identifier, code } = req.body;

    const userResult = await query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [identifier]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const user = userResult.rows[0];

    const codeResult = await query(
      "SELECT * FROM verification_codes WHERE user_id = $1 AND code = $2 AND is_used = false ORDER BY created_at DESC LIMIT 1",
      [user.id, code]
    );

    if (codeResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Kode verifikasi tidak valid",
      });
    }

    const verificationCode = codeResult.rows[0];

    if (new Date(verificationCode.expires_at) < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Kode verifikasi sudah kedaluwarsa",
      });
    }

    // Mark code as used
    await query("UPDATE verification_codes SET is_used = true WHERE id = $1", [
      codeResult.rows[0].id,
    ]);

    // Update last login
    await query("UPDATE users SET last_login = NOW() WHERE id = $1", [user.id]);

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const result = await query(
      "SELECT id, username, email, role, created_at, last_login FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Resend verification code
export const resendCode = async (req, res) => {
  try {
    const { identifier } = req.body;

    const result = await query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [identifier]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const user = result.rows[0];

    // Generate new verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(
      Date.now() +
        parseInt(process.env.VERIFICATION_CODE_EXPIRES_IN) * 60 * 1000
    );

    await query(
      "INSERT INTO verification_codes (user_id, code, expires_at) VALUES ($1, $2, $3)",
      [user.id, code, expiresAt]
    );

    const emailResult = await sendVerificationEmail(
      user.email,
      code,
      user.username
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengirim kode verifikasi. Silakan coba lagi.",
      });
    }

    res.json({
      success: true,
      message: "Kode verifikasi baru telah dikirim ke email Anda",
    });
  } catch (error) {
    console.error("Resend code error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Forgot Password - Send reset link
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userResult = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userResult.rows.length === 0) {
      return res.json({
        success: true,
        message: "Jika email terdaftar, link reset password telah dikirim",
      });
    }

    const user = userResult.rows[0];
    const resetToken = generateResetToken();
    const expiresAt = new Date(
      Date.now() +
        parseInt(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN || 15) * 60 * 1000
    );

    await query(
      "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, resetToken, expiresAt]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const emailResult = await sendPasswordResetEmail(
      user.email,
      resetLink,
      user.username
    );

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Gagal mengirim email reset password",
      });
    }

    res.json({
      success: true,
      message: "Link reset password telah dikirim ke email Anda",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Reset Password - Verify token and update password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const tokenResult = await query(
      "SELECT * FROM password_reset_tokens WHERE token = $1 AND is_used = false ORDER BY created_at DESC LIMIT 1",
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Token reset password tidak valid",
      });
    }

    const resetToken = tokenResult.rows[0];

    if (new Date(resetToken.expires_at) < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Token reset password sudah kedaluwarsa",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      hashedPassword,
      resetToken.user_id,
    ]);

    await query(
      "UPDATE password_reset_tokens SET is_used = true WHERE id = $1",
      [resetToken.id]
    );

    res.json({
      success: true,
      message: "Password berhasil diubah. Silakan login dengan password baru",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
