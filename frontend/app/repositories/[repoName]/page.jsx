"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useParams } from "next/navigation";
import {
  getRepositoryDetails,
  cloneRepository,
  getRepositoryFiles,
  getFileContent,
} from "@/services/repositoryService";

import FileExplorer from "@/components/repositories/FileExplorer";
import CodeViewer from "@/components/repositories/CodeViewer";

export default function RepositoryDetailPage() {
  const params = useParams();
  const [cloning, setCloning] = useState(false);
  const [cloned, setCloned] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const [repo, setRepo] = useState(null);

  useEffect(() => {
    if (params.repoName) {
      loadRepository();
    }
  }, [params]);
  async function handleClone() {
    try {
      setCloning(true);

      const response = await cloneRepository(repo.name);

      console.log(response);

      setCloned(true);
    } catch (err) {
      console.error(err);
      alert("Failed to clone repository.");
    } finally {
      setCloning(false);
    }
  }
  async function loadRepository() {
    try {
      const data = await getRepositoryDetails(params.repoName);
      setRepo(data);
      setCloned(!!data.local_path);
      const repoFiles = await getRepositoryFiles(params.repoName);
      setFiles(repoFiles);
    } catch (err) {
      console.error(err);
    }
  }
  console.log(params);

  if (!repo) {
    return (
      <AppShell>
        <div className="text-white">Loading...</div>
      </AppShell>
    );
  }
  async function handleFileClick(file) {
    if (file.type === "directory") {
      const data = await getRepositoryFiles(repo.name, file.path);

      setFiles(data);
      return;
    }

    setSelectedFile(file);

    const data = await getFileContent(repo.name, file.path);

    setFileContent(data.content);
  }

  return (
    <AppShell>
      <div className="space-y-8 text-white">
        <div>
          <h1 className="text-5xl font-bold">{repo.name}</h1>
          <p className="text-gray-400 mt-2">Repository Overview</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400">Owner</p>
              <p>{repo.full_name.split("/")[0]}</p>
            </div>

            <div>
              <p className="text-gray-400">Language</p>
              <p>{repo.language}</p>
            </div>

            <div>
              <p className="text-gray-400">Default Branch</p>
              <p>{repo.default_branch}</p>
            </div>

            <div>
              <p className="text-gray-400">Visibility</p>
              <p>{repo.private ? "Private" : "Public"}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-400">Description</p>
            <p>{repo.description || "No description available."}</p>
          </div>

          <div className="mt-8">
            <p className="text-gray-400">GitHub</p>

            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#57FF8A]"
            >
              {repo.html_url}
            </a>
          </div>
          <button
            onClick={handleClone}
            disabled={cloning || cloned}
            className="
    mt-10
    rounded-full
    px-8
    py-4
    bg-[#57FF8A]
    text-black
    font-semibold
  "
          >
            {cloning ? "Cloning..." : cloned ? "Cloned ✓" : "Clone Repository"}
          </button>
          <div className="grid grid-cols-3 gap-6 mt-10">
            <FileExplorer
              files={files}
              selectedFile={selectedFile}
              onSelectFile={handleFileClick}
            />

            <div className="col-span-2">
              <CodeViewer content={fileContent} />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-bold mb-6">Repository Status</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Imported</span>

            <span className="text-green-400 font-semibold">✓ Yes</span>
          </div>

          <div className="flex items-center justify-between">
            <span>Local Copy</span>

            <span
              className={
                cloned
                  ? "text-green-400 font-semibold"
                  : "text-yellow-400 font-semibold"
              }
            >
              {cloned ? "✓ Available" : "Not cloned"}
            </span>
          </div>
        </div>
      </div>
      <br />
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-bold">AI Features</h2>

        <p className="text-gray-400 mt-2">
          Clone this repository to unlock AI-powered analysis.
        </p>

        <div className="mt-6 space-y-3">
          <p>📁 File Explorer</p>

          <p>🤖 AI Chat</p>

          <p>🏗 Architecture Analysis</p>

          <p>📝 Documentation Generator</p>

          <p>🔍 Global Code Search</p>
        </div>
      </div>
    </AppShell>
  );
}
