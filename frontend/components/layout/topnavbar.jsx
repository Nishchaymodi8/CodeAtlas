import PillButton from "../ui/PillButton";

export default function TopNavbar() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Code<span className="text-green-400">Atlas</span>
        </h1>
      </div>

      <div className="flex gap-3">
        <PillButton>Dashboard</PillButton>

        <PillButton active>AI Chat</PillButton>

        <PillButton>Documentation</PillButton>

        <PillButton>Settings</PillButton>
      </div>
    </div>
  );
}
