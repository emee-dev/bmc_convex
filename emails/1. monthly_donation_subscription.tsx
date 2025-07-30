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

export default MonthlyDonationSubscription;
