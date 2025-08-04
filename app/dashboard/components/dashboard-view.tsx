"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Id } from "@/convex/_generated/dataModel";
import {
  Activity,
  CreditCard,
  DollarSign,
  ExternalLink,
  Users,
} from "lucide-react";
import Link from "next/link";

const recentDonations = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "IN",
  },
  {
    name: "William Kim",
    email: "william.kim@email.com",
    amount: "+$99.00",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SD",
  },
];

type Creator = {
  _id: Id<"users">;
  email: string;
  name: string;
};

type DashboardContentProps = {
  creator: Creator;
};

export function DashboardContent(props: DashboardContentProps) {
  return (
    <>
      <Tabs defaultValue="overview" className="space-y-4 mt-3">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm">New</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link href={`/newsletter`}>
                  Compose Newsletter
                  <DropdownMenuShortcut>
                    <ExternalLink />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 font-geist md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Donations - Full Width */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>
                You made 265 donations this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 font-geist">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={donation.avatar || "/placeholder.svg"}
                        alt="Avatar"
                      />
                      <AvatarFallback>{donation.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {donation.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {donation.email}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{donation.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </>
  );
}
