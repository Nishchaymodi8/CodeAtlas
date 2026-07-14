export default function RepositoryCard({ repo }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold">📦 {repo.name}</h2>

      <p className="text-gray-500">{repo.language}</p>

      <p className="text-sm mt-1">
        {repo.private ? "🔒 Private" : "🌍 Public"}
      </p>

      <button className="mt-4 bg-black text-white px-4 py-2 rounded">
        Open
      </button>
    </div>
  );
}
