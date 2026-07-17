"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Sparkles,
  FileText,
  Network,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";

const items = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/repositories",
    icon: FolderGit2,
    label: "Repositories",
  },
  {
    href: "/chat",
    icon: Sparkles,
    label: "AI Chat",
  },
  {
    href: "/summary",
    icon: FileText,
    label: "AI Summary",
  },
  {
    href: "/architecture",
    icon: Network,
    label: "Architecture",
  },
  {
    href: "/readme",
    icon: BookOpen,
    label: "README",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex sticky top-[92px] h-[calc(100vh-100px)] w-[68px] flex-col items-center justify-between py-4">
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all
                ${
                  active
                    ? "border-[#57FF8A]/30 bg-[#57FF8A]/12 text-[#57FF8A] shadow-[0_0_35px_rgba(87,255,138,0.55)]"
                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-white"
                }`}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>

      <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06] transition">
        <LogOut size={18} />
      </button>
    </aside>
  );
}
