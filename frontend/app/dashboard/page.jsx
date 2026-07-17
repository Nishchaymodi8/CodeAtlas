"use client";

import AppShell from "@/components/layout/AppShell";
import { GlassCard, GlassPanel } from "@/components/ui/GlassCard";
import {
  FolderGit2,
  Sparkles,
  Network,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    label: "Repositories Imported",
    value: "24",
    delta: "+3 this week",
    icon: FolderGit2,
  },
  {
    label: "AI Summaries",
    value: "112",
    delta: "+18 this week",
    icon: Sparkles,
  },
  {
    label: "Architecture Analyses",
    value: "37",
    delta: "+6 this week",
    icon: Network,
  },
  {
    label: "Recent Activity",
    value: "5h ago",
    delta: "atlas-core",
    icon: Clock,
  },
];

const repos = [
  {
    owner: "vercel",
    name: "next.js",
    description: "The React Framework for the Web",
    updated: "2h ago",
    color: "#3178c6",
  },
  {
    owner: "facebook",
    name: "react",
    description: "A JavaScript library for building UI",
    updated: "5h ago",
    color: "#61dafb",
  },
  {
    owner: "openai",
    name: "openai-node",
    description: "Official OpenAI SDK",
    updated: "Yesterday",
    color: "#22c55e",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero */}

        <GlassPanel className="p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">
                Workspace
              </p>

              <h1 className="mt-2 text-4xl font-bold text-white">CodeAtlas</h1>

              <p className="mt-3 max-w-xl text-gray-400">
                Everything AI has learned about your repositories in one place.
              </p>
            </div>

            <div className="rounded-full border border-emerald-400/20 bg-[#57FF8A]/12 px-4 py-2 text-xs text-[#57FF8A]">
              ● All systems operational
            </div>
          </div>
        </GlassPanel>

        {/* Stats */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <GlassCard key={item.label} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#57FF8A]/12">
                    <Icon size={18} className="text-[#57FF8A]" />
                  </div>

                  <ArrowUpRight size={16} className="text-gray-500" />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-white">
                  {item.value}
                </h2>

                <p className="mt-2 text-gray-400">{item.label}</p>

                <p className="mt-3 text-xs text-[#57FF8A]">{item.delta}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Recent Repositories */}

        <GlassPanel className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Recently Opened
            </h2>

            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>

          <div className="mt-6 divide-y divide-white/5">
            {repos.map((repo) => (
              <div
                key={repo.name}
                className="flex items-center justify-between py-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: repo.color,
                    }}
                  />

                  <div>
                    <h3 className="font-medium text-white">
                      {repo.owner} / {repo.name}
                    </h3>

                    <p className="text-sm text-gray-400">{repo.description}</p>
                  </div>
                </div>

                <span className="text-sm text-gray-500">{repo.updated}</span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </AppShell>
  );
}
