import type { ReactNode } from "react";
import { GuestLink } from "@/components/layout/GuestLink";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col lg:flex-row">
      <div className="bg-sidebar-bg text-sidebar-foreground hidden flex-1 flex-col justify-between p-10 lg:flex">
        <Logo className="text-white" />
        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Track every remote application in one place.
          </h2>
          <p className="text-sidebar-foreground text-sm">
            Monitor your pipeline, visualize your progress, and never lose track
            of an opportunity again.
          </p>
        </div>
        <p className="text-sidebar-foreground text-xs">
          &copy; {new Date().getFullYear()} RemoteJob Dashboard. All rights
          reserved.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-sm">{children}</div>
        <p className="text-muted-foreground mt-8 text-center text-xs">
          <GuestLink />
        </p>
      </div>
    </div>
  );
}
