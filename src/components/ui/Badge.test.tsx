import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./Badge";
import type { ApplicationStatus } from "@/types";

describe("StatusBadge", () => {
  const cases: Array<[ApplicationStatus, string]> = [
    ["applied", "Applied"],
    ["interviewing", "Interviewing"],
    ["offer", "Offer"],
    ["rejected", "Rejected"],
  ];

  it.each(cases)("renders the correct label for status=%s", (status, label) => {
    render(<StatusBadge status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
