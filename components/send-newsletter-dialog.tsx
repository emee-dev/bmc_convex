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
import { useAction } from "convex/react";
import { Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

type SendNewsletterDialogProps = {
  html: string | null | undefined;
  jsx: string;
};

export function SendNewsletterDialog({ html, jsx }: SendNewsletterDialogProps) {
  const sendNewsletter = useAction(api.node_email.sendNewsletterEmail);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jsx || !html || !emailSubject || !title || !description) {
      console.warn(
        "Missing required email fields: jsx, html, subject, title, or description."
      );
      return;
    }

    setIsSubmitting(true);

    await sendNewsletter({
      description,
      html,
      jsx,
      subject: emailSubject,
      title,
    });

    setIsSubmitting(false);
    setIsDialogOpen(false);

    // Reset fields
    setTitle("");
    setDescription("");
    setEmailSubject("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Save & Send</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="">
          <DialogTitle className="flex items-center gap-2">
            Newsletter
          </DialogTitle>
          <DialogDescription>Broadcasted to all subscribers.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Title of newsletter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            {/* <Label htmlFor="email">Email Address</Label> */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="subject"
                type="text"
                name="subject"
                placeholder="Email subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            {/* <Label htmlFor="email">Email Address</Label> */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="description"
                name="description"
                placeholder="Newsletter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
