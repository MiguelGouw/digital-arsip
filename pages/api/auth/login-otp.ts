// lib/auth/login.ts
export async function handleLogin(email: string) {
  const res = await fetch("/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Gagal mengirim OTP");
  }

  return true;
}
