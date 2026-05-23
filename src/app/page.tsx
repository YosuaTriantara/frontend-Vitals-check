import { redirect } from 'next/navigation';

/**
 * Landing page — redirects authenticated users to /dashboard.
 * Unauthenticated users are handled by middleware → /login.
 */
export default function HomePage() {
  // Middleware handles the redirect logic.
  // If middleware lets this through, send to dashboard.
  redirect('/dashboard');
}
