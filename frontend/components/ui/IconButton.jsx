export default function IconButton({ icon, active = false }) {
  return (
    <button
      className={`
        w-14
        h-14
        rounded-full
        flex
        items-center
        justify-center
        transition-all
        duration-300

        ${
          active
            ? "bg-green-500/15 border border-green-400 text-green-400"
            : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
        }
      `}
    >
      {icon}
    </button>
  );
}
