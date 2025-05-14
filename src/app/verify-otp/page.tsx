"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchParams) {
      const emailFromURL = searchParams.get("email");
      if (emailFromURL) setEmail(emailFromURL);
    }
  }, [searchParams]);

  const handleVerify = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ OTP valid! Redirecting...");
      setTimeout(() => {
        router.push("/HomePage");
      }, 1500);
    } else {
      setMessage("❌ OTP salah atau kadaluarsa");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Verifikasi OTP</h2>
      <p className="mb-2">
        Kode OTP dikirim ke <strong>{email}</strong>
      </p>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Masukkan OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 w-full"
        onClick={handleVerify}
      >
        Verifikasi
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
