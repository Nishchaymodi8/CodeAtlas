"use client";

import { useParams } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

export default function RepositoryDetails() {
  const { repoName } = useParams();

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl font-bold text-white">{repoName}</h1>

          <p className="text-gray-400 mt-2">Repository Overview</p>
        </div>
      </div>
    </AppShell>
  );
}
