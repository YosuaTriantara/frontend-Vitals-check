/** Auth layout — no sidebar, no header. Clean centered layout. */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6FBF1] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
