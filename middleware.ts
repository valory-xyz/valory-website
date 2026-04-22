import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { isBlockedRegion } from './utils/regionBlock';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/restricted') {
    return NextResponse.next();
  }

  if (isBlockedRegion(request.headers.get('x-vercel-ip-region'))) {
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
