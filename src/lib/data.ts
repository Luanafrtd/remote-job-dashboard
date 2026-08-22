import type {
  CategoryStat,
  DashboardMetric,
  JobApplication,
  MonthlyApplicationStat,
  StatusStat,
  UserProfile,
} from "@/types";

export const dashboardMetrics: DashboardMetric[] = [
  { label: "Total Applications", value: "128", change: "+12.4%", trend: "up" },
  { label: "Active Interviews", value: "9", change: "+3", trend: "up" },
  { label: "Offers Received", value: "4", change: "+1", trend: "up" },
  { label: "Response Rate", value: "34%", change: "-2.1%", trend: "down" },
];

export const monthlyApplicationStats: MonthlyApplicationStat[] = [
  { month: "Feb", applications: 12, interviews: 3, offers: 0 },
  { month: "Mar", applications: 18, interviews: 4, offers: 1 },
  { month: "Apr", applications: 15, interviews: 5, offers: 0 },
  { month: "May", applications: 22, interviews: 6, offers: 1 },
  { month: "Jun", applications: 19, interviews: 4, offers: 1 },
  { month: "Jul", applications: 25, interviews: 7, offers: 1 },
  { month: "Aug", applications: 17, interviews: 5, offers: 0 },
];

export const categoryStats: CategoryStat[] = [
  { category: "Engineering", value: 48 },
  { category: "Design", value: 22 },
  { category: "Product", value: 18 },
  { category: "Marketing", value: 14 },
  { category: "Data", value: 26 },
];

export const statusStats: StatusStat[] = [
  { status: "applied", label: "Applied", value: 62, color: "var(--chart-1)" },
  {
    status: "interviewing",
    label: "Interviewing",
    value: 9,
    color: "var(--chart-2)",
  },
  { status: "offer", label: "Offer", value: 4, color: "var(--chart-3)" },
  { status: "rejected", label: "Rejected", value: 53, color: "var(--chart-5)" },
];

export const jobApplications: JobApplication[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "Northwind Labs",
    companyLogo: "NW",
    location: "Remote (US)",
    category: "Engineering",
    salaryRange: "$130k - $160k",
    status: "interviewing",
    appliedOn: "2026-08-01",
  },
  {
    id: "2",
    role: "Product Designer",
    company: "Fable Studio",
    companyLogo: "FS",
    location: "Remote (Global)",
    category: "Design",
    salaryRange: "$95k - $120k",
    status: "applied",
    appliedOn: "2026-08-05",
  },
  {
    id: "3",
    role: "Data Analyst",
    company: "Cobalt Analytics",
    companyLogo: "CA",
    location: "Remote (EU)",
    category: "Data",
    salaryRange: "$85k - $105k",
    status: "offer",
    appliedOn: "2026-07-22",
  },
  {
    id: "4",
    role: "Growth Marketing Manager",
    company: "Brightpath",
    companyLogo: "BP",
    location: "Remote (US)",
    category: "Marketing",
    salaryRange: "$90k - $110k",
    status: "rejected",
    appliedOn: "2026-07-18",
  },
  {
    id: "5",
    role: "Backend Engineer (Node.js)",
    company: "Vantage Cloud",
    companyLogo: "VC",
    location: "Remote (US)",
    category: "Engineering",
    salaryRange: "$125k - $150k",
    status: "interviewing",
    appliedOn: "2026-08-08",
  },
  {
    id: "6",
    role: "Product Manager",
    company: "Lumen Health",
    companyLogo: "LH",
    location: "Remote (Global)",
    category: "Product",
    salaryRange: "$110k - $140k",
    status: "applied",
    appliedOn: "2026-08-10",
  },
];

export const currentUser: UserProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  role: "Senior Software Engineer",
  location: "Lisbon, Portugal",
  bio: "Full-stack engineer with 7+ years of experience building remote-first products. Currently exploring senior and staff roles at product-led startups.",
  avatarInitials: "AM",
  joinedOn: "2025-01-14",
  skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "GraphQL"],
};
