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

export default OneTimeGoldDonation;
