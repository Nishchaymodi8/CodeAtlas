"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ content, language }) {
  return (
    <Editor
      height="700px"
      language={language}
      value={content}
      theme="vs-dark"
      options={{
        readOnly: true,
        minimap: {
          enabled: true,
        },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}
