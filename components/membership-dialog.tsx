"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Mail } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type SubscriptionDialogProps = {
  creatorId: string;
  showMembershipDialog?: boolean;
};

export function SubscriptionDialog({
  creatorId,
  showMembershipDialog,
}: SubscriptionDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(showMembershipDialog);
  const newsletterSubcription = useMutation(api.template.subscribeNewsletter);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await newsletterSubcription({
      creatorId: creatorId as Id<"users">,
      supporter_email: email,
    });

    setIsSubmitting(false);
    setIsOpen(false);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Crown className="mr-2 h-4 w-4" />
          Subscribe to Creator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-purple-600" />
            Subscribe
          </DialogTitle>
          <DialogDescription>
            Get occasional updates from this developer — sneak peeks,
            changelogs, devlogs, and release announcements. No spam, ever.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2">
            <h4 className="font-medium mb-2">What You'll Get:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Project updates and roadmap insights</li>
              <li>• Early feature previews</li>
              <li>• Access to dev logs and behind-the-scenes content</li>
              <li>• Occasional release announcements (no spam)</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              size="sm"
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
