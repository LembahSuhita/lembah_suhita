import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { config } from "dotenv";
import Script from "next/script";
config();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lembah Suhita",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-fQg4ejI48wcI6jcC"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
