"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, MessageSquare, Sun, Moon } from "lucide-react";

import Logo from "./Logo";

const tabs = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/chat",
    label: "AI Chat",
  },
  {
    href: "/repositories",
    label: "Documentation",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-[76px] items-center justify-between pt-4">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl p-1.5">
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-5 h-9 flex items-center rounded-full text-sm transition-all
              ${
                active
                  ? "bg-[#66FC73]/12 text-[#66FC73] border border-[#66FC73]/40 shadow-[inset_0_0_20px_rgba(87,255,138,.18),0_0_35px_rgba(87,255,138,.22)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl p-1.5">
        <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
          <Sun size={16} />
        </button>

        <button className="h-9 w-9 rounded-full flex items-center justify-center bg-[#66FC73]/12 text-bg-[#66FC73]/12 border border-[#57FF8A]/20 ">
          <Moon size={16} />
        </button>

        <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
          <MessageSquare size={16} />
        </button>

        <button className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-white/10 transition">
          <Bell size={16} />
        </button>

        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400/40 to-emerald-400/10 border border-white/10 flex items-center justify-center text-xs font-semibold shadow-[inset_0_0_20px_rgba(87,255,138,.18),0_0_35px_rgba(87,255,138,.22)]">
          NM
        </div>
      </div>
    </header>
  );
}
