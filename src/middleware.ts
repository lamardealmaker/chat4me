import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher([
  "/",
  "/dashboard(.*)",
  "/test(.*)",
  "/workspace(.*)",
  "/join(.*)"
]);
const isAuthCallback = createRouteMatcher(["/api/auth/callback/(.*)"]); 

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isAuthCallback(request)) {
    return; // Let auth callbacks pass through
  }
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/dashboard");
  }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
}); 

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 