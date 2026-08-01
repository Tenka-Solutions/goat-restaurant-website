import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/i18n/routing";

export function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1];
  const headers = new Headers(request.headers);
  headers.set("x-goat-locale", isLocale(locale) ? locale : "en");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"] };
