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

export default MonthlyDonationCancellation;
