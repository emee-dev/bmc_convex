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

export default NewsletterCancellation;
