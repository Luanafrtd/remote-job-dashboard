import "server-only";
import {
  categoryStats,
  currentUser,
  dashboardMetrics,
  jobApplications,
  monthlyApplicationStats,
  statusStats,
} from "@/lib/data";
import type {
  CategoryStat,
  DashboardMetric,
  JobApplication,
  MonthlyApplicationStat,
  StatusStat,
  UserProfile,
} from "@/types";

/**
 * Simulated data-access layer. Each function mimics an async API/database
 * call (with artificial latency) so the dashboard can be built the way a
 * real one would be: server components fetch in parallel, each wrapped in
 * its own <Suspense> boundary so slower sections don't block faster ones.
 *
 * Swap the bodies below for real fetch()/ORM calls against your backend;
 * call sites don't need to change since they already treat this as async.
 */

function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export function getDashboardMetrics(): Promise<DashboardMetric[]> {
  return delay(dashboardMetrics, 300);
}

export function getApplicationsTrend(): Promise<MonthlyApplicationStat[]> {
  return delay(monthlyApplicationStats, 500);
}

export function getStatusBreakdown(): Promise<StatusStat[]> {
  return delay(statusStats, 650);
}

export function getCategoryBreakdown(): Promise<CategoryStat[]> {
  return delay(categoryStats, 800);
}

export function getRecentApplications(): Promise<JobApplication[]> {
  return delay(jobApplications, 750);
}

export function getCurrentUser(): Promise<UserProfile> {
  return delay(currentUser, 200);
}
