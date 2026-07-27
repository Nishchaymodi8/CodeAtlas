"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        router.push("/dashboard");
      } else {
        alert(data.error || "Invalid username or password.");
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

        <p className="text-center text-gray-400 mt-2">Welcome Back</p>

        <form onSubmit={loginUser} className="mt-10 space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-green-400 text-black font-semibold py-4 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
