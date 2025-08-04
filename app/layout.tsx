import { ConvexClientProvider } from "@/provider";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Exo, Fira_Mono } from "next/font/google";
import type React from "react";
import "./globals.css";

const firaCode = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-finlandica",
});

export const metadata: Metadata = {
  title: "Buymeacommit",
  description:
    "A developer-focused platform for supporting creators through donations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} ${firaCode.variable} ${exo.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
