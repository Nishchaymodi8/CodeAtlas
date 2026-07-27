"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();
      console.log("Status:", response.status);
      console.log("Response:", data);

      if (response.ok) {
        alert("✅ Account created successfully!");

        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        const error =
          data.email?.[0] ||
          data.username?.[0] ||
          data.password?.[0] ||
          data.detail ||
          "Registration failed.";
        console.log(data);
        alert(JSON.stringify(data));
        alert(error);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-[450px] rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10">
        <h1 className="text-4xl font-bold text-white text-center">
          Code<span className="text-green-400">Atlas</span>
        </h1>

        <p className="text-center text-gray-400 mt-2">Create Account</p>

        <form onSubmit={registerUser} className="mt-10 space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />

          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-green-400 text-black font-semibold py-4 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
