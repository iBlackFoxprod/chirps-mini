import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chirps Mini",
  description: "A linear-inspired microblogging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}