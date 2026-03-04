export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 w-full bg-background">{children}</main>
    </div>
  );
}