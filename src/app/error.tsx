"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/routes";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <div className="bg-danger-muted text-danger flex h-16 w-16 items-center justify-center rounded-full">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-foreground text-2xl font-semibold">
          Something went wrong
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          An unexpected error occurred while rendering this page. You can try
          again, or head back to the dashboard.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href={ROUTES.dashboard}
          className="border-border text-foreground hover:bg-surface-muted inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
