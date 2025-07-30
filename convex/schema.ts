import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  templates: defineTable({
    userId: v.string(),
    name: v.string(),
    text_template: v.string(),
    raw_jsx_content: v.string(), // Original JSX source code to be compiled html.
    html_content: v.string(), // Result of JSX compilation to HTML, includes runtime variables.
    templateId: v.union(
      v.literal("monthly_donation_subscription"),
      v.literal("monthly_donation_cancellation"),
      v.literal("onetime_gold_donation"),
      v.literal("onetime_silver_donation"),
      v.literal("onetime_bronse_donation"),
      v.literal("newsletter_subscription"),
      v.literal("newsletter_cancellation")
    ),
    // default unless updated by user
    default_template: v.union(v.literal("Text"), v.literal("Jsx")),
  }),
  // Each user can only create a single file which is loaded
  // in the JSX webcontainer instance.
  utility_files: defineTable({
    userId: v.string(),
    name: v.string(),
    file_content: v.string(),
    templateId: v.literal("utils"),
    default_template: v.literal("Jsx"),
  }),
  // TODO rename to donations
  donations: defineTable({
    userId: v.string(),
    amount: v.number(),
    is_monthly: v.boolean(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    message: v.optional(v.string()),
    tier: v.union(v.literal("Gold"), v.literal("Silver"), v.literal("Bronse")),
  }),
  newsletter_subscriptions: defineTable({
    userId: v.string(),
    amount: v.number(),
    email: v.string(),
  }),
  email_variables: defineTable({
    userId: v.string(),
    variables: v.array(
      v.object({
        id: v.string(),
        key: v.string(),
        value: v.string(),
        is_enabled: v.boolean(),
        is_default: v.optional(v.union(v.literal("yes"), v.literal("no"))),
        description: v.optional(v.string()),
      })
    ),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
