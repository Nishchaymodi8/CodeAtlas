import Link from "next/link";

export default function Logo({ compact = false }) {
  return (
    <Link href="/dashboard" className="flex items-center gap-3">
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-[#0d0d0d]
shadow-[inset_0_0_20px_rgba(87,255,138,.18),0_0_35px_rgba(87,255,138,.22)]
        "
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-[#66FC73]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path
            d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"
            opacity=".45"
          />
        </svg>
      </div>

      {!compact && (
        <h1 className="text-lg font-semibold tracking-tight text-white">
          Code
          <span className="text-[#66FC73]">Atlas</span>
        </h1>
      )}
    </Link>
  );
}
