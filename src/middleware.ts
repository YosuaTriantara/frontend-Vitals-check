import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/login', '/register'];
const AUTH_PATHS = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isAuthPath = AUTH_PATHS.some((p) => pathname === p);
  const isPublic = PUBLIC_PATHS.some((p) => pathname === p);

  if (token) {
    // Validasi token ke backend dulu
    const isValid = await validateToken(token);

    if (!isValid) {
      // Token tidak valid/expired → hapus cookie + redirect login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }

    // Token valid → jangan biarkan masuk halaman auth
    if (isAuthPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (!token && !isPublic) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    return response.ok;
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images).*)',
  ],
};