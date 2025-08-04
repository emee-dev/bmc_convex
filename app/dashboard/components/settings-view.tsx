"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { SubDashboardView } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Github, Settings, Twitter, User } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const sidebarNavItems = [
  {
    title: "Page",
    icon: User,
    href: "/dashboard?v=settings&t=page",
  },
  {
    title: "Account",
    icon: Settings,
    href: "/dashboard?v=settings&t=account",
  },
];

type Creator = {
  page_description: string | undefined;
  twitter: string | undefined;
  github: string | undefined;
  first_name: string;
};

type SettingsViewProps = {
  v?: SubDashboardView;
  creator: Creator | null;
};

// export function SettingsView({ v = "page" }: SettingsViewProps) {
//   const updateUser = useMutation(api.auth.updateUser);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = new FormData(e.currentTarget);

//     const description = form.get("description") as string;
//     const twitter = form.get("twitter") as string;
//     const github = form.get("github") as string;
//     const first_name = form.get("first_name") as string;

//     const payload = {} as Record<string, string>;

//     if (description) {
//       payload["page_description"] = description;
//     }
//     if (twitter) {
//       payload["twitter"] = twitter;
//     }
//     if (github) {
//       payload["github"] = github;
//     }
//     if (first_name) {
//       payload["first_name"] = first_name;
//     }

//     await updateUser(payload);
//   };

//   return (
//     <>
//       <div className="mx-auto max-w-6xl">
//         <div className="space-y-6">
//           <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
//             <aside className="lg:w-1/5">
//               <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
//                 {sidebarNavItems.map((item) => (
//                   <Link key={item.href} href={item.href} className="w-full">
//                     <Button
//                       variant={
//                         item.title.toLowerCase() === v ? "secondary" : "ghost"
//                       }
//                       className="justify-start w-full"
//                     >
//                       <item.icon className="mr-2 h-4 w-4" />
//                       {item.title}
//                     </Button>
//                   </Link>
//                 ))}
//               </nav>
//             </aside>

//             {v === "page" && (
//               <CreatorPageForm
//                 isSubmitting={isSubmitting}
//                 onSubmit={handleSubmit}
//               />
//             )}

//             {v === "account" && (
//               <UserAccountForm
//                 isSubmitting={isSubmitting}
//                 onSubmit={handleSubmit}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export function SettingsView({
  v = "page",
  creator = null,
}: SettingsViewProps) {
  const updateUser = useMutation(api.auth.updateUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData(e.currentTarget);
      const description = form.get("description") as string;
      const twitter = form.get("twitter") as string;
      const github = form.get("github") as string;
      const first_name = form.get("first_name") as string;

      const payload: Record<string, string> = {};

      if (description) payload["page_description"] = description;
      if (twitter) payload["twitter"] = twitter;
      if (github) payload["github"] = github;
      if (first_name) payload["first_name"] = first_name;

      await updateUser(payload);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="space-y-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {sidebarNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="w-full">
                  <Button
                    variant={
                      item.title.toLowerCase() === v ? "secondary" : "ghost"
                    }
                    className="justify-start w-full"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              ))}
            </nav>
          </aside>

          {v === "page" && (
            <CreatorPageForm
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              creator={creator}
            />
          )}

          {v === "account" && (
            <UserAccountForm
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit}
              creator={creator}
            />
          )}
        </div>
      </div>
    </div>
  );
}

type FormProps = {
  isSubmitting: boolean;
  creator: Creator | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const UserAccountForm = ({ creator, isSubmitting, onSubmit }: FormProps) => {
  return (
    <div className="flex-1 lg:max-w-2xl font-geist">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Profile</CardTitle>
            <CardDescription>
              Manage your personal profile details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="first_name">First name</Label>
                <Input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="Emmanuel"
                  defaultValue={creator?.first_name}
                />
              </div>

              <div className="flex justify-end space-x-2">
                {!isSubmitting && <Button type="submit">Save</Button>}
                {isSubmitting && (
                  <Button type="submit" disabled>
                    Saving...
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const CreatorPageForm = ({ creator, isSubmitting, onSubmit }: FormProps) => {
  return (
    <div className="flex-1 lg:max-w-2xl font-geist">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Creator Page</CardTitle>
            <CardDescription>
              Customize your public creator page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">About You</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={creator?.page_description}
                  placeholder="Share a brief introduction or what you're creating."
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  This will appear on your public page.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Links</h3>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      name="twitter"
                      defaultValue={creator?.twitter}
                      type="url"
                      placeholder="https://twitter.com/yourhandle"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="github"
                      name="github"
                      defaultValue={creator?.github}
                      type="url"
                      placeholder="https://github.com/yourusername"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                {!isSubmitting && <Button type="submit">Save</Button>}
                {isSubmitting && (
                  <Button type="submit" disabled>
                    Saving...
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
