import { ApplicationsTrendChart } from "@/components/charts/ApplicationsTrendChart";
import { CategoryBarChart } from "@/components/charts/CategoryBarChart";
import { StatusPieChart } from "@/components/charts/StatusPieChart";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import {
  getApplicationsTrend,
  getCategoryBreakdown,
  getDashboardMetrics,
  getRecentApplications,
  getStatusBreakdown,
} from "@/lib/api";

export async function MetricsSection() {
  const metrics = await getDashboardMetrics();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <StatCard key={metric.label} {...metric} />
      ))}
    </div>
  );
}

export async function TrendSection() {
  const data = await getApplicationsTrend();
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Application activity</CardTitle>
          <CardDescription>
            Applications vs. interviews, last 7 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ApplicationsTrendChart data={data} />
      </CardContent>
    </Card>
  );
}

export async function StatusSection() {
  const data = await getStatusBreakdown();
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Pipeline breakdown</CardTitle>
          <CardDescription>Status of all applications</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <StatusPieChart data={data} />
      </CardContent>
    </Card>
  );
}

export async function CategorySection() {
  const data = await getCategoryBreakdown();
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Applications by category</CardTitle>
          <CardDescription>
            Where you&apos;re focusing your search
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <CategoryBarChart data={data} />
      </CardContent>
    </Card>
  );
}

export async function RecentApplicationsSection() {
  const applications = await getRecentApplications();
  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <div>
          <CardTitle>Recent applications</CardTitle>
          <CardDescription>Your latest job applications</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ApplicationsTable applications={applications} />
      </CardContent>
    </Card>
  );
}
