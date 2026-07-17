export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[28px]
      border border-[#57FF8A]/10
      bg-[rgba(14,24,18,0.72)]
      backdrop-blur-xl
      shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]
      ${className}`}
    >
      {children}
    </div>
  );
}

export function GlassPanel({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-[32px]
      border-[#57FF8A]/10
      bg-[rgba(10,18,13,0.72)]
      backdrop-blur-2xl
      shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]
      ${className}`}
    >
      {children}
    </div>
  );
}
