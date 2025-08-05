import { Doc, Id } from "@/convex/_generated/dataModel";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Variable } from "@/hooks/use-vars";

export type TemplateMode = Doc<"templates">["default_template"];
export type Templates = {
  _id: string;
  name: string;
  templateId: Doc<"templates">["templateId"];
};

export type EmailTemplate = {
  _id: Id<"templates">;
  _creationTime: number;
  userId: string;
  name: string;
  text_template: string;
  raw_jsx_content: string;
  html_content: string;
  templateId: Doc<"templates">["templateId"];
  default_template: Doc<"templates">["default_template"];
};

export type UtilityTemplate = {
  _id: Id<"utility_files">;
  _creationTime: number;
  userId: string;
  name: string;
  templateId: "utils";
  file_content: string;
};

export type DashboardView =
  | "subscribers"
  | "settings"
  | "newsletters"
  | "donations";

export type SubDashboardView = "page" | "account" | "templates";

export type Tier = "Gold" | "Silver" | "Bronze";

export type TemplateSelector = EmailTemplate | UtilityTemplate;

export type TemplateId = Doc<"templates">["templateId"];
export type AllTemplateId = TemplateSelector["templateId"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const subjects: Record<TemplateId, string> = {
  monthly_donation_subscription: "You're now a monthly supporter 🎉",
  monthly_donation_cancellation: "Your monthly support has been cancelled",
  onetime_gold_donation: "Thank you for your generous gold-tier donation ✨",
  onetime_silver_donation: "Thanks for your silver-tier donation 🥈",
  onetime_bronse_donation: "Thanks for your one-time donation 💛",
  newsletter_subscription: "You're subscribed to the newsletter 📨",
  newsletter_cancellation: "You've unsubscribed from the newsletter",
};

/**
 * Converts a flat list of variable definitions into a nested object
 * with actual values.
 *
 * This is typically used in local or production previews where real values
 * are required to render the email content (e.g., inside webcontainers or production).
 *
 * Example:
 * Input: [{ key: "creator.page", value: "https://example.com" }]
 * Output: { creator: { page: "https://example.com" } }
 *
 * @param variables - An array of variable objects with dot-notated keys.
 * @returns A deeply nested object with resolved variable values.
 */
export function toPreviewVariables(variables: Variable[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const { key, value } of variables) {
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // If it's the last part, assign the value
      if (i === parts.length - 1) {
        current[part] = value;
      } else {
        // If the nested object doesn't exist, create it
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }

        current = current[part];
      }
    }
  }

  return result;
}

/**
 * Converts a flat list of variable definitions into a nested object
 * with Handlebars expressions.
 *
 * This is used in server-rendered environments like Convex where the
 * variables are not resolved yet but should remain dynamic for later
 * processing.
 *
 * Example:
 * Input: [{ key: "creator.page", value: "<dynamic>" }]
 * Output: { creator: { page: "{{ creator.page }}" } }
 *
 * @param variables - An array of variable objects with dot-notated keys.
 * @returns A deeply nested object with Handlebars variable placeholders.
 */
export function toRuntimeVariables(variables: Variable[]): Record<string, any> {
  const result: Record<string, any> = {};

  for (const { key, value } of variables) {
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // If it's the last part, assign the value
      if (i === parts.length - 1) {
        current[part] = `{{ ${parts.join(".")} }}`;
      } else {
        // If the nested object doesn't exist, create it
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = {};
        }

        current = current[part];
      }
    }
  }

  return result;
}

/**
 * Registers a `helperMissing` handler to preserve unresolved Handlebars variables.
 * Example: `{{name}}` will remain `{{name}}` if `name` is not in the context.
 */
export function preserveMissingVariables(
  handlebarsInstance: typeof Handlebars
) {
  handlebarsInstance.registerHelper("helperMissing", function (...args) {
    const options = args.pop();
    const variableName = options?.name ?? "unknown";
    return `{{${variableName}}}`;
  });
}

export function resolveUrlHost(input: string): string {
  if (typeof window === "undefined") {
    const host = process.env.VERCEL_HOST_NAME?.replace(/\/+$/, ""); // strip trailing slashes
    return host ? input.replace(":url-host", host) : input;
  }

  // Client-side: use window.location to support local development
  const origin = window?.location?.origin || "";
  return input.replace(":url-host", origin);
}

export function calculateTier(donationAmt: number): Tier {
  if (donationAmt >= 1 && donationAmt <= 5) {
    return "Bronze";
  }

  if (donationAmt > 5 && donationAmt <= 50) {
    return "Silver";
  }

  if (donationAmt > 50) {
    return "Gold";
  }

  // Fallback if donationAmt < 1
  return "Bronze";
}

export type DefaultVar =
  | "creator.name"
  | "creator.page_url"
  | "creator.posts_url"
  | "creator.membership_url"
  | "creator.twitter"
  | "creator.github"
  | "unsubscribe_url"
  | "current_year"
  | "support_email"
  // Donation specifics
  | "supporter.name"
  | "supporter.email"
  | "supporter.tier"
  | "donation.amount";

export interface CreatorRecord {
  _id: string;
  name?: string;
  twitter?: string;
  github?: string;
  support_email: string;
  supporter_name?: string;
  supporter_email: string;
  tier: "Gold" | "Silver" | "Bronze";
  donation_amount?: string;
}

export function hydrateVariables(
  vars: Variable[],
  creator: CreatorRecord
): Variable[] {
  return vars.map((item) => {
    const key = item.key as DefaultVar;

    switch (key) {
      case "creator.name":
        item.value = creator?.name || "<dynamic>";
        break;

      case "creator.page_url":
        item.value = resolveUrlHost(`:url-host/donate/${creator._id}`);
        break;

      case "creator.posts_url":
        item.value = resolveUrlHost(
          `:url-host/donate/${creator._id}?show=posts`
        );
        break;

      case "creator.membership_url":
        item.value = resolveUrlHost(
          `:url-host/donate/${creator._id}?show=posts&dialog=membership`
        );
        break;

      case "creator.twitter":
        item.value = creator?.twitter || "<dynamic>";
        break;

      case "creator.github":
        item.value = creator?.github || "<dynamic>";
        break;

      case "supporter.name":
        item.value = creator?.supporter_name || "Anonymous";
        break;

      case "supporter.email":
        item.value = creator?.supporter_email || "<dynamic>";
        break;

      case "supporter.tier":
        item.value = creator?.tier || "<dynamic>";
        break;

      case "donation.amount":
        item.value = creator?.donation_amount || "<dynamic>";
        break;

      case "unsubscribe_url":
        item.value = resolveUrlHost(`:url-host/unsubscribe/${creator._id}`);
        break;

      case "current_year":
        item.value = new Date().getUTCFullYear().toString();
        break;

      case "support_email":
        item.value = creator.support_email;
        break;

      default:
        break;
    }

    return item;
  });
}
