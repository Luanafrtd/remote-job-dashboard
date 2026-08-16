import type { Metadata } from "next";
import { ApplicationsTrendChart } from "@/components/charts/ApplicationsTrendChart";
import { CategoryBarChart } from "@/components/charts/CategoryBarChart";
import { StatusPieChart } from "@/components/charts/StatusPieChart";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { dashboardMetrics, jobApplications } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Application activity</CardTitle>
              <CardDescription>Applications vs. interviews, last 7 months</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ApplicationsTrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Pipeline breakdown</CardTitle>
              <CardDescription>Status of all applications</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <StatusPieChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Recent applications</CardTitle>
              <CardDescription>Your latest job applications</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ApplicationsTable applications={jobApplications} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Applications by category</CardTitle>
              <CardDescription>Where you&apos;re focusing your search</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <CategoryBarChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
