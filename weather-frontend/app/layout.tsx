import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const outfit = localFont({
  src: "/fonts/Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Weather",
  description: "Weather app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={outfit.variable}
      >
        {children}
      </body>
    </html>
  );
}
