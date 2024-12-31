import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publisPaths = path==='/signin' || path==='/signup' || path==='/verifyemail'
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
    '/verifyemail',
    '/resetpassword'
  ],
}