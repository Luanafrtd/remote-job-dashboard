import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <div className="hidden flex-1 flex-col justify-between bg-sidebar-bg p-10 text-sidebar-foreground lg:flex">
        <Logo className="text-white" />
        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Track every remote application in one place.
          </h2>
          <p className="text-sm text-sidebar-foreground">
            Monitor your pipeline, visualize your progress, and never lose
            track of an opportunity again.
          </p>
        </div>
        <p className="text-xs text-sidebar-foreground">
          &copy; {new Date().getFullYear()} RemoteJob Dashboard. All rights
          reserved.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-sm">{children}</div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground">
            Continue as guest &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}
