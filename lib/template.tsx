/**
* ⚠️ This file is auto-generated. Do not edit directly.
* To make changes, edit the files in the `emails` directory
* and then run `pnpm run init` to regenerate this file.
*/

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


export const jsx_templates: Record<TemplateId, string> = {
  monthly_donation_subscription: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const MonthlyDonationSubscription = ({ variables }: EmailProps) => {
  const { supporter, creator } = variables;

  return (
    <Html>
      <Head />
      <Preview>You're now supporting {creator.name} monthly</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hi {supporter.name},</Heading>
          <Text style={styles.text}>
            You're officially supporting {creator.name} every month—how awesome
            is that?
          </Text>
          <Text style={styles.text}>
            Your commitment means a lot and helps keep projects like this going
            strong. Thank you for believing in the work!
          </Text>
          <Text style={styles.text}>
            If you ever want to manage your membership, visit:
            <br />
            <Link style={styles.link} href={creator.membership_url}>
              {creator.membership_url}
            </Link>
          </Text>
          <Text style={styles.text}>
            With gratitude,
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MonthlyDonationSubscription;`,
  monthly_donation_cancellation: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const MonthlyDonationCancellation = ({ variables }: EmailProps) => {
  const { supporter, creator } = variables;

  return (
    <Html>
      <Head />
      <Preview>
        You've cancelled your monthly support for {creator.name}
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hi {supporter.name},</Heading>
          <Text style={styles.text}>
            You've successfully cancelled your monthly support for{" "}
            {creator.name}.
          </Text>
          <Text style={styles.text}>
            No hard feelings—thank you so much for being part of the journey.
            Every bit of your support has made a difference.
          </Text>
          <Text style={styles.text}>
            If you change your mind, you’re always welcome back:
            <br />
            <Link style={styles.link} href={creator.membership_url}>
              {creator.membership_url}
            </Link>
          </Text>
          <Text style={styles.text}>
            Best,
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MonthlyDonationCancellation;`,
  newsletter_subscription: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const NewsletterSubscription = ({ variables }: EmailProps) => {
  const { supporter, creator } = variables;

  return (
    <Html>
      <Head />
      <Preview>You've subscribed to {creator.name}’s newsletter</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hi {supporter.name},</Heading>
          <Text style={styles.text}>
            Thanks for subscribing to {creator.name}’s newsletter. Expect
            occasional updates, behind-the-scenes stuff, and early access to
            projects.
          </Text>
          <Text style={styles.text}>
            You can always catch up on past posts here:
            <br />
            <Link style={styles.link} href={creator.posts_url}>
              {creator.posts_url}
            </Link>
          </Text>
          <Text style={styles.text}>
            Talk soon,
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterSubscription;`,
  newsletter_cancellation: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const NewsletterCancellation = ({ variables }: EmailProps) => {
  const { supporter, creator } = variables;

  return (
    <Html>
      <Head />
      <Preview>You’ve unsubscribed from {creator.name}’s newsletter</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hey {supporter.name},</Heading>
          <Text style={styles.text}>
            You’ve successfully unsubscribed from {creator.name}’s newsletter.
          </Text>
          <Text style={styles.text}>
            No worries—you can rejoin anytime via:
            <br />
            <Link style={styles.link} href={creator.page_url}>
              {creator.page_url}
            </Link>
          </Text>
          <Text style={styles.text}>
            Thanks for being part of the journey so far!
          </Text>
          <Text style={styles.text}>
            Take care,
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterCancellation;`,
  onetime_gold_donation: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const OneTimeGoldDonation = ({ variables }: EmailProps) => {
  const { supporter, creator, donation } = variables;

  return (
    <Html>
      <Head />
      <Preview>Thank you for your generous donation!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Wow, {supporter.name}!</Heading>
          <Text style={styles.text}>
            Thank you for your generous \${donation?.amount} donation!
          </Text>
          <Text style={styles.text}>
            Your gold-tier support means the world to {creator.name}. It's
            contributors like you who make open source and independent work
            sustainable.
          </Text>
          <Text style={styles.text}>
            You're amazing. Check out what you helped support:
            <br />
            <Link style={styles.link} href={creator.page_url}>
              {creator.page_url}
            </Link>
          </Text>
          <Text style={styles.text}>
            Cheers,
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OneTimeGoldDonation;`,
  onetime_silver_donation: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const OneTimeSilverDonation = ({ variables }: EmailProps) => {
  const { supporter, creator, donation } = variables;

  return (
    <Html>
      <Head />
      <Preview>Thanks for your Silver Support 🎉</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hi {supporter.name},</Heading>
          <Text style={styles.text}>
            Thanks a ton for your \${donation.amount} donation to {creator.name}
            ! You're officially a Silver Supporter 🎉
          </Text>
          <Text style={styles.text}>
            This goes a long way in helping maintain and build awesome tools.
          </Text>
          <Text style={styles.text}>
            Stay awesome,
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OneTimeSilverDonation;`,
  onetime_bronse_donation: `import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import { EmailProps, styles } from "./utils";

const OneTimeBronzeDonation = ({ variables }: EmailProps) => {
  const { supporter, creator, donation } = variables;

  return (
    <Html>
      <Head />
      <Preview>Thanks for your Bronze donation!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hey {supporter.name},</Heading>
          <Text style={styles.text}>
            Your \${donation.amount} donation just came through—thank you!
          </Text>
          <Text style={styles.text}>
            Every single contribution helps {creator.name} keep building and
            sharing. You’re a vital part of this journey.
          </Text>
          <Text style={styles.text}>
            Appreciate you!
            <br />
            {creator.name}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OneTimeBronzeDonation;`
};

export const html_templates: Record<TemplateId, string> = {
  monthly_donation_subscription: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      You&#x27;re now supporting {{ creator.name }} monthly
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Hi
              <!-- -->{{ supporter.name }}<!-- -->,
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              You&#x27;re officially supporting
              <!-- -->{{ creator.name }}<!-- -->
              every month—how awesome is that?
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Your commitment means a lot and helps keep projects like this
              going strong. Thank you for believing in the work!
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              If you ever want to manage your membership, visit:<br /><a
                href="{{ creator.membership_url }}"
                style="color:hsl(47.9 95.8% 53.1%);text-decoration-line:none;text-decoration:underline"
                target="_blank"
                >{{ creator.membership_url }}</a
              >
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              With gratitude,<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`,
  monthly_donation_cancellation: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      You&#x27;ve cancelled your monthly support for {{ creator.name }}
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Hi
              <!-- -->{{ supporter.name }}<!-- -->,
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              You&#x27;ve successfully cancelled your monthly support for<!-- -->
              <!-- -->{{ creator.name }}<!-- -->.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              No hard feelings—thank you so much for being part of the journey.
              Every bit of your support has made a difference.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              If you change your mind, you’re always welcome back:<br /><a
                href="{{ creator.membership_url }}"
                style="color:hsl(47.9 95.8% 53.1%);text-decoration-line:none;text-decoration:underline"
                target="_blank"
                >{{ creator.membership_url }}</a
              >
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Best,<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`,
  onetime_gold_donation: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Thank you for your generous donation!
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Wow,
              <!-- -->{{ supporter.name }}<!-- -->!
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Thank you for your generous \$<!-- -->{{ donation.amount }}<!-- -->
              donation!
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Your gold-tier support means the world to
              <!-- -->{{ creator.name }}<!-- -->. It&#x27;s contributors like
              you who make open source and independent work sustainable.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              You&#x27;re amazing. Check out what you helped support:<br /><a
                href="{{ creator.page_url }}"
                style="color:hsl(47.9 95.8% 53.1%);text-decoration-line:none;text-decoration:underline"
                target="_blank"
                >{{ creator.page_url }}</a
              >
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Cheers,<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`,
  onetime_silver_donation: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Thanks for your Silver Support 🎉
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Hi
              <!-- -->{{ supporter.name }}<!-- -->,
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Thanks a ton for your \$<!-- -->{{ donation.amount }}<!-- -->
              donation to
              <!-- -->{{ creator.name }}<!-- -->! You&#x27;re officially a
              Silver Supporter 🎉
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              This goes a long way in helping maintain and build awesome tools.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Stay awesome,<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`,
  onetime_bronse_donation: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Thanks for your Bronze donation!
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Hey
              <!-- -->{{ supporter.name }}<!-- -->,
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Your \$<!-- -->{{ donation.amount }}<!-- -->
              donation just came through—thank you!
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Every single contribution helps
              <!-- -->{{ creator.name }}<!-- -->
              keep building and sharing. You’re a vital part of this journey.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Appreciate you!<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`,
  newsletter_subscription: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      You&#x27;ve subscribed to {{ creator.name }}’s newsletter
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Hi
              <!-- -->{{ supporter.name }}<!-- -->,
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Thanks for subscribing to
              <!-- -->{{ creator.name }}<!-- -->’s newsletter. Expect occasional
              updates, behind-the-scenes stuff, and early access to projects.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              You can always catch up on past posts here:<br /><a
                href="{{ creator.posts_url }}"
                style="color:hsl(47.9 95.8% 53.1%);text-decoration-line:none;text-decoration:underline"
                target="_blank"
                >{{ creator.posts_url }}</a
              >
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Talk soon,<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`,
  newsletter_cancellation: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style="background-color:hsl(0 0% 100%);font-family:Inter, sans-serif;color:hsl(20 14.3% 4.1%);padding:20px">
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      You’ve unsubscribed from {{ creator.name }}’s newsletter
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:560px;margin:0 auto;background-color:hsl(0 0% 100%);border-radius:0.65rem;padding:24px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h1
              style="font-size:24px;font-weight:600;margin-bottom:16px;color:hsl(20 14.3% 4.1%)">
              Hey
              <!-- -->{{ supporter.name }}<!-- -->,
            </h1>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              You’ve successfully unsubscribed from
              <!-- -->{{ creator.name }}<!-- -->’s newsletter.
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              No worries—you can rejoin anytime via:<br /><a
                href="{{ creator.page_url }}"
                style="color:hsl(47.9 95.8% 53.1%);text-decoration-line:none;text-decoration:underline"
                target="_blank"
                >{{ creator.page_url }}</a
              >
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Thanks for being part of the journey so far!
            </p>
            <p
              style="font-size:16px;line-height:1.5;margin-bottom:16px;color:hsl(25 5.3% 44.7%);margin-top:16px">
              Take care,<br />{{ creator.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>`
};

export const utils = `
export const styles = {
  body: {
    backgroundColor: "hsl(0 0% 100%)",
    fontFamily: "Inter, sans-serif",
    color: "hsl(20 14.3% 4.1%)",
    padding: "20px",
  },
  container: {
    maxWidth: "560px",
    margin: "0 auto",
    backgroundColor: "hsl(0 0% 100%)",
    borderRadius: "0.65rem",
    padding: "24px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "16px",
    color: "hsl(20 14.3% 4.1%)",
  },
  text: {
    fontSize: "16px",
    lineHeight: 1.5,
    marginBottom: "16px",
    color: "hsl(25 5.3% 44.7%)",
  },
  link: {
    color: "hsl(47.9 95.8% 53.1%)",
    textDecoration: "underline",
  },
};

export type VariableAsProps = {
  creator: {
    name: string;
    page_url: string;
    custom_message: string;
    shop_url: string;
    posts_url: string;
    membership_url: string;
    twitter: string;
    github: string;
  };
  supporter: {
    name: string;
    email: string;
    tier: string;
  };
  donation: {
    amount: number;
    currency: "$";
  };
  purchase?: {
    item_name: string;
  };
  current_year: string;
  support_email: string;
  unsubscribe_url: string;
};

export interface EmailProps {
  variables: VariableAsProps;
}
`
