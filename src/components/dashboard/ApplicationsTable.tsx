import { StatusBadge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { JobApplication } from "@/types";

export function ApplicationsTable({
  applications,
}: {
  applications: JobApplication[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th className="pb-3 font-medium">Role</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Salary</th>
            <th className="pb-3 font-medium">Applied on</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-xs font-semibold text-primary">
                    {application.companyLogo}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{application.role}</p>
                    <p className="text-xs text-muted-foreground">
                      {application.company} &middot; {application.location}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 text-muted-foreground">{application.category}</td>
              <td className="py-3 text-muted-foreground">{application.salaryRange}</td>
              <td className="py-3 text-muted-foreground">
                {formatDate(application.appliedOn)}
              </td>
              <td className="py-3">
                <StatusBadge status={application.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
