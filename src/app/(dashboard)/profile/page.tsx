"use client";

import { type FormEvent, useState } from "react";
import { Mail, MapPin, Save } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { currentUser } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const activity = [
  { label: "Applications submitted", value: "128" },
  { label: "Interviews scheduled", value: "9" },
  { label: "Offers received", value: "4" },
];

export default function ProfilePage() {
  const [bio, setBio] = useState(currentUser.bio);
  const [name, setName] = useState(currentUser.name);
  const [location, setLocation] = useState(currentUser.location);
  const [role, setRole] = useState(currentUser.role);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar initials={currentUser.avatarInitials} size="lg" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" /> {currentUser.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {location}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {activity.map((item) => (
              <div key={item.label} className="text-center sm:text-right">
                <p className="text-lg font-semibold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Personal information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Current role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit">
                  <Save className="h-4 w-4" />
                  Save changes
                </Button>
                {saved && (
                  <span className="text-sm text-success">Profile updated.</span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Showcased on your public profile</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Member since {formatDate(currentUser.joinedOn)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
