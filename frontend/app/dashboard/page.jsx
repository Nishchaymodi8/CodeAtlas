"use client";

import RepositoryCard from "@/components/RepositoryCard";

const repositories = [
  {
    id: 1,
    name: "CODEATLAS",
    language: "Python",
    private: false,
  },
  {
    id: 2,
    name: "InstaBazaar",
    language: "Python",
    private: true,
  },
  {
    id: 3,
    name: "HeartWorkers",
    language: "JavaScript",
    private: false,
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold">CodeAtlas</h1>

        <p className="mt-2 text-gray-600">Welcome back, Nishchay 👋</p>

        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <p className="text-green-600 font-semibold">🟢 GitHub Connected</p>

          <p>Nishchaymodi8</p>
        </div>

        <input
          placeholder="Search repositories..."
          className="mt-6 w-full border rounded-lg p-3"
        />

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </main>
  );
}
