import Sidebar from '@/components/layout/Sidebar';
import AppHeader from '@/components/layout/AppHeader';

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Sidebar />

      <div className="flex min-h-screen flex-col pt-[72px] lg:pt-0 lg:ml-[326px]">
        <AppHeader />

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}