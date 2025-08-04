"use client";

import { DashboardContent } from "@/app/dashboard/components/dashboard-view";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthForm } from "@/components/auth-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { api } from "@/convex/_generated/api";
import { DashboardView, SubDashboardView } from "@/lib/utils";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from "convex/react";
import {
  HandCoins,
  LayoutDashboard,
  Loader2,
  Mail,
  Settings,
  SquarePen,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { use } from "react";
import { DonationsTable } from "./components/donations-table";
import { ProfileDropdown } from "./components/profile-dropdown";
import { SettingsView } from "./components/settings-view";
import { SubscribersTable } from "./components/subscribers-table";
import Link from "next/link";
import { NewsletterTable } from "./components/newsletter-view";

const links = {
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Donations",
      url: "/dashboard?v=donations",
      icon: HandCoins,
    },
    {
      name: "Newsletters",
      url: "/dashboard?v=newsletters",
      icon: Mail,
    },
    {
      name: "Subscribers",
      url: "/dashboard?v=subscribers",
      icon: Users,
    },
    {
      name: "Settings",
      url: "/dashboard?v=settings",
      icon: Settings,
    },
    {
      name: "Email editor",
      url: "/editor/:id",
      icon: SquarePen,
    },
  ],
};

type PageProps = {
  searchParams: Promise<{ v?: DashboardView; t?: SubDashboardView }>;
};

export default function Page(props: PageProps) {
  const query = use(props.searchParams);
  const p = usePathname();
  const creator = useQuery(api.auth.loggedInUser);

  return (
    <SidebarProvider>
      <AppSidebar links={links} creatorId={creator?._id as string} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    {p.replace("/", "")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {query.v && <BreadcrumbSeparator className="hidden md:block" />}
                {query.v && (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/dashboard?v=${query.v}`}>
                      {query.v}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {query.t && <BreadcrumbSeparator className="hidden md:block" />}
                {query.t && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{query.t}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="ml-auto px-4 flex items-center gap-x-2">
            <Authenticated>
              {!creator?.page_description && (
                <Link
                  href="/dashboard?v=settings&t=page"
                  className="text-sm text-red-500 hover:underline"
                >
                  <span>Complete your page setup</span>
                </Link>
              )}
            </Authenticated>

            {creator && creator._id && creator.email && (
              <ProfileDropdown creator={creator as any} />
            )}
          </div>
        </header>

        <div className="flex font-geist flex-1 flex-col gap-4 p-4 pt-0">
          {query.v === "subscribers" && (
            <div className="container mx-auto py-10">
              <SubscribersTable />
            </div>
          )}

          {query.v === "donations" && (
            <div className="container mx-auto py-10">
              <DonationsTable />
            </div>
          )}

          {query.v === "newsletters" && (
            <div className="container mx-auto py-10">
              <NewsletterTable />
            </div>
          )}

          {query.v === "settings" && (
            <div className="container mx-auto py-10">
              {/* @ts-expect-error it is defined */}
              <SettingsView creator={creator} v={query.t} />
            </div>
          )}

          {!query.v && (
            <div className="container  mx-auto py-5 ">
              {/* @ts-expect-error Typescript is nuts */}
              {creator && <DashboardContent creator={creator} />}
            </div>
          )}
        </div>

        {/* <Authenticated>
          <div className="flex font-geist flex-1 flex-col gap-4 p-4 pt-0">
            {query.v === "subscribers" && (
              <div className="container mx-auto py-10">
                <SubscribersTable />
              </div>
            )}

            {query.v === "donations" && (
              <div className="container mx-auto py-10">
                <DonationsTable />
              </div>
            )}

            {query.v === "newsletters" && (
              <div className="container mx-auto py-10">
                <NewsletterTable />
              </div>
            )}

            {query.v === "settings" && (
              <div className="container mx-auto py-10">
                <SettingsContent v={query.t} />
              </div>
            )}

            {!query.v && (
              <div className="container  mx-auto py-5 ">
                 
                {creator && <DashboardContent creator={creator} />}
              </div>
            )}
          </div>
        </Authenticated> */}
        <Unauthenticated>
          <div className="flex bg-muted font-geist flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex min-h-svh flex-col items-center justify-centerx gap-6 p-6 md:p-10">
              <div className="flex w-full max-w-sm flex-col">
                <AuthForm />
              </div>
            </div>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <div className="flex font-geist flex-1 flex-col p-4 pt-0">
            <div className="flex min-h-svh pt-32 justify-center ">
              <div className="w-full max-w-sm">
                <Authenticating />
              </div>
            </div>
          </div>
        </AuthLoading>
      </SidebarInset>
    </SidebarProvider>
  );
}

const Authenticating = () => (
  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
    <Loader2 className="h-5 w-5 animate-spin" />
    <span>Authenticating...</span>
  </div>
);
