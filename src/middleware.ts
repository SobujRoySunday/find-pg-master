import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/' || path === '/login' || path === '/signup'
  const token = request.cookies.get('authToken')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/home',
    '/add-room',
    '/view'
  ],
}