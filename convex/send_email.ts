import { toPreviewVariables } from "@/lib/utils";
import { Resend, vEmailEvent, vEmailId } from "@convex-dev/resend";
import { v } from "convex/values";
import Handlebars from "handlebars";
import { components, internal } from "./_generated/api";
import { internalMutation, mutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
  apiKey: process.env.RESEND_API_KEY ?? "",
  webhookSecret: process.env.RESEND_WEBHOOK_SECRET ?? "",
  testMode: false,
  onEmailEvent: internal.send_email.handleEmailEvent,
});

export const sendTestEmail = internalMutation({
  args: {
    creator_name: v.string(),
    supporter_email: v.string(),
    subject: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: `${args.creator_name} <delivered@resend.dev>`,
      to: args.supporter_email,
      subject: args.subject,
      html: args.body,
    });
  },
});

export const sendRealEmail = mutation({
  args: {
    userId: v.string(),
    supporter_email: v.string(),
    subject: v.string(),
    body: v.string(),
    email_type: v.string(),
    supporter_name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const creator = await ctx.db
      .query("users")
      .filter((item) => item.eq(item.field("_id"), args.userId))
      .first();

    if (!creator) {
      return;
    }

    const template = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), creator._id),
          q.eq(q.field("templateId"), args.email_type)
        )
      )
      .first();

    if (!template) {
      return;
    }

    const email_vars = await ctx.db
      .query("email_variables")
      .filter((q) => q.eq(q.field("userId"), creator._id))
      .first();

    if (!email_vars) {
      return;
    }

    const configured_template = template.default_template;

    const code =
      configured_template === "Text"
        ? template.text_template
        : template.html_content;

    // Expand the user's variables with their real-values into a nested object structure
    const variable_ctx = toPreviewVariables(email_vars.variables);

    const source = Handlebars.compile(code);
    const html = source(variable_ctx);

    await resend.sendEmail(ctx, {
      from: `${creator.name} <delivered@resend.dev>`,
      to: args.supporter_email,
      subject: args.subject,
      html: html,
    });
  },
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

// Donations below
export const handleDonation = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
    is_monthly: v.boolean(),
    name: v.optional(v.string()),
    message: v.optional(v.string()),
    tier: v.union(v.literal("Gold"), v.literal("Silver"), v.literal("Bronse")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("donations", args);
  },
});

// Newsletter subscription
export const handleMembership = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("newsletter_subscriptions", args);
  },
});
