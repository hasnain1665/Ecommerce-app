import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetPasswordEmail = async (email, resetToken) => {
  const mailOptions = {
    from: `"POS App" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Password Reset Token",
    html: `<p>You requested to reset your password.</p>
      <p>Use the following token to reset your password:</p>
      <pre><strong>${resetToken}</strong></pre>
      <p>This token will expire in ${process.env.RESET_PASSWORD_EXPIRY}.</p>
      <p>If you didn't request this, please ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
