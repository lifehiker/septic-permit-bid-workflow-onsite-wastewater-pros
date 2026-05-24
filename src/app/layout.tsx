import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SepticPermitCRM",
  description: "Septic permit, bid, and county checklist workflow software for onsite wastewater pros.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
