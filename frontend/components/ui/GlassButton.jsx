export default function GlassButton({
  children,
  className = "",
  variant = "ghost",
  size = "md",
  ...props
}) {
  const variants = {
    primary:
      "bg-[#57FF8A]/12 text-black hover:brightness-110 shadow-[0_0_45px_rgba(87,255,138,0.55)]",
    ghost:
      "bg-white/[0.04] border border-white/10 text-white hover:bg-white/[0.08]",
    outline:
      "border border-white/20 bg-transparent text-white hover:bg-white/[0.05]",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-7 text-sm",
    icon: "h-10 w-10",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        font-medium
        transition-all
        duration-200
        active:scale-95
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
