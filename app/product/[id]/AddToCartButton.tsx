"use client";


import ReviewForm from "@/app/components/ReviewForm";
import ReviewsSection from "@/app/components/ReviewsSection ";
import RecomendedPage from "@/app/recomended/page";

import { useProductStore } from "@/app/store/useProductStore";
import { useEffect, useState } from "react";

interface Props {
  productId: string;
}

const AddToCartButton = ({ productId }: Props) => {
  const { addToCart } = useProductStore();
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("karfora-user") || "{}") : null;
    setUserToken(user?.token || "");
  }, []);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault(); // ✅ مهم جدًا عشان يمنع الريفرش
    addToCart(productId);
  };

  return (
    <div className="flex flex-col my-5">
      <div>
        <button
          type="submit"
          onClick={handleAddToCart}
          className="navbar text-black py-2 px-6 my-3 rounded-3xl"
        >
          Add to Cart
        </button>
      </div>

      {/* ✅ الفورم الخاصة بإضافة الريفيو */}
      <ReviewForm productId={productId} userToken={userToken} />

      <div className="my-12">
      <ReviewsSection productId={productId} />
      </div>

    

      <div className="my-12">
        <RecomendedPage />
      </div>
    </div>
  );
};

export default AddToCartButton;
