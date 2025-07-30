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
