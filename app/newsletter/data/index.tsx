export const pandaChangelog = `import React from "react";
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

const styles = {
  body: {
    backgroundColor: "#f9f9f9",
    padding: "40px 0",
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  heading: {
    fontSize: "20px",
    marginBottom: "16px",
    color: "#222222",
  },
  text: {
    fontSize: "14px",
    color: "#555555",
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  link: {
    color: "#0070f3",
    textDecoration: "underline",
  },
  footer: {
    fontSize: "12px",
    color: "#888888",
    marginTop: "32px",
    textAlign: "center" as const,
  },
};

const PandaChangelogNewsletter = () => {
  return (
    <Html>
      <Head />
      <Preview>Panda v1.2.0 is out now! Here's what's new 🐼</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>🎉 Panda v1.2.0 Released!</Heading>
          <Text style={styles.text}>Hi there,</Text>
          <Text style={styles.text}>
            We’re excited to announce the release of <strong>Panda v1.2.0</strong>, packed with powerful improvements and new features:
          </Text>
          <Text style={styles.text}>
            ✅ Added automatic sync for project files<br />
            🛠️ Improved startup performance by 30%<br />
            🐞 Fixed bug causing config file resets on restart<br />
            🌙 New dark mode toggle in preferences
          </Text>
          <Text style={styles.text}>
            👉 View the full changelog or contribute on GitHub:<br />
            <Link href="https://github.com/panda-desktop/panda" style={styles.link}>
              https://github.com/panda-desktop/panda
            </Link>
          </Text>
          <Text style={styles.text}>
            Thanks for using Panda. We’re building this with ❤️ for developers like you.
          </Text>
          <Text style={styles.footer}>
            You’re receiving this email because you subscribed to updates from Panda App.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PandaChangelogNewsletter;
`;
