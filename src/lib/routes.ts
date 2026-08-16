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
