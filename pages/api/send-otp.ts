import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Simpan OTP sementara di memori (hanya untuk demo, bukan untuk production)
const otpStorage = new Map<string, string>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit

  // Kirim email pakai nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // bisa juga pakai smtp
    auth: {
      user: "digitalarsiptesting@gmail.com",
      pass: "tpwj jixx ptdr pjry",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Digital Arsip Testing" <${"digitalarsiptesting@gmail.com"}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    // Simpan OTP sementara (misalnya selama 5 menit)
    otpStorage.set(email, otp);
    setTimeout(() => otpStorage.delete(email), 5 * 60 * 1000);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email Error:", err);
    return res.status(500).json({ message: "Failed to send OTP", error: err });
  }
}

// Export OTP storage (untuk verifikasi nanti)
export { otpStorage };
