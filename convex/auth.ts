import { vars } from "@/emails/vars";
import {
  html_templates,
  jsx_templates,
  text_templates,
  utils,
} from "@/lib/template";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { MutationCtx, query } from "./_generated/server";
import { Templates } from "@/lib/utils";

export type Variables = Doc<"email_variables">["variables"];

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    // Initialize default templates, variables, and utility file for a newly created or updated creator
    async afterUserCreatedOrUpdated(ctx: MutationCtx, { userId }) {
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
  },
});

export const loggedInUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    return user ?? null;
  },
});

export const isConnected = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("authAccounts")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    return !!record?.userId;
  },
});
