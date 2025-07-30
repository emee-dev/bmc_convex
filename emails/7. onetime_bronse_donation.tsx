import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text
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

export default OneTimeBronzeDonation;
