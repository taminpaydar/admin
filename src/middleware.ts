// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { config as Url } from './config';
export const config = {
  matcher: ['/Auth:path*', '/Dashboard:path*', '/:path'],
}
export function middleware(request: NextRequest) {
  let res = NextResponse.next();

  if (request.nextUrl.pathname.endsWith('/')) {
    var x = request.cookies.get('token')?.value;
    if (x == null) {
      return NextResponse.redirect(new URL('/Auth', request.url));

    } else {
      return NextResponse.redirect(new URL('/Dashboard', request.url));
    }
    // This logic is only applied to /about
  }
  if (request.nextUrl.pathname.startsWith('/Auth')) {
    var x = request.cookies.get('token')?.value;
    if (x != null) {
      return NextResponse.redirect(new URL('/Dashboard', request.url));

    } else {
       return res;
    }
    // This logic is only applied to /about
  }

  if (request.nextUrl.pathname.startsWith('/Dashboard')) {
    var x = request.cookies.get('token')?.value;
    if (x == null) {
      return NextResponse.redirect(new URL('/Auth', request.url));

    } else {
       return res;
    }
  }
  return res;
}
