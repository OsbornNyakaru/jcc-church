import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a simple middleware that allows all requests to proceed
// In production, you would replace this with actual Clerk middleware
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
