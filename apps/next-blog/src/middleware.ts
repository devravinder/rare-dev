import { updateSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export const config = {
   matcher: [
     /*
      * Match all request paths except for the ones starting with:
      * - api (API routes)
      * - /images
      * - _next/static (static files)
      * - _next/image (image optimization files)
      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
      */
     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images/).*)',

     // later we'll remove api/
   ],
 }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(request: NextRequest) {
   await updateSession();
   return NextResponse.next()
}