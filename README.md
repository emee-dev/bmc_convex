**What It Does**
Buymeacommit is a lightweight donation and newsletter tool designed for developers. It allows open-source maintainers and creators to receive monetary support while building a loyal audience. Supporters can send one-time donations or subscribe to a creator's newsletter to stay updated.

**Key Features**

1. Convex Auth for user authentication and session management.
2. Email Variables, including platform-defined and user-defined values, for dynamic and personalized emails.
3. Email Editor, supporting both plain text and Resend JSX templates.
4. Newsletter, with support for Resend-compatible JSX templates and cron jobs powered by Convex functions.

**How It’s Built**
At the core, the app uses webcontainers to compile JSX-based Resend templates on the fly into HTML. This enables creators to build and preview their emails without leaving the browser.

The compiled HTML is then enriched with dynamic content using Handlebars, allowing creators to inject variables like subscriber names, donation amounts, or custom tags directly into their templates.

By offloading rendering and template handling to Resend, creators benefit from high-quality, client-compatible email rendering, without writing verbose HTML or dealing with quirks across email clients. The system supports both text-only and JSX templates, giving developers full control over structure and logic in their newsletters.

**How You Are Using Resend**
Resend plays a central role in the email delivery pipeline. I use Resend’s JSX template format to let developers write component-based, logic-driven emails using familiar React-like syntax. These templates are compiled in-browser using webcontainers, transformed into HTML, and populated with variables via Handlebars.

The final HTML is then sent via Convex Resend component, ensuring compatibility across all major email clients. This approach gives developers powerful customization while abstracting away the pain of cross-client formatting. Additionally, Resend is used to manage scheduled email campaigns triggered by Convex cron jobs, making BMC a full-stack platform for both transactional and recurring newsletters.

**Note:**
The file editor logic from `components/editor` and `components/editor-utils` has been reused to render variables more intuitively. This reuse accounts for less than 5% of the overall codebase.
 