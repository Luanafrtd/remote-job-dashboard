import type { Metadata } from "next";
import { Suspense } from "react";
import {
  CategorySection,
  MetricsSection,
  RecentApplicationsSection,
  StatusSection,
  TrendSection,
} from "./sections";
import {
  ChartCardSkeleton,
  MetricsSkeleton,
  TableCardSkeleton,
} from "./skeletons";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<MetricsSkeleton />}>
        <MetricsSection />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Suspense fallback={<ChartCardSkeleton className="xl:col-span-2" />}>
          <TrendSection />
        </Suspense>
        <Suspense fallback={<ChartCardSkeleton />}>
          <StatusSection />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Suspense fallback={<TableCardSkeleton className="xl:col-span-2" />}>
          <RecentApplicationsSection />
        </Suspense>
        <Suspense fallback={<ChartCardSkeleton />}>
          <CategorySection />
        </Suspense>
      </div>
    </div>
  );
}
