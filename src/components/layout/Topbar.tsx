"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { currentUser } from "@/lib/data";

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
}

export function Topbar({ onMenuClick, title }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur sm:px-6">
      <button
        aria-label="Open sidebar"
        onClick={onMenuClick}
        className="text-muted-foreground hover:text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-lg font-semibold text-foreground">{title}</h1>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search jobs, companies..."
            className="h-10 w-56 rounded-lg border border-border bg-surface-muted pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:bg-surface focus:ring-2 focus:ring-primary/20 lg:w-72"
          />
        </div>

        <button
          aria-label="Notifications"
          className="relative rounded-full p-2 text-muted-foreground hover:bg-surface-muted hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
        </button>

        <Link href="/profile" className="flex items-center gap-2">
          <Avatar initials={currentUser.avatarInitials} size="sm" />
        </Link>
      </div>
    </header>
  );
}
