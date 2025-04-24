"use client";

import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Page = () => {
  const { setAuthUser } = useAuthContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://halwany-backend-production.up.railway.app/auth/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      // ✅ حفظ البيانات
      localStorage.setItem("otp", data.otp); // otp المؤقت
      localStorage.setItem("karfora-user", JSON.stringify(data)); // المستخدم
      setAuthUser(data);
      console.log("otp", data.otp);
      

      toast.success("تم إرسال كود التحقق إلى البريد الإلكتروني");
      window.location.href = "/sendOtp";
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-20 mx-auto max-w-5xl test p-5">
        <h1 className="text-3xl font-bold text-center">Halwany</h1>
        <form className="my-10" onSubmit={handleSubmit}>
          <h1 className="my-5">Login</h1>
          <p>Enter your email and w&apos;ill send you a login code</p>
          <input
            type="email"
            className="border border-black p-2 input input-bordered w-full max-w-xs"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white my-5 text-center w-full max-w-xs border border-black p-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
