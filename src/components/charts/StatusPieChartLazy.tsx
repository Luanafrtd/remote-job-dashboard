"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import type { StatusStat } from "@/types";

const StatusPieChart = dynamic(
  () => import("./StatusPieChart").then((mod) => mod.StatusPieChart),
  { ssr: false, loading: () => <Skeleton className="h-[300px] w-full" /> },
);

export function StatusPieChartLazy({ data }: { data: StatusStat[] }) {
  return <StatusPieChart data={data} />;
}
