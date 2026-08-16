import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "border-border bg-surface text-foreground fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <CheckCircle2 className="text-success h-4 w-4" />
      {message}
    </div>
  );
}
