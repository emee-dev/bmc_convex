import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const findCreator = internalQuery({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const creator = await ctx.db
      .query("users")
      .filter((item) => item.eq(item.field("_id"), args.userId))
      .first();

    return creator;
  },
});

export const findTemplate = internalQuery({
  args: {
    userId: v.string(),
    templateId: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("templates")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("templateId"), args.templateId)
        )
      )
      .first();

    return template;
  },
});

export const findVars = internalQuery({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const email_vars = await ctx.db
      .query("email_variables")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    return email_vars;
  },
});

export const findSubscribers = internalQuery({
  args: {
    creatorId: v.string(),
  },
  handler: async (ctx, args) => {
    const subs = await ctx.db
      .query("newsletter_subscriptions")
      .filter((q) => q.eq(q.field("creatorId"), args.creatorId))
      .collect();

    return subs;
  },
});

export const storeNewsletter = internalMutation({
  args: {
    jsx: v.string(),
    html: v.string(),
    subject: v.string(),
    title: v.string(),
    creatorId: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    ctx.db.insert("newsletters", {
      creatorId: args.creatorId as Id<"users">,
      date: new Date().toISOString(),
      description: args.description,
      html: args.html,
      jsx: args.jsx,
      title: args.title,
    });
  },
});
