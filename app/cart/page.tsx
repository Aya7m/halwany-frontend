"use client";
import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { CircleMinus, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const CartPage = () => {
  const {
    cartProducts,
    getCartProducts,
    updateCartProduct,
    removeFromCart,
  } = useProductStore();

  useEffect(() => {
    const fetchCartProducts = async () => {

      await getCartProducts();

    };
    fetchCartProducts();
  }, []);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    try {
      await updateCartProduct(productId, quantity);
      toast.success("Product quantity updated successfully");
    } catch (error: any) {
      toast.error("Failed to update product quantity");
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await removeFromCart(productId);
      toast.success("Product removed from cart successfully");
      await getCartProducts(); // إعادة تحميل المنتجات
    } catch (error: any) {
      toast.error("Failed to remove product from cart");
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51PvLS2A3g0uDnNQrSM82Rh5UE61HsPqlFpUQi3d1hqJTGvDXXVBRyDiZuzy1qtyI1ThtnjDO4h9eGdK5k2z8PCDa00jwsZr8SG"
  );

  const handleCheckout = async () => {
    if (!cartProducts || cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const validCartProducts = cartProducts.filter((product) => product.quantity > 0);
    if (validCartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const userString = localStorage.getItem("karfora-user");
    const user = userString ? JSON.parse(userString) : null;
    if (!user?.token) {
      toast.error("المستخدم غير مسجل الدخول.");
      return;
    }

    const stripe = await stripePromise;
    const response = await fetch(
      "https://halwany-backend-production.up.railway.app/payment/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${user?.token}`,
        },
        body: JSON.stringify({
          products: validCartProducts,
        }),
      }
    );

    const data = await response.json();

    // 🟢 هنا بنخزن المنتجات مع بيانات الدفع
    const orderSummary = {
      id: data.id,
      totalAmount: data.totalAmount,
      products: validCartProducts,
    };

    localStorage.setItem("order-summary", JSON.stringify(orderSummary));


    if (response.status === 500) {
      console.error("Error:", data);
      return;
    }

    await stripe?.redirectToCheckout({ sessionId: data.id });

  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-500">
        Your cart is empty
      </div>
    );
  }



  return (
    <div className="w-full min-h-screen mt-12">
      <h2 className="text-center text-4xl my-6">Your Cart</h2>
      <div className="max-w-7xl mx-auto flex-col justify-center items-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
          {cartProducts.map((product) => (
            <div
              key={product._id}
              className="border border-gray-300 rounded-lg p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-md text-gray-600 mt-2">{product.description}</p>
              <p className="text-lg font-bold mt-2">${product.price}</p>
              <div className="flex justify-between items-center mt-3">
                <PlusCircle
                  className="text-gray-500 cursor-pointer"
                  onClick={() =>
                    handleUpdateQuantity(product._id, product.quantity + 1)
                  }
                />
                <p className="text-lg font-bold">Qty: {product.quantity}</p>
                <CircleMinus
                  className="text-gray-500 cursor-pointer"
                  onClick={() =>
                    handleUpdateQuantity(product._id, product.quantity - 1)
                  }
                />
              </div>
              <button
                onClick={() => handleRemoveFromCart(product._id)}
                className="bg-outline hover:border-2 text-black border-1 py-2 px-4 rounded w-full mt-4"
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Total Price: $
            {cartProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0
            )}
          </h2>
          <button
            onClick={handleCheckout}
            className="bg-black text-white py-3 px-6 my-24 rounded w-full"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
