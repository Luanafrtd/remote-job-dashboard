import { beforeEach, describe, expect, it } from "vitest";
import { applyTheme, getStoredTheme, THEME_STORAGE_KEY } from "./theme";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
});

describe("getStoredTheme", () => {
  it("defaults to system when nothing is stored", () => {
    expect(getStoredTheme()).toBe("system");
  });

  it("reads a previously stored light/dark preference", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("falls back to system for an unrecognized stored value", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "sepia");
    expect(getStoredTheme()).toBe("system");
  });
});

describe("applyTheme", () => {
  it("sets data-theme and persists an explicit choice", () => {
    applyTheme("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    applyTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("clears the attribute and storage for system", () => {
    applyTheme("dark");
    applyTheme("system");
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });
});
