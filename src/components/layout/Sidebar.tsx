"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  BarChart3,
  Briefcase,
  Building2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { destroySession } from "@/lib/session";

interface NavLink {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const mainLinks: NavLink[] = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutDashboard },
];

const soonLinks: NavLink[] = [
  { label: "Applications", href: "#", icon: Briefcase },
  { label: "Analytics", href: "#", icon: BarChart3 },
  { label: "Companies", href: "#", icon: Building2 },
  { label: "Messages", href: "#", icon: MessageSquare },
];

const accountLinks: NavLink[] = [
  { label: "Profile", href: ROUTES.profile, icon: User },
  { label: "Settings", href: ROUTES.settings, icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the drawer when it opens, so keyboard users land
  // somewhere sensible instead of on a now-hidden trigger button.
  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  function isActive(href: string) {
    return href !== "#" && pathname === href;
  }

  function handleLogout() {
    destroySession();
    router.push(ROUTES.login);
    router.refresh();
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "bg-sidebar-bg text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo className="text-white" />
          <button
            ref={closeButtonRef}
            aria-label="Close sidebar"
            onClick={onClose}
            className="text-sidebar-foreground hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 scrollbar-thin space-y-6 overflow-y-auto px-3 pb-6">
          <div>
            <p className="text-sidebar-foreground/60 px-3 pb-2 text-xs font-semibold tracking-wider uppercase">
              Overview
            </p>
            <ul className="space-y-1">
              {mainLinks.map((link) => (
                <SidebarLink
                  key={link.label}
                  link={link}
                  active={isActive(link.href)}
                />
              ))}
              {soonLinks.map((link) => (
                <SidebarLink key={link.label} link={link} disabled />
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sidebar-foreground/60 px-3 pb-2 text-xs font-semibold tracking-wider uppercase">
              Account
            </p>
            <ul className="space-y-1">
              {accountLinks.map((link) => (
                <SidebarLink
                  key={link.label}
                  link={link}
                  active={isActive(link.href)}
                />
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-sidebar-border border-t p-3">
          <button
            onClick={handleLogout}
            className="text-sidebar-foreground hover:bg-sidebar-item-hover flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  link,
  active,
  disabled,
}: {
  link: NavLink;
  active?: boolean;
  disabled?: boolean;
}) {
  const Icon = link.icon;

  if (disabled) {
    return (
      <li>
        <span className="text-sidebar-foreground/40 flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2.5 text-sm">
          <span className="flex items-center gap-3">
            <Icon className="h-4 w-4" />
            {link.label}
          </span>
          <span className="bg-sidebar-item-hover rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
            Soon
          </span>
        </span>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-item-active text-white"
            : "text-sidebar-foreground hover:bg-sidebar-item-hover hover:text-white",
        )}
      >
        <Icon className="h-4 w-4" />
        {link.label}
      </Link>
    </li>
  );
}
