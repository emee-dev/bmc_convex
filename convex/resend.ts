import { Resend, vEmailEvent, vEmailId } from "@convex-dev/resend";
import { components, internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
  apiKey: process.env.RESEND_API_KEY ?? "",
  webhookSecret: process.env.RESEND_WEBHOOK_SECRET ?? "",
  testMode: false,
  onEmailEvent: internal.resend.handleEmailEvent,
});

export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  handler: async (ctx, args) => {
    console.log("Got called back!", args.id, args.event);
    // Probably do something with the event if you care about deliverability!
  },
});
