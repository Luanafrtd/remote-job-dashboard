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
    <header className="border-border bg-surface/80 sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-4 backdrop-blur sm:px-6">
      <button
        aria-label="Open sidebar"
        onClick={onMenuClick}
        className="text-muted-foreground hover:text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="text-foreground text-lg font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <div className="relative hidden sm:block">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search jobs, companies..."
            className="border-border bg-surface-muted text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-surface focus:ring-primary/20 h-10 w-56 rounded-lg border pr-3 pl-9 text-sm transition-colors outline-none focus:ring-2 lg:w-72"
          />
        </div>

        <button
          aria-label="Notifications"
          className="text-muted-foreground hover:bg-surface-muted hover:text-foreground relative rounded-full p-2"
        >
          <Bell className="h-5 w-5" />
          <span className="bg-danger absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
        </button>

        <Link href="/profile" className="flex items-center gap-2">
          <Avatar initials={currentUser.avatarInitials} size="sm" />
        </Link>
      </div>
    </header>
  );
}
