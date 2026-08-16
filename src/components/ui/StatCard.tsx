import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { DashboardMetric } from "@/types";

const trendConfig = {
  up: { icon: ArrowUpRight, className: "text-success" },
  down: { icon: ArrowDownRight, className: "text-danger" },
  neutral: { icon: Minus, className: "text-muted-foreground" },
};

export function StatCard({ label, value, change, trend }: DashboardMetric) {
  const { icon: Icon, className } = trendConfig[trend];

  return (
    <Card className="p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        <span className={cn("flex items-center gap-0.5 text-xs font-medium", className)}>
          <Icon className="h-3.5 w-3.5" />
          {change}
        </span>
      </div>
    </Card>
  );
}
