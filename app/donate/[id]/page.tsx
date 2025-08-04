"use client";

import { DonationDialog } from "@/components/donation-dialog";
import { AirplaneIcon } from "@/components/icons/plane";
import { SubscriptionDialog } from "@/components/membership-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  usePaginatedQuery,
  useQuery,
} from "convex/react";
import {
  AlertCircle,
  AlertTriangle,
  Equal,
  Loader2,
  MailX,
} from "lucide-react";
import { use, useEffect, useState } from "react";

type User = {
  id: string;
};

type DonationPageProps = {
  params: Promise<User>;
  searchParams: Promise<{ show?: TabStates; dialog?: DialogStates }>;
};

type TabStates = "posts" | "donation";
type DialogStates = "membership" | "delmembership";

export default function DonationPage(props: DonationPageProps) {
  const params = use(props.params);
  const query = use(props.searchParams);
  const creator = useQuery(
    api.auth.getCreator,
    params.id ? { userId: params.id } : "skip"
  );

  const [tabValue, setTabValue] = useState<TabStates>(
    query.show === "posts" ? "posts" : "donation"
  );
  const [donationAmt, setDonationAmt] = useState(5);
  const [customAmt, setCustomAmt] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [recieveUpdates, setRecieveUpdates] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (customAmt) {
      let amt = Number(customAmt);

      if (amt > 1 && amt <= 5) {
        setDonationAmt(5);
      }

      setDonationAmt(amt);
    }
  }, [customAmt]);

  return (
    <div className="h-full flex-col md:flex">
      <Tabs
        value={tabValue}
        onValueChange={(val) => setTabValue(val as TabStates)}
        className="flex-1"
      >
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          {creator && (
            <h2 className="text-lg font-semibold">{creator.first_name}</h2>
          )}
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <TabsList className="grid grid-cols-1 border justify-center pb-9">
              <TabsTrigger
                value="donation"
                className="data-[state=active]:border"
              >
                Donation
              </TabsTrigger>
              {/* <TabsTrigger value="posts" className="data-[state=active]:border">
                Posts
              </TabsTrigger> */}
            </TabsList>
          </div>
        </div>
        <Separator />

        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-1">
            <div className="md:order-1">
              {!creator && (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground mt-10 space-y-4">
                  <AlertTriangle className="size-10 text-destructive" />
                  <p className="text-xl font-medium">Creator not found</p>
                  <p className="text-sm max-w-md">
                    {`The page you're looking for doesn't exist or the creator has
                    not set up their donation page yet.`}
                  </p>
                </div>
              )}

              {creator && (
                <>
                  <TabsContent
                    value="donation"
                    className="mt-0 border-0 p-0 mx-auto w-[80%]"
                  >
                    <div className="grid h-full gap-3 grid-rows-2 lg:grid-rows-1 lg:grid-cols-2">
                      <div className="min-h-[300px] md:h-[500px]">
                        <Card>
                          <CardHeader>
                            <CardTitle>
                              About{" "}
                              {creator.first_name
                                ? creator.first_name.split(" ")[0]
                                : "Me"}{" "}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground h-[400px] scrollbar-hide overflow-y-scroll whitespace-pre-line">
                              {creator.page_description}
                            </p>
                            {!creator.page_description && (
                              <p className="text-muted-foreground text-center whitespace-pre-line">
                                No page description
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      <div className=" rounded-md border bg-muted min-h-[300px] md:h-[500px] p-6">
                        <div className="space-y-4">
                          <div className="space-y-4">
                            <p className="text-lg font-semibold">
                              Buy{" "}
                              {creator.first_name
                                ? creator.first_name.split(" ")[0]
                                : "me"}{" "}
                              a coffee
                            </p>
                          </div>

                          <div className="space-y-4 py-2 px-3 border border-primary/50 flex items-center justify-center bg-background rounded-md">
                            <div className="size-[55px] flex rounded-full items-center justify-center gap-1 bg-transparent">
                              <AirplaneIcon className="size-7 font-normal" />
                            </div>

                            <div className="size-[55px] flex flex-col rounded-full pb-2.5 items-center justify-center gap-1 hover:text-primary-foreground bg-transparent">
                              <Equal className="size-5 text-muted-foreground" />
                            </div>

                            <div className="flex items-center gap-x-3 pb-2.5">
                              <DonationIcon
                                className={`font-mono ${donationAmt > 1 && donationAmt <= 5 ? "bg-primary hover:bg-primary" : ""}`}
                                onClick={() => setDonationAmt(5)}
                              >
                                $5
                              </DonationIcon>
                              <DonationIcon
                                className={`font-mono ${donationAmt > 5 && donationAmt <= 50 ? "bg-primary hover:bg-primary" : ""}`}
                                onClick={() => setDonationAmt(50)}
                              >
                                $50
                              </DonationIcon>
                              <DonationIcon
                                className={`font-mono ${donationAmt > 50 && donationAmt <= 100 ? "bg-primary hover:bg-primary" : ""}`}
                                onClick={() => setDonationAmt(100)}
                              >
                                $100
                              </DonationIcon>
                              <DonationInput className="font-mono appearance-none flex items-center justify-center size-[45px] rounded-3xl border">
                                <input
                                  placeholder="10"
                                  type="number"
                                  min={5}
                                  className="size-full focus-within:outline-none border text-center"
                                  value={customAmt}
                                  onChange={(e) => {
                                    setCustomAmt(e.target.value);
                                  }}
                                ></input>
                              </DonationInput>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Name or @social"
                              className="h-16 focus-visible:ring-primary/80 placeholder:text-lg"
                            />
                          </div>

                          <div className="space-y-4">
                            <Textarea
                              id="message"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Say something nice..."
                              className="min-h-[80px] focus-visible:ring-primary/80 font-mono"
                            />
                          </div>

                          <div
                            className="space-y-4 flex items-center text-sm font-geist cursor-pointer select-none"
                            onClick={() => setIsMonthly(!isMonthly)}
                          >
                            <Checkbox
                              className="size-5 mr-2"
                              checked={isMonthly}
                              onCheckedChange={(state: boolean) =>
                                setIsMonthly(state)
                              }
                            />
                            Make this a monthly donation?
                          </div>

                          <div
                            className="space-y-4 flex items-center text-sm font-geist cursor-pointer select-none"
                            onClick={() => setRecieveUpdates(!recieveUpdates)}
                          >
                            <Checkbox
                              className="size-5 mr-2"
                              checked={recieveUpdates}
                              onCheckedChange={(state: boolean) =>
                                setRecieveUpdates(state)
                              }
                            />
                            Receive email updates?
                          </div>

                          <DonationDialog
                            name={name}
                            donationAmt={donationAmt}
                            isMonthly={isMonthly}
                            creatorId={params.id}
                            message={message}
                            // Resets
                            setName={setName}
                            setMessage={setMessage}
                            setCustomAmt={setCustomAmt}
                            setIsMonthly={setIsMonthly}
                            recieveUpdates={recieveUpdates}
                            setRecieveUpdates={setRecieveUpdates}
                            setDonationAmt={setDonationAmt}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Redundant logic */}
                  <TabsContent
                    value="posts"
                    className="mt-0 hidden border-0 p-0 mx-auto w-[80%]"
                  >
                    <div className="grid h-full gap-3 min-h-[300px] md:h-[500px] scroll-smooth overflow-y-scroll lg:grid-cols-1">
                      <Authenticated>
                        <AuthenticatedNewsletter creatorId={creator?._id} />
                      </Authenticated>
                      <Unauthenticated>
                        <UnAuthenticatedNewsletter
                          creatorId={creator?._id}
                          showMembershipDialog={
                            query.dialog && query.dialog === "membership"
                              ? true
                              : false
                          }
                        />
                      </Unauthenticated>
                      <AuthLoading>
                        <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                          <Loader2 className="h-6 w-6 animate-spin mb-2" />
                          <p>Authenticating...</p>
                        </div>
                      </AuthLoading>
                    </div>
                  </TabsContent>
                </>
              )}
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

type Props = {
  creatorId: string;
};

type Props2 = {
  creatorId: string;
  showMembershipDialog?: boolean;
};

const AuthenticatedNewsletter = ({ creatorId }: Props) => {
  const { isLoading, results } = usePaginatedQuery(
    api.template.fetchAuthenticatedNewsletter,
    creatorId ? { creatorId } : "skip",
    { initialNumItems: 10 }
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mb-2" />
        <p>Loading newsletters...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-2 py-10">
        <MailX className="h-6 w-6 text-gray-400" />
        <p>No newsletters available right now. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((post, idx) => (
        <Card className="overflow-hidden hover:shadow-md" key={idx}>
          <div className="p-3">
            <div className="relative">
              <div
                className="h-44 bg-cover bg-center filter blur-sm"
                style={{
                  backgroundImage: `url('${post.imageUrl}')`,
                }}
              />
              <div className="absolute inset-0 bg-black/75 rounded-sm flex flex-col items-center justify-center text-white">
                <p className="text-sm mb-4 text-center px-4">
                  Join newsletter to preview
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-geist font-medium text-base mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="ml-auto">{post.date}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const UnAuthenticatedNewsletter = ({
  creatorId,
  showMembershipDialog,
}: Props2) => {
  const newsletters = useQuery(
    api.template.fetchUnauthenticatedNewsletter,
    creatorId ? { creatorId } : "skip"
  );

  if (!newsletters) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground space-y-2">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <p>We couldn't load your newsletters. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsletters.map((post, idx) => (
        <Card className="overflow-hidden hover:shadow-md" key={idx}>
          <div className="p-3">
            <div className="relative">
              <div
                className="h-44 bg-cover bg-center filter blur-sm"
                style={{
                  backgroundImage: `url('${post.imageUrl}')`,
                }}
              />
              <div className="absolute inset-0 bg-black/75 rounded-sm flex flex-col items-center justify-center text-white">
                <p className="text-sm mb-4 text-center px-4">
                  Join newsletter to preview
                </p>

                <SubscriptionDialog
                  creatorId={creatorId}
                  showMembershipDialog={showMembershipDialog}
                />
              </div>
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-geist font-medium text-base mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {post.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="ml-auto">{post.date}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

type DonationIconProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const DonationIcon = (props: DonationIconProps) => {
  return (
    <div
      className={cn(
        "size-[55px] cursor-pointer flex flex-col rounded-full items-center justify-center gap-1 hover:bg-primary/50 hover:text-primary-foreground bg-transparent",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

const DonationInput = (props: DonationIconProps) => {
  return (
    <div
      className={cn(
        "size-[55px] flex flex-col rounded-lg items-center justify-center gap-1 hover:bg-primary hover:text-primary-foreground bg-transparent",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};
