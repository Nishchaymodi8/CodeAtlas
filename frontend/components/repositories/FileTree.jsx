"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
} from "lucide-react";

export default function FileTree({ nodes, onSelectFile }) {
  return (
    <div className="text-sm">
      {nodes.map((node) => (
        <TreeNode key={node.path} node={node} onSelectFile={onSelectFile} />
      ))}
    </div>
  );
}

function TreeNode({ node, onSelectFile }) {
  const [expanded, setExpanded] = useState(false);

  const isFolder = node.type === "directory";

  return (
    <div>
      <div
        onClick={() => {
          if (isFolder) {
            setExpanded(!expanded);
          } else {
            onSelectFile(node);
          }
        }}
        className="
          flex
          items-center
          gap-2
          px-2
          py-1
          rounded
          cursor-pointer
          hover:bg-white/10
        "
      >
        {isFolder ? (
          expanded ? (
            <ChevronDown size={15} />
          ) : (
            <ChevronRight size={15} />
          )
        ) : (
          <span className="w-[15px]" />
        )}

        {isFolder ? (
          expanded ? (
            <FolderOpen size={16} />
          ) : (
            <Folder size={16} />
          )
        ) : (
          <File size={16} />
        )}

        <span>{node.name}</span>
      </div>

      {expanded && isFolder && (
        <div className="ml-5 border-l border-white/10 pl-2">
          <FileTree nodes={node.children} onSelectFile={onSelectFile} />
        </div>
      )}
    </div>
  );
}
