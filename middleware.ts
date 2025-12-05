import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_REGIONS = ['UA-14', 'UA-09', 'UA-65', 'UA-23'];

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/restricted') {
    return NextResponse.next();
  }
  const region = request.headers.get('x-vercel-ip-region');

  if (region && BLOCKED_REGIONS.includes(region)) {
    return NextResponse.redirect(new URL('/restricted', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ico|pdf|txt|xml)).*)',
  ],
};
