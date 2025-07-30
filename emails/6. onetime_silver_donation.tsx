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

export default OneTimeSilverDonation;
