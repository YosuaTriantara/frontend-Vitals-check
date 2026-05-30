interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex flex-col gap-5 lg:gap-6 overflow-x-hidden">
      {children}
    </div>
  );
}