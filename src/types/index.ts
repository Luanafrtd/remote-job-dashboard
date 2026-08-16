export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export interface JobApplication {
  id: string;
  role: string;
  company: string;
  companyLogo: string;
  location: string;
  category: string;
  salaryRange: string;
  status: ApplicationStatus;
  appliedOn: string;
}

export interface MonthlyApplicationStat {
  month: string;
  applications: number;
  interviews: number;
  offers: number;
}

export interface CategoryStat {
  category: string;
  value: number;
}

export interface StatusStat {
  status: ApplicationStatus;
  label: string;
  value: number;
  color: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  location: string;
  bio: string;
  avatarInitials: string;
  joinedOn: string;
  skills: string[];
}
