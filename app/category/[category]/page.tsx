"use client";

import React, { useEffect } from "react";
import { useProductStore } from "@/app/store/useProductStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import LoadingSpinner from "@/app/loadingSpinner/page";

const CategoryPage = () => {
  const { category } = useParams() as { category: string };
  const { productCategory, getProductbyCategory, loading, addToCart } = useProductStore();

  useEffect(() => {
    console.log("Category from URL:", category);
    getProductbyCategory(category);
  }, [category, getProductbyCategory]);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    console.log("Product added to cart:", productId);
  }

  return (
    <div className="w-full h-screen mt-12">
      <h1 className="text-4xl text-center capitalize">{category}</h1>
      <div className="w-full h-full flex justify-center items-center">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
            {productCategory?.map((product) => (
              <div key={product._id} className="border border-gray-300 rounded-lg p-4">
                <Link href={`/product/${product._id}`}>
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-lg font-bold mt-4">${product.price}</p>
                  </div>
                </Link>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="bg-outline hover:border-2 text-black border-1 py-2 px-4 rounded w-full translate-0.5 mt-2"
                >
                  add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
