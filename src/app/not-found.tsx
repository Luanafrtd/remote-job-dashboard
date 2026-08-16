import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <div className="bg-primary-muted text-primary flex h-16 w-16 items-center justify-center rounded-full">
        <Compass className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-foreground text-4xl font-semibold">404</h1>
        <p className="text-muted-foreground text-sm">
          We couldn&apos;t find the page you&apos;re looking for.
        </p>
      </div>
      <Link
        href={ROUTES.dashboard}
        className="bg-primary text-primary-foreground inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors hover:opacity-90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
