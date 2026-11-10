import { NextResponse, type NextRequest } from "next/server";

/** Basic auth for /admin. The dashboard is disabled entirely unless ADMIN_PASSWORD is set. */
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER ?? "admin";
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return new NextResponse("Admin disabled", { status: 404 });
  const header = req.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, ...rest] = atob(encoded).split(":");
    if (u === user && rest.join(":") === pass) return NextResponse.next();
  }
  return new NextResponse("Authentication required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="driftig-admin"' } });
}

export const config = { matcher: ["/admin/:path*"] };
