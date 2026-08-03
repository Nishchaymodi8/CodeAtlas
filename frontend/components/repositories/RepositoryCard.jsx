"use client";
import { useRouter } from "next/navigation";
import { Globe, Lock, GitBranch, Download } from "lucide-react";
import { importRepository } from "@/services/repositoryService";
import { useState } from "react";
import { useEffect } from "react";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
};

export default function RepositoryCard({ repo, imported }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isImported, setIsImported] = useState(imported ?? false);

  useEffect(() => {
    setIsImported(imported);
  }, [imported]);

  async function handleImport() {
    try {
      setLoading(true);

      await importRepository(repo.name);
      setIsImported(true);
    } catch (err) {
      console.log(err);
      alert("Failed to import repository.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        p-7
        transition-all
        duration-300
        hover:border-[#57FF8A]/30
        hover:shadow-[0_0_40px_rgba(87,255,138,0.12)]
      "
    >
      {/* Top */}

      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm">
            {repo.full_name.split("/")[0]}
            <span className="mx-2">/</span>
          </p>
          <h2
            onClick={() => router.push(`/repositories/${repo.name}`)}
            className="text-4xl font-bold text-white mt-1 cursor-pointer hover:text-[#57FF8A] transition"
          >
            {repo.name}
          </h2>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            text-gray-300
          "
        >
          {repo.private ? <Lock size={15} /> : <Globe size={15} />}

          {repo.private ? "Private" : "Public"}
        </div>
      </div>

      {/* Description */}

      <p className="mt-6 text-gray-400 leading-7 min-h-[70px]">
        {repo.description || "No description available."}
      </p>

      {/* Bottom */}

      <div className="mt-8 flex justify-between items-center">
        <div className="flex items-center gap-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                background: languageColors[repo.language] || "#9CA3AF",
              }}
            />

            {repo.language || "Unknown"}
          </div>

          <div className="flex items-center gap-2">
            <GitBranch size={16} />

            {repo.default_branch}
          </div>
        </div>

        {isImported ? (
          <button
            onClick={() => router.push(`/repositories/${repo.name}`)}
            className="
      rounded-full
      px-6
      py-3
      bg-[#57FF8A]
      text-black
      font-semibold
      hover:scale-105
      transition
    "
          >
            Open Repository
          </button>
        ) : (
          <button
            onClick={handleImport}
            disabled={loading}
            className="
              rounded-full
              px-6
              py-3
              bg-[#57FF8A]
              text-black
              font-semibold
              transition
              hover:scale-105
              hover:shadow-[0_0_30px_rgba(87,255,138,.45)]
              flex
              items-center
              gap-2
            "
          >
            <Download size={16} />

            {loading ? "Importing..." : "Import"}
          </button>
        )}
      </div>
    </div>
  );
}
