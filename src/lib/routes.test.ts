import { describe, expect, it } from "vitest";
import { isAuthRoute, isProtectedRoute, ROUTES } from "./routes";

describe("isProtectedRoute", () => {
  it("matches the dashboard, profile, and settings routes exactly", () => {
    expect(isProtectedRoute(ROUTES.dashboard)).toBe(true);
    expect(isProtectedRoute(ROUTES.profile)).toBe(true);
    expect(isProtectedRoute(ROUTES.settings)).toBe(true);
  });

  it("matches nested paths under a protected route", () => {
    expect(isProtectedRoute("/dashboard/foo")).toBe(true);
  });

  it("does not match unrelated paths", () => {
    expect(isProtectedRoute(ROUTES.login)).toBe(false);
    expect(isProtectedRoute("/")).toBe(false);
  });

  it("does not match a route that merely starts with a protected name", () => {
    // e.g. a future "/dashboards" route shouldn't be swept up by "/dashboard"
    expect(isProtectedRoute("/dashboards")).toBe(false);
  });
});

describe("isAuthRoute", () => {
  it("matches login and register", () => {
    expect(isAuthRoute(ROUTES.login)).toBe(true);
    expect(isAuthRoute(ROUTES.register)).toBe(true);
  });

  it("does not match protected or unrelated paths", () => {
    expect(isAuthRoute(ROUTES.dashboard)).toBe(false);
    expect(isAuthRoute("/")).toBe(false);
  });
});
