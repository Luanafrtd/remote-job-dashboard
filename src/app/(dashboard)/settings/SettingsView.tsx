"use client";

import { type FormEvent, useState } from "react";
import { Bell, Palette, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Toast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

type Tab = "account" | "notifications" | "appearance";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [notifications, setNotifications] = useState({
    email: true,
    jobAlerts: true,
    weeklySummary: false,
    productUpdates: true,
  });
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2000);
  }

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError(null);

    const formData = new FormData(event.currentTarget);
    const currentPassword = String(formData.get("current-password") ?? "");
    const newPassword = String(formData.get("new-password") ?? "");

    if (!currentPassword || !newPassword) {
      setPasswordError("Please fill in both password fields.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }

    event.currentTarget.reset();
    showToast("Password updated.");
  }

  function handleDeleteAccount() {
    const confirmed = window.confirm(
      "This is a demo account — no data will actually be deleted. Continue anyway?",
    );
    if (confirmed) showToast("This is a demo — no account was deleted.");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <nav className="lg:col-span-1">
        <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.id} className="shrink-0">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-primary-muted text-primary"
                      : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="lg:col-span-3">
        {activeTab === "account" && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Account settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-4"
                noValidate
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="current-password">Current password</Label>
                    <Input
                      id="current-password"
                      name="current-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New password</Label>
                    <Input
                      id="new-password"
                      name="new-password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                {passwordError && (
                  <p role="alert" className="text-danger text-sm">
                    {passwordError}
                  </p>
                )}
                <Button type="submit">
                  <Shield className="h-4 w-4" />
                  Update password
                </Button>
              </form>

              <div className="border-border border-t pt-6">
                <h4 className="text-danger text-sm font-semibold">
                  Danger zone
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Permanently delete your account and all associated data.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDeleteAccount}
                  className="border-danger text-danger hover:bg-danger-muted mt-3"
                >
                  Delete account
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "notifications" && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Notification preferences</CardTitle>
                <CardDescription>
                  Choose what you want to be notified about
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <SettingRow
                label="Email notifications"
                description="Receive updates about your applications via email"
                checked={notifications.email}
                onChange={(value) =>
                  setNotifications((prev) => ({ ...prev, email: value }))
                }
              />
              <SettingRow
                label="Job alerts"
                description="Get notified when new matching jobs are posted"
                checked={notifications.jobAlerts}
                onChange={(value) =>
                  setNotifications((prev) => ({ ...prev, jobAlerts: value }))
                }
              />
              <SettingRow
                label="Weekly summary"
                description="A recap of your job search activity every week"
                checked={notifications.weeklySummary}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    weeklySummary: value,
                  }))
                }
              />
              <SettingRow
                label="Product updates"
                description="News about new features and improvements"
                checked={notifications.productUpdates}
                onChange={(value) =>
                  setNotifications((prev) => ({
                    ...prev,
                    productUpdates: value,
                  }))
                }
              />
            </CardContent>
          </Card>
        )}

        {activeTab === "appearance" && (
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how RemoteJob looks on your device
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {(["light", "dark", "system"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setTheme(option)}
                    aria-current={theme === option ? "true" : undefined}
                    className={cn(
                      "rounded-lg border p-4 text-left text-sm font-medium capitalize transition-colors",
                      theme === option
                        ? "border-primary bg-primary-muted text-primary"
                        : "border-border text-foreground hover:bg-surface-muted",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 text-xs">
                This preview app follows your system theme automatically. Manual
                theme switching can be wired up as a follow-up enhancement.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Toast message={toastMessage ?? ""} show={Boolean(toastMessage)} />
    </div>
  );
}

function SettingRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="border-border flex items-center justify-between gap-4 border-b py-4 last:border-b-0">
      <div>
        <p className="text-foreground text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}
