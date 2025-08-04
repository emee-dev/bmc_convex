import { vars } from "@/emails/vars";
import {
  html_templates,
  jsx_templates,
  text_templates,
  utils,
} from "@/lib/template";
import { CreatorRecord, hydrateVariables, Templates } from "@/lib/utils";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { action, mutation, query } from "./_generated/server";
import { Variables } from "./auth";
import { vs } from "@react-email/components";

export const getTemplates = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      console.log("Not signed in");
      return null;
    }

    const utils = await ctx.db
      .query("utility_files")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!utils) {
      console.log("Unable to query utils record.");
      return;
    }

    const db = await ctx.db
      .query("templates")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return [...db, { ...utils }];
  },
});

export const testInsert = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const templates: Templates[] = [
      {
        _id: "1",
        templateId: "monthly_donation_subscription",
        name: "Monthly subscription",
      },
      {
        _id: "2",
        templateId: "monthly_donation_cancellation",
        name: "Monthly subcription cancellation",
      },
      {
        _id: "3",
        templateId: "onetime_gold_donation",
        name: "Gold donation",
      },
      {
        _id: "4",
        templateId: "onetime_silver_donation",
        name: "Silver donation",
      },
      {
        _id: "5",
        templateId: "onetime_bronse_donation",
        name: "Bronse donation",
      },
      {
        _id: "6",
        templateId: "newsletter_subscription",
        name: "Newsletter subcription",
      },
      {
        _id: "7",
        templateId: "newsletter_cancellation",
        name: "Newsletter cancellation",
      },
    ];

    console.log(`Creating email templates for user: ${userId}`);
    await Promise.all(
      templates.map((t) => {
        const jsx = jsx_templates[t.templateId];
        const html = html_templates[t.templateId];

        return ctx.db.insert("templates", {
          userId,
          name: t.name,
          html_content: html,
          raw_jsx_content: jsx,
          default_template: "Text",
          templateId: t.templateId,
          text_template: text_templates[t.templateId],
        });
      })
    );
    console.log(`Finished creating templates for user: ${userId}`);

    console.log(`Adding utility file for user: ${userId}`);
    await ctx.db.insert("utility_files", {
      userId,
      name: "Utility file",
      templateId: "utils",
      file_content: utils,
      default_template: "Jsx",
    });

    console.log(`Saving email variables for user: ${userId}`);
    await ctx.db.insert("email_variables", {
      userId,
      variables: vars as Variables,
    });
    console.log(`Finished setting up variables for user: ${userId}`);
  },
});

export const updateEmailTemplate = mutation({
  args: {
    _id: v.id("templates"),
    text_template: v.optional(v.string()),
    raw_jsx_content: v.optional(v.string()),
    html_content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      text_template: args.text_template,
      raw_jsx_content: args.raw_jsx_content,
      html_content: args.html_content,
    });
  },
});

export const updateUtils = mutation({
  args: {
    _id: v.id("utility_files"),
    file_content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args._id, {
      file_content: args.file_content,
    });
  },
});

// Variables
export const getVariables = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    console.log(`userId ${userId}`);

    if (userId === null) {
      console.log("Not signed in");
      return null;
    }

    const userRecord = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), userId))
      .first();

    if (!userRecord) {
      console.log(`User with id: ${userId} does not exist`);
      return null;
    }

    const record = await ctx.db
      .query("email_variables")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!record) {
      console.log(`Variables with UserId: ${userId} does not exist`);
      return null;
    }

    const creator = {
      _id: userRecord._id,
      name: userRecord.first_name,
      twitter: userRecord.twitter,
      github: userRecord.github,
      support_email: userRecord.email,
      supporter_email: undefined,
      tier: "Bronze",
      supporter_name: undefined,
      donation_amount: undefined,
    } as Partial<CreatorRecord>;

    const variables = record.variables;

    // Hydrate default variables
    const hydratedVariables = hydrateVariables(
      variables,
      creator as CreatorRecord
    );

    return { default: variables, hydrated: hydratedVariables };
  },
});

export const updateVariables = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.string(),
        key: v.string(),
        value: v.string(),
        is_enabled: v.boolean(),
        is_default: v.optional(v.union(v.literal("yes"), v.literal("no"))),
        description: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      console.log("Not signed in");
      return null;
    }

    const existing = await ctx.db
      .query("email_variables")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();

    if (!existing) {
      return null;
    }

    await ctx.db.patch(existing._id, {
      variables: args.updates,
    });
  },
});

// Newsletter
export const fetchAuthenticatedNewsletter = query({
  args: {
    creatorId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    // Authenticate user (not creator)
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }

    const result = await ctx.db
      .query("newsletters")
      .filter((q) => q.eq(q.field("creatorId"), args.creatorId))
      .order("desc")
      .paginate(args.paginationOpts);

    return result;
  },
});

export const fetchUnauthenticatedNewsletter = query({
  args: {
    creatorId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("newsletters")
      .filter((q) => q.eq(q.field("creatorId"), args.creatorId))
      .order("desc")
      .take(10);
  },
});

export const subscribeNewsletter = mutation({
  args: {
    creatorId: v.id("users"),
    supporter_email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("newsletter_subscriptions", args);
  },
});

export const unsubscribeNewsletter = mutation({
  args: {
    supporter_email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("newsletter_subscriptions")
      .filter((q) => q.eq(q.field("supporter_email"), args.supporter_email))
      .first();

    if (!existing) return;

    await ctx.db.delete(existing._id);
  },
});

export const getNewsletter = query({
  args: {},
  handler: (ctx, args) => {},
});

type CreatorSearchQuery =
  | { github: string }
  | { twitter: string }
  | { name: string }
  | { userId: string };

function getSearchQuery(input: string): CreatorSearchQuery {
  const trimmed = input.trim();

  // Normalize to lowercase for comparison
  const normalized = trimmed.toLowerCase();

  // Socials first (order matters)
  if (normalized.startsWith("https://github.com")) {
    return { github: trimmed };
  }
  if (normalized.startsWith("github.com")) {
    return { github: `https://${trimmed}` };
  }
  if (normalized.startsWith("https://x.com")) {
    return { twitter: trimmed };
  }
  if (normalized.startsWith("x.com")) {
    return { twitter: `https://${trimmed}` };
  }

  // Default to name if non-empty string and not a number
  if (trimmed !== "" && isNaN(Number(trimmed))) {
    return { name: trimmed };
  }

  // Otherwise, treat as userId
  return { userId: trimmed };
}

export const searchCreators = query({
  args: {
    query: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const query = getSearchQuery(args.query);

    const result = await ctx.db
      .query("users")
      .filter((q) => {
        const conditions = [];

        if ("name" in query) {
          conditions.push(q.eq(q.field("first_name"), query.name));
        }

        if ("twitter" in query) {
          conditions.push(q.eq(q.field("twitter"), query.twitter));
        }

        if ("github" in query) {
          conditions.push(q.eq(q.field("github"), query.github));
        }

        if ("userId" in query) {
          conditions.push(q.eq(q.field("_id"), query.userId));
        }

        return q.or(...conditions);
      })
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...result,
      page: result.page.map((c) => ({
        id: c._id,
        first_name: c.first_name,
        description: c.page_description,
        supporters: "",
        avatar: c.image || `https://robohash.org/${c._id}.png`,
      })),
    };
  },
});

// Donations
export const storeDonation = mutation({
  args: {
    supporter_name: v.optional(v.string()),
    supporter_email: v.string(),
    donation_amount: v.number(),
    is_monthly: v.boolean(),
    creatorId: v.string(),
    message: v.optional(v.string()),
    tier: v.union(v.literal("Gold"), v.literal("Silver"), v.literal("Bronze")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("donations", {
      name: args.supporter_name,
      email: args.supporter_email,
      amount: args.donation_amount,
      is_monthly: args.is_monthly,
      creatorId: args.creatorId as Id<"users">,
      message: args.message,
      tier: args.tier,
    });
  },
});

export const handleDonation = action({
  args: {
    supporter_name: v.optional(v.string()),
    supporter_email: v.string(),
    donation_amount: v.number(),
    is_monthly: v.boolean(),
    recieveUpdates: v.optional(v.boolean()),
    creatorId: v.string(),
    message: v.optional(v.string()),
    templateId: v.string(),
    tier: v.union(v.literal("Gold"), v.literal("Silver"), v.literal("Bronze")),
  },
  handler: async (ctx, args) => {
    // Subscribe newsletter
    if (args.recieveUpdates) {
      await ctx.runMutation(api.template.subscribeNewsletter, {
        creatorId: args.creatorId as Id<"users">,
        supporter_email: args.supporter_email,
      });
    }

    await ctx.runMutation(api.template.storeDonation, args);

    // Send email
    await ctx.runAction(api.node_email.sendTemplateEmail, {
      supporter_name: args.supporter_name,
      donation_amount: String(args.donation_amount),
      userId: args.creatorId,
      supporter_email: args.supporter_email,
      templateId: args.templateId,
      tier: args.tier,
    });
  },
});
