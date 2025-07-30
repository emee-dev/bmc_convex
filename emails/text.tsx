import { TemplateId } from "@/lib/utils";

export const text_templates: Record<TemplateId, string> = {
  monthly_donation_subscription: `Hi {{ supporter.name }},

You're officially supporting {{ creator.name }} every month—how awesome is that?

Your commitment means a lot and helps keep projects like this going strong. Thank you for believing in the work!

If you ever want to manage your membership, visit: {{ creator.membership_url }}

With gratitude,  
{{ creator.name }}
`,
  monthly_donation_cancellation: `Hi {{ supporter.name }},

You've successfully cancelled your monthly support for {{ creator.name }}.

No hard feelings—thank you so much for being part of the journey. Every bit of your support has made a difference.

If you change your mind, you’re always welcome back: {{ creator.membership_url }}

Best,  
{{ creator.name }}
`,
  onetime_gold_donation: `Wow, {{ supporter.name }}—thank you for your generous $\{{ donation.amount }\} donation!

Your gold-tier support means the world to {{ creator.name }}. It's contributors like you who make open source and independent work sustainable.

You're amazing. Check out what you helped support: {{ creator.page_url }}

Cheers,  
{{ creator.name }}
`,
  onetime_silver_donation: `Hi {{ supporter.name }},

Thanks a ton for your $\{{ donation.amount }\} donation to {{ creator.name }}! You're officially a Silver Supporter 🎉

This goes a long way in helping maintain and build awesome tools.

Stay awesome,  
{{ creator.name }}
`,
  onetime_bronse_donation: `Hey {{ supporter.name }},

Your $\{{ donation.amount }\} donation just came through—thank you!

Every single contribution helps {{ creator.name }} keep building and sharing. You’re a vital part of this journey.

Appreciate you!  
{{ creator.name }}
`,
  newsletter_subscription: `Hi {{ supporter.name }},

Thanks for subscribing to {{ creator.name }}’s newsletter. Expect occasional updates, behind-the-scenes stuff, and early access to projects.

You can always catch up on past posts here: {{ creator.posts_url }}

Talk soon,  
{{ creator.name }}
`,
  newsletter_cancellation: `Hey {{ supporter.name }},

You’ve successfully unsubscribed from {{ creator.name }}’s newsletter.

No worries—you can rejoin anytime via: {{ creator.page_url }}

Thanks for being part of the journey so far!

Take care,  
{{ creator.name }}
`,
};
