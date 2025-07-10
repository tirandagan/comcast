import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  // Skip middleware for auth callbacks
  if (searchParams.get('auth') === 'callback') {
    return NextResponse.next();
  }
  
  // Protected routes
  const protectedRoutes = ['/report', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Get token from cookie or header
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (isProtectedRoute && !token) {
    // Redirect to signin if accessing protected route without token
    const signinUrl = new URL('/signin', request.url);
    signinUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signinUrl);
  }
  
  // For now, we'll just check if token exists
  // JWT verification will happen in the API routes/pages
  if (isProtectedRoute && token) {
    // Pass the request through
    // Individual pages/API routes will handle JWT verification
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/report/:path*', '/admin/:path*'],
};