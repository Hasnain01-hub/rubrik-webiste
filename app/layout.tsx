import type { Metadata } from "next";
import ClientBody from "./ClientBody";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rubrik | Space Weather Risk Intelligence",
  description:
    "Protect assets. Predict risk. Price confidently. One integrated platform for real-time space weather monitoring, parametric triggers, and dynamic underwriting.",
  keywords:
    "space weather, insurance, risk management, geomagnetic storms, solar flares, underwriting, parametric insurance",
  openGraph: {
    title: "Rubrik | Space Weather Risk Intelligence",
    description:
      "One integrated platform for real-time space weather monitoring and dynamic insurance pricing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
