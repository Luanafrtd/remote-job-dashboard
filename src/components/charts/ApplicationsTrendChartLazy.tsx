"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import type { MonthlyApplicationStat } from "@/types";

const ApplicationsTrendChart = dynamic(
  () =>
    import("./ApplicationsTrendChart").then(
      (mod) => mod.ApplicationsTrendChart,
    ),
  { ssr: false, loading: () => <Skeleton className="h-[300px] w-full" /> },
);

export function ApplicationsTrendChartLazy({
  data,
}: {
  data: MonthlyApplicationStat[];
}) {
  return <ApplicationsTrendChart data={data} />;
}
