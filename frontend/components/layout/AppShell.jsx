import Navbar from "./navbar";
import Sidebar from "./Sidebar";

export default function AppShell({ children, right }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 pb-8 md:px-8">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Left Glow */}
        <div
          className="absolute left-[10%] top-[5%] h-[550px] w-[550px] rounded-full blur-[180px]"
          style={{
            background: "#66FC73",
            opacity: 0.08,
          }}
        />

        {/* Right Glow */}
        <div
          className="absolute right-[5%] top-[20%] h-[450px] w-[450px] rounded-full blur-[170px]"
          style={{
            background: "#66FC73",
            opacity: 0.05,
          }}
        />

        {/* BIG CENTER GLOW */}
        <div
          className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "950px",
            height: "650px",
            background: "#66FC73",
            opacity: 0.55,
            filter: "blur(220px)",
          }}
        />
        <div className="absolute left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#57FF8A]/12 blur-[170px]" />

        <div className="absolute right-[10%] top-[40%] h-[400px] w-[400px] rounded-full bg-[#57FF8A]/12 blur-[170px]" />
      </div>

      <Navbar />

      <div className="mt-4 flex gap-6">
        <Sidebar />

        <main className="min-w-0 flex-1">{children}</main>

        {right && (
          <aside className="hidden xl:block w-[340px] shrink-0">{right}</aside>
        )}
      </div>
    </div>
  );
}
