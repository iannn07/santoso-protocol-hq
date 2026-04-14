import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XLSMART Package Advisor — Find the Right Business Package",
  description:
    "Answer 3 quick questions about your business and get a personalized XLSMART connectivity package recommendation. Powered by AI.",
  keywords: [
    "XLSMART",
    "XL Satu Biz",
    "Internet Corporate",
    "paket bisnis",
    "konektivitas UKM",
    "XLSMART for BUSINESS",
    "paket internet bisnis",
    "rekomendasi paket XLSMART",
    "solusi konektivitas UKM Indonesia",
    "IoT bisnis Indonesia",
  ],
  openGraph: {
    title: "XLSMART Package Advisor — AI-Powered Business Connectivity Finder",
    description:
      "Not sure which XLSMART package fits your SME? Answer 3 questions about your industry, team size, and primary need — get a tailored recommendation instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
