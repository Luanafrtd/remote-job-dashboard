import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

const statusClasses: Record<ApplicationStatus, string> = {
  applied: "bg-info-muted text-info",
  interviewing: "bg-warning-muted text-warning",
  offer: "bg-success-muted text-success",
  rejected: "bg-danger-muted text-danger",
};

const statusLabels: Record<ApplicationStatus, string> = {
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: ApplicationStatus;
}

export function StatusBadge({ status, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        statusClasses[status],
        className,
      )}
      {...props}
    >
      {statusLabels[status]}
    </span>
  );
}
