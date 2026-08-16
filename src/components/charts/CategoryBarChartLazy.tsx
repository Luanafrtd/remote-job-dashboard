"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";
import type { CategoryStat } from "@/types";

const CategoryBarChart = dynamic(
  () => import("./CategoryBarChart").then((mod) => mod.CategoryBarChart),
  { ssr: false, loading: () => <Skeleton className="h-[300px] w-full" /> },
);

export function CategoryBarChartLazy({ data }: { data: CategoryStat[] }) {
  return <CategoryBarChart data={data} />;
}
