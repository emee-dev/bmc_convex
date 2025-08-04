"use client";

import CreatorCard from "@/components/creator-card";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import CreatorSearchDialog from "./creator-search-dialog";
import { GitPullRequestIcon } from "./icons/pull-request";
import Link from "next/link";

const creators = [
  {
    name: "Linus Barks",
    description:
      "Linus is building an open-source runtime for running JavaScript on microcontrollers.",
    supporters: 2340,
    avatar: "/placeholder.jpg",
  },
  {
    name: "Ada Flux",
    description:
      "Ada is creating dev tools for debugging async flows in distributed systems.",
    supporters: 4488,
    avatar: "/placeholder.jpg",
  },
  {
    name: "Max Byte",
    description: "Max is crafting VSCode extensions for faster TypeScript DX.",
    supporters: 112,
    avatar: "/placeholder.jpg",
  },
  {
    name: "Jess Kernel",
    description:
      "Jess is maintaining a Linux-based OS for developer-first laptops.",
    supporters: 641,
    avatar: "/placeholder.jpg",
  },
  {
    name: "Rami Stack",
    description:
      "Rami is building a visual backend builder using Node.js, MongoDB, and WebSockets.",
    supporters: 1805,
    avatar: "/placeholder.jpg",
  },
  {
    name: "Tara Null",
    description:
      "Tara is demystifying systems programming through short-form Rust content.",
    supporters: 892,
    avatar: "/placeholder.jpg",
  },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-muted relative overflow-hidden">
      {/* Header */}
      <header className="relative z-50 bg-muted backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <GitPullRequestIcon className="w-5 h-5" size={20} />
              <span className="font-medium font-geist text-base sm:text-lg">
                Buymeacommit
              </span>
            </div>
            <nav className="hidden lg:flex items-center space-x-6 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>

              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                Resources
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search creators"
                onFocus={() => setSearchDialogOpen(true)}
                className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <CreatorSearchDialog
                open={searchDialogOpen}
                onOpenChange={setSearchDialogOpen}
              />
            </div>
            <Link href="/dashboard" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" className="border bg-white/70">
                Log in
              </Button>
            </Link>

            <Link href="/dashboard" className="hidden sm:inline-flex">
              <Button size="sm">Sign up as creator</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Floating Creator Cards - Hidden on mobile, visible on tablet+ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        {/* Left side cards */}
        <div className="absolute left-8 xl:left-16 top-32">
          <CreatorCard
            {...creators[0]}
            className={`w-56 xl:w-64 mb-6 transition-transform duration-1000 ease-out`}
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
          <CreatorCard
            {...creators[1]}
            className={`w-56 xl:w-64 transition-transform duration-1000 ease-out`}
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
        </div>

        <div className="absolute left-12 xl:left-20 top-96">
          <CreatorCard
            {...creators[2]}
            className={`w-48 xl:w-56 transition-transform duration-1000 ease-out`}
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
          />
        </div>

        {/* Right side cards */}
        <div className="absolute right-8 xl:right-16 top-40">
          <CreatorCard
            {...creators[3]}
            className={`w-56 xl:w-64 mb-6 transition-transform duration-1000 ease-out`}
            style={{ transform: `translateY(${scrollY * 0.25}px)` }}
          />
          <CreatorCard
            {...creators[4]}
            className={`w-56 xl:w-64 transition-transform duration-1000 ease-out`}
            style={{ transform: `translateY(${scrollY * 0.35}px)` }}
          />
        </div>

        <div className="absolute right-12 xl:right-20 top-80">
          <CreatorCard
            {...creators[5]}
            className={`w-48 xl:w-56 transition-transform duration-1000 ease-out`}
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          />
        </div>
      </div>

      <main className="relative z-10 ">
        {/* Hero Section */}
        <section className="min-h-screen flex pt-20 justify-center px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center ">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
              <div className="flex items-center space-x-1 mb-2 sm:mb-0">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-success text-success"
                  />
                ))}
              </div>
              <span className="sm:ml-2 text-sm sm:text-base text-foreground font-medium">
                Loved by 1,000,000+ creators
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Fund your
              <br />
              <span className="text-foreground">creative work</span>
            </h1>

            <p className="text-base font-geist text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Accept support. Start a membership. Setup a shop. It's easier than
              you think.
            </p>

            <Button size="lg" className="mb-3 sm:mb-4">
              Start my page
            </Button>

            <p className="text-muted-foreground text-xs sm:text-sm">
              It's free and takes less than a minute!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
