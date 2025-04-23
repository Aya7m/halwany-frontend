"use client";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummary {
  id: string;
  totalAmount: number;
  products: Product[];
}

const OrderPage = () => {
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("order-summary");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) return <div className="p-8">No order found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order Summary</h1>
      <p className="mb-2"><strong>Order ID:</strong> {order.id}</p>
      <p className="mb-6"><strong>Total:</strong> ${order.totalAmount / 100}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {order.products.map((product) => (
          <div key={product._id} className="border rounded p-4 flex gap-4">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
