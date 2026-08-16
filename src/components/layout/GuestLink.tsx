"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { createSession } from "@/lib/session";

export function GuestLink() {
  const router = useRouter();

  function handleClick() {
    createSession();
    router.push(ROUTES.dashboard);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-muted-foreground hover:text-foreground text-xs"
    >
      Continue as guest &rarr;
    </button>
  );
}
