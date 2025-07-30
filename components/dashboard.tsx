"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  Calendar,
  DollarSign,
  Mail,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

export function Dashboard() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-yellow-200 shadow-soft">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emmanuel</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="border-yellow-200 hover:bg-yellow-50 bg-transparent"
              >
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="shadow-soft-lg border border-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold">
                Total Donations
              </CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">$1,234</div>
              <p className="text-sm text-green-600 font-medium">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-soft-lg border border-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold">
                Supporters
              </CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">89</div>
              <p className="text-sm text-blue-600 font-medium">
                +5 new this week
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-soft-lg border border-black/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-base font-semibold">
                Email Templates
              </CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">4</div>
              <p className="text-sm text-purple-600 font-medium">
                2 active campaigns
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <Card className="shadow-soft-lg border border-black/50 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-gradient-yellow rounded-lg shadow-soft">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                Email Management
              </CardTitle>
              <CardDescription className="text-base">
                Configure your email templates and automation settings to engage
                with your supporters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/editor">
                <Button
                  className="w-full justify-start h-12 text-base font-medium bg-white border-yellow-200 text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 shadow-soft transition-all duration-200 hover:scale-105"
                  variant="outline"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Email Templates Editor
                </Button>
              </Link>
              <Button
                className="w-full justify-start h-12 text-base font-medium bg-white border-yellow-200 text-gray-700 hover:bg-yellow-50 hover:border-yellow-300 shadow-soft transition-all duration-200 hover:scale-105"
                variant="outline"
              >
                <Calendar className="w-5 h-5 mr-3" />
                Configure Email Crons
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft-lg border border-black/50">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl">Recent Activity</CardTitle>
              <CardDescription className="text-base">
                Latest donations and supporter interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex items-center justify-between p-3 hover:border-black/50 border bg-yellow-50/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 shadow-soft">
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-pink-600 text-white font-semibold">
                        SA
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah A.</p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 font-semibold">
                    $5
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 hover:border-black/50 border bg-yellow-50/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 shadow-soft">
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white font-semibold">
                        MK
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">Mike K.</p>
                      <p className="text-sm text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 font-semibold">
                    $100
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 hover:border-black/50 border bg-yellow-50/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10 shadow-soft">
                      <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-600 text-white font-semibold">
                        ?
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">Anonymous</p>
                      <p className="text-sm text-muted-foreground">
                        3 days ago
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 font-semibold">
                    $1
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Templates Overview */}
        <Card className="shadow-soft-lg border border-black/50  backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl">Email Templates</CardTitle>
            <CardDescription className="text-base">
              Manage your automated email responses and campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-yellow-200 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Donation Appreciation
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Thank supporters for their donations
                </p>
                <Badge className="bg-green-100 text-green-800 font-medium">
                  Active
                </Badge>
              </div>
              <div className="p-6 border border-yellow-200 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Newsletter Subscription
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Welcome new newsletter subscribers
                </p>
                <Badge
                  variant="outline"
                  className="border-gray-300 text-gray-600 font-medium"
                >
                  Draft
                </Badge>
              </div>
              <div className="p-6 border border-yellow-200 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Cancel Subscription
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Handle subscription cancellations
                </p>
                <Badge className="bg-green-100 text-green-800 font-medium">
                  Active
                </Badge>
              </div>
              <div className="p-6 border border-yellow-200 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:scale-105">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Tier Donation
                </h4>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Special thanks for premium donations
                </p>
                <Badge
                  variant="outline"
                  className="border-gray-300 text-gray-600 font-medium"
                >
                  Draft
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
