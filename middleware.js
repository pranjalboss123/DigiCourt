import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return Response.redirect(new URL("/auth/login", req.url));
  }

  const url = req.nextUrl.pathname;

  if (url.startsWith("/judge") && token.role !== "judge") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }

  if (url.startsWith("/clerk") && token.role !== "clerk") {
    return Response.redirect(new URL("/unauthorized", req.url));
  }
}

export const config = {
  matcher: ["/judge/:path*", "/clerk/:path*"], // Protect these routes
};
