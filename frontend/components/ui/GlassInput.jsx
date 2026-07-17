export default function GlassInput({ placeholder, className = "" }) {
  return (
    <input
      placeholder={placeholder}
      className={`
        w-full
        px-5
        py-4
        rounded-full
        bg-white/5
        border
        border-white/10
        backdrop-blur-xl
        outline-none
        text-white
        placeholder:text-gray-500
        focus:border-green-400
        transition-all
        duration-300
        ${className}
      `}
    />
  );
}
