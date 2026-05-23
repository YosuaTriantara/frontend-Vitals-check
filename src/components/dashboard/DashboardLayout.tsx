interface DashboardLayoutProps {
  children: React.ReactNode;
}

/** Thin layout wrapper for dashboard page content */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="px-9 py-8 flex flex-col gap-6">
      {children}
    </div>
  );
}
