import { Resend } from "resend";
import dotenv from 'dotenv'
import { AppError } from "../utils/AppError.js";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP Code</h2>
        <p>Your verification code is:</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });
  } catch (error) {
    return new AppError("Failed to send OTP", 500);
  }
};