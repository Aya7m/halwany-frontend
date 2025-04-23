

"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://halwany-backend-production.up.railway.app/auth/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Message sent!')
        setForm({ name: "", email: "", phone: "", comment: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      toast.error("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center">Get In Touch</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="comment"
        placeholder="Comment"
        value={form.comment}
        onChange={handleChange}
        rows={4}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
