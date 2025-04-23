"use client";

import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SendOtp = () => {
  const { setAuthUser, authUser, isAuthChecked } = useAuthContext();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && !authUser) {
      router.push("/login");
    }
  }, [authUser, isAuthChecked, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://halwany-backend-production.up.railway.app/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${authUser?.token || ""}`,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل التحقق");
      }

      // // ✅ حفظ المستخدم بعد التحقق
      // localStorage.setItem("karfora-user", JSON.stringify(data));
      // setAuthUser(data);

      // ✅ حفظ التوكن والمستخدم بعد التحقق من OTP
      const userData = {
        token: data.token,
        email: data.user.email,
        role: data.user.role,
      };

      localStorage.setItem("karfora-user", JSON.stringify(userData));
      setAuthUser(userData);
      toast.success("تم التحقق بنجاح 🎉");
      router.push("/");
    } catch (err: any) {
      toast.error("رمز التحقق غير صحيح ❌");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthChecked) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mt-20 mx-auto max-w-5xl test p-5">
        <h1 className="text-3xl font-bold text-center">Halwany</h1>
        <form className="my-10" onSubmit={handleSubmit}>
          <h1 className="my-5">Enter Code</h1>
          <p>Sent to {authUser?.user?.email}</p>
          <input
            type="text"
            maxLength={6}
            className="border border-black p-2 input input-bordered w-full max-w-xs"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white my-5 text-center w-full max-w-xs border border-black p-2"
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SendOtp;
