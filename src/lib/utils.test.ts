import { describe, expect, it } from "vitest";
import { cn, formatDate, initials } from "./utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, null, "", "b")).toBe("a b");
  });

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});

describe("formatDate", () => {
  it("formats a date-only ISO string without rolling back a day west of UTC", () => {
    // Regression test: new Date("2026-08-01") is UTC midnight, which is
    // still July 31 in local time west of UTC unless formatting pins to UTC.
    expect(formatDate("2026-08-01")).toBe("Aug 1, 2026");
  });

  it("formats a Date instance using its UTC calendar date", () => {
    expect(formatDate(new Date(Date.UTC(2026, 0, 14)))).toBe("Jan 14, 2026");
  });
});

describe("initials", () => {
  it("takes the first letter of the first two words", () => {
    expect(initials("Alex Morgan")).toBe("AM");
  });

  it("uppercases lowercase input", () => {
    expect(initials("jane doe")).toBe("JD");
  });

  it("handles a single word", () => {
    expect(initials("Cher")).toBe("C");
  });

  it("ignores extra whitespace between words", () => {
    expect(initials("Alex  Morgan")).toBe("AM");
  });

  it("caps at two initials for longer names", () => {
    expect(initials("Alex Bo Morgan")).toBe("AB");
  });
});
