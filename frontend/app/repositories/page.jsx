"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import RepositoryCard from "@/components/repositories/RepositoryCard";
import { connectGitHub, githubStatus } from "@/lib/github";

import {
  getGithubRepositories,
  getImportedRepositories,
} from "@/services/repositoryService";
import { Search } from "lucide-react";

export default function RepositoriesPage() {
  const [connected, setConnected] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [importedRepos, setImportedRepos] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const status = await githubStatus();

      setConnected(status.connected);

      if (status.connected) {
        const repos = await getGithubRepositories();
        setRepositories(repos);

        const imported = await getImportedRepositories();
        setImportedRepos(imported);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase()),
  );
  const importedRepositories = filteredRepos.filter((repo) =>
    importedRepos.some((r) => r.github_repo_id === repo.id),
  );

  const availableRepositories = filteredRepos.filter(
    (repo) => !importedRepos.some((r) => r.github_repo_id === repo.id),
  );
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold text-white">Repositories</h1>

            <p className="text-gray-400 mt-3 text-lg">
              Browse & import repositories from your connected GitHub account.
            </p>
          </div>

          {!connected && (
            <button
              onClick={connectGitHub}
              className="rounded-full px-8 py-4 bg-[#57FF8A] text-black font-semibold shadow-[0_0_40px_rgba(87,255,138,.45)] hover:scale-105 transition"
            >
              + Connect GitHub
            </button>
          )}
        </div>

        {/* Search */}

        <div className="relative">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search repositories..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none focus:border-[#57FF8A]/50"
          />
        </div>

        {/* Grid */}
        <>
          {/* Imported */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              Imported Repositories
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {importedRepositories.map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} imported={true} />
              ))}
            </div>
          </div>

          {/* Available */}
          <div className="space-y-6 mt-14">
            <h2 className="text-2xl font-bold text-white">
              Available on GitHub
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
              {availableRepositories.map((repo) => (
                <RepositoryCard key={repo.id} repo={repo} imported={false} />
              ))}
            </div>
          </div>
        </>
      </div>
    </AppShell>
  );
}
