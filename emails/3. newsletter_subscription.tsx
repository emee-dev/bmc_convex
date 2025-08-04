import React from "react";
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

export default NewsletterSubscription;
