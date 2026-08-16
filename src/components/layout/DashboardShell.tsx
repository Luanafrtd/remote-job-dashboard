"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ROUTES } from "@/lib/routes";

const pageTitles: Record<string, string> = {
  [ROUTES.dashboard]: "Dashboard",
  [ROUTES.profile]: "Profile",
  [ROUTES.settings]: "Settings",
};

export function DashboardShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";
  const triggerRef = useRef<HTMLElement | null>(null);

  // Close the mobile drawer whenever the route changes, e.g. after tapping a nav link.
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent the page behind the mobile drawer from scrolling while it's open.
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  function openSidebar() {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
    triggerRef.current?.focus();
  }

  // Let Escape close the mobile drawer, matching native dialog/drawer behavior.
  useEffect(() => {
    if (!sidebarOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeSidebar();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={openSidebar} title={title} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
