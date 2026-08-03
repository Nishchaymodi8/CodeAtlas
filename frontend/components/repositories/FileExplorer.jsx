"use client";

export default function FileExplorer({ files, selectedFile, onSelectFile }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Files</h2>

      <div className="space-y-2">
        {files.map((file) => (
          <button
            key={file.name}
            onClick={() => onSelectFile(file)}
            className={`w-full text-left rounded-xl px-3 py-2 transition
              ${
                selectedFile?.name === file.name
                  ? "bg-[#57FF8A] text-black"
                  : "hover:bg-white/10 text-white"
              }`}
          >
            {file.type === "directory" ? "📁" : "📄"} {file.name}
          </button>
        ))}
      </div>
    </div>
  );
}
