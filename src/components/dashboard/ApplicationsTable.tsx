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
          <tr className="border-border text-muted-foreground border-b text-xs">
            <th className="pb-3 font-medium">Role</th>
            <th className="pb-3 font-medium">Category</th>
            <th className="pb-3 font-medium">Salary</th>
            <th className="pb-3 font-medium">Applied on</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="py-3">
                <div className="flex items-center gap-3">
                  <span className="bg-primary-muted text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-semibold">
                    {application.companyLogo}
                  </span>
                  <div>
                    <p className="text-foreground font-medium">
                      {application.role}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {application.company} &middot; {application.location}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-muted-foreground py-3">
                {application.category}
              </td>
              <td className="text-muted-foreground py-3">
                {application.salaryRange}
              </td>
              <td className="text-muted-foreground py-3">
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
