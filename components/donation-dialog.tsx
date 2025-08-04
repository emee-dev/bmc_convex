"use client";

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
import { api } from "@/convex/_generated/api";
import { calculateTier, TemplateId, Tier } from "@/lib/utils";
import { useAction } from "convex/react";
import { Mail } from "lucide-react";
import type React from "react";
import { Dispatch, SetStateAction, useState } from "react";

type DonationDialogProps = {
  // Donation details
  name: string;
  donationAmt: number;
  isMonthly: boolean;
  recieveUpdates: boolean;
  creatorId: string;
  message: string;

  // setstates
  setDonationAmt: Dispatch<SetStateAction<number>>;
  setCustomAmt: Dispatch<SetStateAction<string>>;
  setIsMonthly: Dispatch<SetStateAction<boolean>>;
  setRecieveUpdates: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
};

export function DonationDialog({
  donationAmt,
  name,
  isMonthly,
  recieveUpdates,
  creatorId,
  message,
  setCustomAmt,
  setDonationAmt,
  setIsMonthly,
  setMessage,
  setRecieveUpdates,
  setName,
}: DonationDialogProps) {
  const donateCreator = useAction(api.template.handleDonation);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    const tiers = ["Gold", "Silver", "Bronze"] as Tier[];
    e.preventDefault();

    if (!email) return;
    setIsSubmitting(true);

    const tier = calculateTier(donationAmt);

    let templateId: TemplateId | null = null;

    if (tier === "Gold" && !isMonthly) {
      templateId === "onetime_gold_donation";
    } else if (tier === "Silver" && !isMonthly) {
      templateId === "onetime_silver_donation";
    } else if (tier === "Bronze" && !isMonthly) {
      templateId === "onetime_bronze_donation";
    } else {
      if (tiers.includes(tier) && isMonthly) {
        templateId = "monthly_donation_subscription";
      }
    }

    if (!templateId) return;

    await donateCreator({
      supporter_name: name || "Anonymous",
      supporter_email: email,
      donation_amount: donationAmt,
      is_monthly: isMonthly,
      creatorId,
      message,
      tier,
      templateId,
      recieveUpdates
    });

    setIsSubmitting(false);
    setIsDialogOpen(false);

    // Reset fields
    setEmail("");
    setDonationAmt(5);
    setCustomAmt("");
    setIsMonthly(false);
    setRecieveUpdates(false);
    setName("");
    setMessage("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          size="lg"
          disabled={donationAmt < 5 ? true : false}
        >
          Support with ${donationAmt}
          {isMonthly ? "/month" : ""}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="">
          <DialogTitle className="flex items-center gap-2">Support</DialogTitle>
          <DialogDescription>By donating to this creator</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* <Label htmlFor="email">Email Address</Label> */}
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

          <div className="flex gap-3">
            <Button
              size="sm"
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !email}
            >
              {isSubmitting ? "Processing..." : "Donate"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
