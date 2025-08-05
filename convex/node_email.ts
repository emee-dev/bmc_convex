"use node";

import {
  CreatorRecord,
  hydrateVariables,
  subjects,
  toPreviewVariables,
} from "@/lib/utils";
import { v } from "convex/values";
import Handlebars from "handlebars";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { resend } from "./resend";
import { getAuthUserId } from "@convex-dev/auth/server";

export const sendTemplateEmail = action({
  args: {
    userId: v.string(),
    supporter_email: v.string(),
    templateId: v.string(),
    tier: v.string(),
    supporter_name: v.optional(v.string()),
    donation_amount: v.optional(v.string()),
    default_template: v.optional(v.union(v.literal("Text"), v.literal("Jsx"))),
  },
  handler: async (ctx, args) => {
    const userRecord = await ctx.runQuery(internal.node_utils.findCreator, {
      userId: args.userId,
    });

    if (!userRecord) {
      console.log(`Creator with id: ${args.userId} not found.`);
      return;
    }

    const template = await ctx.runQuery(internal.node_utils.findTemplate, {
      userId: args.userId,
      templateId: args.templateId,
    });

    if (!template) {
      console.log(
        `Creator with id: ${args.userId} not has no template with id: ${args.templateId}.`
      );
      return;
    }

    const email_vars = await ctx.runQuery(internal.node_utils.findVars, {
      userId: args.userId,
    });

    if (!email_vars) {
      console.log(`Creator with id: ${args.userId} not has no variables.`);
      return;
    }

    console.log("Preparing to send email...");

    const configured_template =
      args.default_template || template.default_template;

    const code =
      configured_template === "Text"
        ? template.text_template
        : template.html_content;

    const creator = {
      _id: userRecord._id,
      name: userRecord.first_name,
      twitter: userRecord.twitter,
      github: userRecord.github,
      support_email: userRecord.email,
      supporter_email: args.supporter_email,
      tier: args.tier,
      supporter_name: "Anonymous",
      donation_amount: undefined,
    } as CreatorRecord;

    if (args.supporter_name) {
      creator["supporter_name"] = args.supporter_name;
    }

    if (args.donation_amount) {
      creator["donation_amount"] = args.donation_amount;
    }

    const emailSubject = subjects[template.templateId];

    // Hydrate default variables
    const hydratedVariables = hydrateVariables(email_vars.variables, creator);

    // Expand the user's variables with their real-values into a nested object structure
    const variable_ctx = toPreviewVariables(hydratedVariables);

    const source = Handlebars.compile(code);
    const emailBody = source(variable_ctx);

    await resend.sendEmail(ctx, {
      from: `${creator.name} <delivered@bmcd.store>`,
      to: args.supporter_email,
      subject: emailSubject,
      html: emailBody,
    });

    console.log("Email has been sent.");
  },
});

export const sendNewsletterEmail = action({
  args: {
    jsx: v.string(),
    html: v.string(),
    subject: v.string(),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      throw new Error("Not signed in");
    }

    const creator = await ctx.runQuery(internal.node_utils.findCreator, {
      userId: userId,
    });

    if (!creator) {
      console.log(`Creator with id: ${userId} not found.`);
      return;
    }

    await ctx.runMutation(internal.node_utils.storeNewsletter, {
      creatorId: userId,
      jsx: args.jsx,
      html: args.html,
      subject: args.subject,
      title: args.title,
      description: args.description,
    });

    const subscribers = await ctx.runQuery(
      internal.node_utils.findSubscribers,
      {
        creatorId: userId,
      }
    );

    if (!subscribers || subscribers.length === 0) {
      console.log(`Creator with id: ${userId} has no subscriber.`);
      return;
    }

    await Promise.all(
      subscribers.map((s) =>
        resend.sendEmail(ctx, {
          from: `${creator.first_name} <delivered@bmcd.store>`,
          to: s.supporter_email,
          subject: args.subject,
          html: args.html,
        })
      )
    );
  },
});
