import Sidebar from '@/components/layout/Sidebar';
import AppHeader from '@/components/layout/AppHeader';

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="ml-[326px] flex flex-col flex-1 min-h-screen">
        <AppHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
