import type { NextApiRequest, NextApiResponse } from "next";
import { otpStorage } from "../api/send-otp";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, otp } = req.body;

  const validOtp = otpStorage.get(email);
  if (validOtp && validOtp === otp) {
    otpStorage.delete(email); // hapus setelah sukses
    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Invalid OTP" });
}
