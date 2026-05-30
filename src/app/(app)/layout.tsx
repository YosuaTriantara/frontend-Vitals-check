import Sidebar from "@/components/layout/Sidebar";
import AppHeader from "@/components/layout/AppHeader";
import { AppWrapper } from "@/components/layout/AppWrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppWrapper>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="pt-[72px] lg:pt-0 lg:ml-[326px] flex flex-col flex-1 min-h-screen">
          <AppHeader />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </AppWrapper>
  );
}
