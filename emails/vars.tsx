import { Variable } from "@/hooks/use-vars";

export const vars: Variable[] = [
  // 🧑‍🎨 Creator Variables
  {
    id: "1",
    key: "creator.name",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Creator's full name",
  },
  {
    id: "2",
    key: "creator.page_url",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Link to the creator's page",
  },
  {
    id: "3",
    key: "creator.custom_message",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Custom thank-you or intro message from creator",
  },
  {
    id: "4",
    key: "creator.posts_url",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Link to the creator's posts or updates",
  },
  {
    id: "5",
    key: "creator.membership_url",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Link to become a member",
  },
  {
    id: "6",
    key: "creator.twitter",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Creator's Twitter link",
  },
  {
    id: "7",
    key: "creator.github",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Creator's Github link",
  },

  // 🙋 Supporter/Member Variables
  {
    id: "8",
    key: "supporter.name",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Supporter's full name",
  },
  {
    id: "9",
    key: "supporter.email",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Supporter's email address",
  },
  {
    id: "10",
    key: "supporter.tier",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Supporter's membership tier",
  },

  // 📦 Donation/Purchase Variables
  {
    id: "11",
    key: "donation.amount",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Donation amount",
  },
  {
    id: "12",
    key: "donation.currency",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Currency used in the donation",
  },
  {
    id: "13",
    key: "purchase.item_name",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Name of the item purchased",
  },

  // 📨 Email Meta/Utility Variables
  {
    id: "14",
    key: "unsubscribe_url",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Link to unsubscribe from emails",
  },
  {
    id: "15",
    key: "current_year",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "The current year",
  },
  {
    id: "16",
    key: "support_email",
    value: "<dynamic>",
    is_enabled: true,
    is_default: "yes",
    description: "Customer support email address",
  },
];
