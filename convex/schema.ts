import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    first_name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    // Creator specific values
    page_description: v.optional(v.string()),
    posts_url: v.optional(v.string()),
    membership_url: v.optional(v.string()),
    twitter: v.optional(v.string()),
    github: v.optional(v.string()),
  }).index("email", ["email"]),
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
    creatorId: v.id("users"),
    amount: v.number(),
    is_monthly: v.boolean(),
    name: v.optional(v.string()),
    email: v.string(),
    message: v.optional(v.string()),
    tier: v.union(v.literal("Gold"), v.literal("Silver"), v.literal("Bronze")),
  }),
  newsletters: defineTable({
    creatorId: v.id("users"),
    title: v.string(),
    description: v.string(),
    date: v.string(),
    imageUrl: v.optional(v.string()),
    jsx: v.string(),
    html: v.string(),
  }),
  newsletter_subscriptions: defineTable({
    creatorId: v.id("users"),
    supporter_email: v.string(),
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
});

export default schema;
