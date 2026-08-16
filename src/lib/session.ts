import { SESSION_COOKIE_NAME } from "@/lib/routes";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Demo-only session handling: sets a lightweight, non-httpOnly cookie so
 * `middleware.ts` can gate the dashboard routes. There is no real backend —
 * swap this for a proper server-issued session (e.g. NextAuth.js, Clerk,
 * Supabase Auth) when wiring up real authentication.
 */
export function createSession(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=1; path=/; max-age=${SESSION_MAX_AGE_SECONDS}; samesite=lax`;
}

export function destroySession(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}
