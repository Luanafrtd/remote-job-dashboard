export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  profile: "/profile",
  settings: "/settings",
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.dashboard,
  ROUTES.profile,
  ROUTES.settings,
] as const;

export const AUTH_ROUTES = [ROUTES.login, ROUTES.register] as const;

export const SESSION_COOKIE_NAME = "rjd_session";

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isAuthRoute(pathname: string): boolean {
  return (AUTH_ROUTES as readonly string[]).includes(pathname);
}
