"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SignIn({ close }: { close: () => void }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      // verifying email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setError(emailRegex.test(value) ? "" : "Invalid email format");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50 p-5">
      <div className="relative w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>

        <div className="text-left">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full mt-1 rounded-md"
            placeholder="Enter your email"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <label className="block font-semibold mt-3">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className="border p-2 w-full mt-1 rounded-md pr-10"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <button className="mt-4 bg-blue-500 w-full p-2 rounded-md text-white font-bold">
            Sign In
          </button>
        </div>

        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500 text-xl"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
