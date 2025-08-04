"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuthActions } from "@convex-dev/auth/react";
import { KeyRound } from "lucide-react";
import { useState } from "react";

type AuthFormProps = React.ComponentProps<"div"> & {};

export function AuthForm({ className, ...props }: AuthFormProps) {
  const { signIn } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [flow, setFlow] = useState<"signUp" | "signIn">("signUp");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const first_name = form.get("first_name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    setError(null);

    if ((!email || !password) && flow === "signIn") {
      setError("Email and password are required");
      return;
    }

    if ((!first_name || !email || !password) && flow === "signUp") {
      setError("FirstName, Email and password are required");
      return;
    }

    setIsLoading(true);

    let params = {
      email,
      password,
      flow,
    } as Record<string, string>;

    if (flow === "signUp" && first_name) {
      params["first_name"] = first_name;
    }

    try {
      await signIn("password", params);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onFakeAdminAuth = async () => {
    const email = "emmanuelajike2000gmail.com";
    const password = "password";

    const params: Record<string, string> = {
      email,
      password,
      flow,
    };

    if (flow === "signUp") {
      params["first_name"] = "Emmanuel";
    }

    setIsLoading(true);
    setError(null);

    try {
      await signIn("password", params);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Admin auth failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {flow === "signIn" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {flow === "signIn"
              ? "Login with your email & password"
              : "Sign up with your email & password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={onFakeAdminAuth}
                  disabled={isLoading}
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  {isLoading
                    ? `${flow === "signIn" ? "Logging in" : "Signing up"}...`
                    : `${flow === "signIn" ? "Login" : "Sign up"} as Admin`}
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                {flow === "signUp" && (
                  <div className="grid gap-3">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="John"
                      required
                    />
                  </div>
                )}
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {flow === "signIn" && (
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    )}
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? flow === "signIn"
                      ? "Logging in..."
                      : "Creating account..."
                    : flow === "signIn"
                      ? "Login"
                      : "Create account"}
                </Button>

                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
              </div>
              <div className="text-center text-sm">
                {flow === "signIn" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setFlow("signUp")}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setFlow("signIn")}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
