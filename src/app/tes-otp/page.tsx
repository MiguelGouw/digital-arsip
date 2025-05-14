// pages/login.tsx
"use client";
import { useState } from "react";

import { handleLogin } from "../../../pages/api/auth/login-otp"; // disesuaikan path-nya
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    try {
      await handleLogin(email);

      window.location.href = `/verify-otp?email=${email}`;
    } catch (err) {
      alert("Gagal kirim OTP");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <input
        className="border p-2"
        placeholder="Masukkan Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 ml-2"
        onClick={onSubmit}
      >
        Kirim OTP
      </button>
    </div>
  );
}
