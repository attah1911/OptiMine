import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter configuration error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

export const sendPasswordResetEmail = async (email, resetLink, username) => {
  const mailOptions = {
    from: `"Mining Distribution System" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset Password - Mining Distribution System",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667761 0%, #8B9A7F 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Mining Distribution System</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #333;">Halo, ${username}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Anda menerima email ini karena ada permintaan untuk mereset password akun Anda.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Klik tombol di bawah ini untuk mereset password Anda:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #667761; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #999; font-size: 14px; line-height: 1.6;">
            Atau copy link berikut ke browser Anda:
          </p>
          <p style="color: #667761; font-size: 14px; word-break: break-all;">
            ${resetLink}
          </p>
          <p style="color: #666; line-height: 1.6; margin-top: 30px;">
            <strong>Link ini akan kedaluwarsa dalam 15 menit.</strong>
          </p>
          <p style="color: #999; font-size: 14px; line-height: 1.6; margin-top: 20px;">
            Jika Anda tidak meminta reset password, abaikan email ini dan password Anda tidak akan berubah.
          </p>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 Mining Distribution System. All rights reserved.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Reset password email sent to ${email}`);
    return {
      success: true,
      message: "Reset email sent successfully",
    };
  } catch (error) {
    console.error("❌ Error sending reset email:", error);
    return {
      success: false,
      message: "Failed to send reset email",
      error: error.message,
    };
  }
};

export const sendVerificationEmail = async (email, code, username) => {
  const mailOptions = {
    from: `"Mining Distribution System" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Kode Verifikasi Login - Mining Distribution System",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667761 0%, #8a9a7f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; border: 2px solid #667761; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .code { font-size: 32px; font-weight: bold; color: #667761; letter-spacing: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏔️ Mining Distribution System</h1>
            <p>Perencanaan & Distribusi Tambang</p>
          </div>
          <div class="content">
            <h2>Halo, ${username}!</h2>
            <p>Anda baru saja melakukan permintaan login ke sistem. Untuk melanjutkan, silakan gunakan kode verifikasi berikut:</p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <p><strong>Kode ini akan kedaluwarsa dalam ${process.env.VERIFICATION_CODE_EXPIRES_IN} menit.</strong></p>
            
            <p>Jika Anda tidak melakukan permintaan ini, abaikan email ini dan pastikan akun Anda aman.</p>
            
            <p>Salam,<br><strong>Tim Mining Distribution System</strong></p>
          </div>
          <div class="footer">
            <p>Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

export default transporter;
