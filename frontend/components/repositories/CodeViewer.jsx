"use client";

export default function CodeViewer({ content }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black p-6 h-full overflow-auto">
      <pre className="text-green-300 whitespace-pre-wrap">
        <code>{content}</code>
      </pre>
    </div>
  );
}
