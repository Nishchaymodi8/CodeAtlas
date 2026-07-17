export default function PillButton({ children, active = false }) {
  return (
    <button
      className={`
        px-7
        py-3
        rounded-full
        transition-all
        duration-300
        border

        ${
          active
            ? "border-green-400 text-green-400 bg-green-500/10"
            : "border-transparent text-white hover:border-white/20 hover:bg-white/5"
        }
      `}
    >
      {children}
    </button>
  );
}
