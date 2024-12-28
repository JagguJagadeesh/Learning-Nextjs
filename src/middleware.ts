import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publisPaths = path==='/signin' || path==='/signup'
  const token = request.cookies.get('token')?.value || '';

  if(publisPaths && token){
    return NextResponse.redirect(new URL('/',request.url))
  }
  if(!publisPaths && !token){
    return NextResponse.redirect(new URL('/signin',request.url))
  }
}
 
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/signin',
    '/signup',
  ],
}