"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

// Fungsi Login ke Active Directory
const LoginAd = async () => {
  localStorage.setItem("Role", "Admin");
  const loginUrl = "https://login.sinarmasland.com/Account/Login?ReturnUrl=";
  const returnUrl = encodeURIComponent(window.location.origin + "/HomePage");
  window.location.href = `${loginUrl}${returnUrl}`;
};

export default function LoginPage() {
  return (
    <div
      className="grid min-h-screen grid-cols-1 md:grid-cols-2"
      style={{
        backgroundImage: `url('/BGLogin.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Kiri: Gambar Login */}
      <div className="hidden md:flex items-center justify-center p-4">
        <div className="relative">
          <Image
            src="/LoginPage.png"
            alt="Login Image"
            width={600}
            height={600}
            className="rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Kanan: Form Login */}
      <div className="flex flex-col justify-center px-8 sm:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/LogoDigitalArsip.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>

          {/* Judul */}
          <h2 className="text-5xl font-bold mb-2">Hi, Welcome Back 👋</h2>
          <p className="text-gray-600 mb-6">
            Please take a moment to log in using your credentials to explore all
            the valuable information stored within!
          </p>

          {/* Tombol Active Directory */}
          <button
            className="btn w-full btn-outline flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 mb-6 hover:bg-gray-100 transition"
            onClick={LoginAd}
          >
            <Image
              src="/LogoMicrosoft.png"
              alt="Microsoft"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium">
              Sign In With Active Directory
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-400 text-sm">or</span>
          </div>

          {/* Tombol Google */}
          <button
            className="btn w-full btn-outline flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            onClick={() => signIn("google")}
          >
            <Image src="/GoogleIcon.png" alt="Google" width={20} height={20} />
            <span className="text-sm font-medium">Sign In With Google</span>
          </button>
          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-400 text-sm">or</span>
          </div>

          {/* Tombol Google */}
          <button
            className="btn w-full btn-outline flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
            onClick={() => signIn("google")}
          >
            <Image src="/GoogleIcon.png" alt="Google" width={20} height={20} />
            <span className="text-sm font-medium">Sign In With OTP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
