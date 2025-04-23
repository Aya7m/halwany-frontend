"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

interface ReviewFormProps {
  productId: string;
}

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const { authUser } = useAuthContext(); // ✅ خليه بس من هنا
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!comment) return toast.error("من فضلك أدخل تعليق");
    if (!authUser?.token) return toast.error("يجب تسجيل الدخول أولاً");
  
    try {
      setLoading(true);
      const response = await fetch(`https://halwany-backend-production.up.railway.app/review/create/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${authUser?.token || ""}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.log("Server Error Details:", data);
        throw new Error(data.message || "حدث خطأ غير متوقع");
      }
  
      toast.success("✅ تمت إضافة المراجعة");
      setComment("");
      setRating(5);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="mt-6 border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">أضف مراجعتك</h2>

      <label className="block mb-2">التقييم:</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full p-2 border mb-4 rounded"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r} ⭐</option>
        ))}
      </select>

      <label className="block mb-2">تعليقك:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full p-2 border mb-4 rounded"
        placeholder="شارك تجربتك عن المنتج"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "جاري الإرسال..." : "أرسل المراجعة"}
      </button>
    </form>
  );
};

export default ReviewForm;
