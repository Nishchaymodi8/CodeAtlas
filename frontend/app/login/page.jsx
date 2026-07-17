export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-[450px] rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10">
        <h1 className="text-4xl font-bold text-white text-center">
          Code<span className="text-green-400">Atlas</span>
        </h1>

        <p className="text-center text-gray-400 mt-2">Welcome Back</p>

        <div className="mt-10 space-y-5">
          <input
            placeholder="Username"
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-full bg-white/5 border border-white/10 px-5 py-4 text-white outline-none"
          />

          <button className="w-full rounded-full bg-green-400 text-black font-semibold py-4">
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
